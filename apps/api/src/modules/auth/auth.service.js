/**
 * Auth Module Service
 * Contains all business logic for authentication
 * Handles OTP generation, verification, JWT token generation, etc.
 */

import jwt from 'jsonwebtoken';
import { authHelpers } from './auth.helpers.js';
import { prisma } from '../../lib/prisma.js';
import { otpService } from '../../lib/otp.js';
import { AppError } from '../../lib/errors.js';

class AuthService {
  /**
   * Send OTP to user's phone number
   * Generates OTP, stores it in cache/DB, and sends via Twilio
   * @param {string} phoneNumber - User's phone number
   * @returns {Promise<Object>} Result with expiration details
   */
  async sendOTP(phoneNumber) {
    // Validate phone number format
    const normalizedPhone = authHelpers.normalizePhoneNumber(phoneNumber);

    if (!normalizedPhone) {
      throw new AppError('Invalid phone number format', 400);
    }

    // Generate 6-digit OTP
    const otp = authHelpers.generateOTP(6);

    // Store OTP in cache (Redis or in-memory with expiry)
    // Default: 10 minutes expiry
    await otpService.store(normalizedPhone, otp, 10 * 60);

    // In production, send OTP via Twilio
    if (process.env.NODE_ENV === 'production') {
      await otpService.sendViaTwilio(normalizedPhone, otp);
    } else {
      // Log OTP in development
      console.log(`[DEV] OTP for ${normalizedPhone}: ${otp}`);
    }

    return {
      phoneNumber: normalizedPhone,
      expiresIn: '10 minutes',
    };
  }

  /**
   * Verify OTP and issue JWT tokens
   * @param {string} phoneNumber - User's phone number
   * @param {string} otp - OTP provided by user
   * @returns {Promise<Object>} JWT tokens and user data
   */
  async verifyOTP(phoneNumber, otp) {
    const normalizedPhone = authHelpers.normalizePhoneNumber(phoneNumber);

    // Verify OTP from cache
    const isValidOTP = await otpService.verify(normalizedPhone, otp);

    if (!isValidOTP) {
      throw new AppError('Invalid or expired OTP', 400);
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { phoneNumber: normalizedPhone },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          phoneNumber: normalizedPhone,
          role: 'USER',
          isPhoneVerified: true,
        },
      });
    } else {
      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });
    }

    // Generate JWT tokens
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    // Delete OTP from cache after successful verification
    await otpService.delete(normalizedPhone);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  /**
   * Refresh JWT access token using refresh token
   * @param {string} refreshToken - The refresh token
   * @returns {Promise<Object>} New access token and refresh token
   */
  async refreshAccessToken(refreshToken) {
    if (!refreshToken) {
      throw new AppError('Refresh token required', 401);
    }

    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new AppError('User not found', 404);
      }

      const newAccessToken = this.generateAccessToken(user);
      const newRefreshToken = this.generateRefreshToken(user);

      return {
        accessToken: newAccessToken,
        newRefreshToken,
      };
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new AppError('Refresh token expired', 401);
      }
      throw new AppError('Invalid refresh token', 401);
    }
  }

  /**
   * Get user by ID
   * @param {string} userId - User ID
   * @returns {Promise<Object>} User object
   */
  async getUserById(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  /**
   * Generate JWT access token (short-lived)
   * @param {Object} user - User object from database
   * @returns {string} JWT access token
   */
  generateAccessToken(user) {
    return jwt.sign(
      {
        userId: user.id,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }, // 15 minutes
    );
  }

  /**
   * Generate JWT refresh token (long-lived)
   * @param {Object} user - User object from database
   * @returns {string} JWT refresh token
   */
  generateRefreshToken(user) {
    return jwt.sign(
      {
        userId: user.id,
        type: 'refresh',
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }, // 7 days
    );
  }
}

export const authService = new AuthService();
