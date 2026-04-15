/**
 * Auth Module Controller
 * Handles HTTP requests for authentication endpoints
 * All business logic is delegated to the service layer
 */

import { authService } from './auth.service.js';

class AuthController {
  /**
   * Send OTP to user's phone number
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware
   */
  async sendOTP(req, res, next) {
    try {
      const { phoneNumber } = req.body;

      const result = await authService.sendOTP(phoneNumber);

      return res.status(200).json({
        success: true,
        message: 'OTP sent successfully',
        data: {
          phoneNumber: result.phoneNumber,
          expiresIn: result.expiresIn,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Verify OTP and issue JWT tokens
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware
   */
  async verifyOTP(req, res, next) {
    try {
      const { phoneNumber, otp } = req.body;

      const { accessToken, refreshToken, user } = await authService.verifyOTP(
        phoneNumber,
        otp,
      );

      // Set refresh token in httpOnly cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return res.status(200).json({
        success: true,
        message: 'OTP verified successfully',
        data: {
          accessToken,
          user: {
            id: user.id,
            phoneNumber: user.phoneNumber,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Refresh JWT access token
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware
   */
  async refreshToken(req, res, next) {
    try {
      const refreshToken =
        req.body.refreshToken || req.cookies.refreshToken;

      const { accessToken, newRefreshToken } =
        await authService.refreshAccessToken(refreshToken);

      // Update refresh token cookie
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        data: { accessToken },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get current authenticated user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware
   */
  async getCurrentUser(req, res, next) {
    try {
      const userId = req.user.id;

      const user = await authService.getUserById(userId);

      return res.status(200).json({
        success: true,
        data: {
          id: user.id,
          phoneNumber: user.phoneNumber,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Logout user (optional - can be used for token blacklisting)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware
   */
  async logout(req, res, next) {
    try {
      res.clearCookie('refreshToken');

      return res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
