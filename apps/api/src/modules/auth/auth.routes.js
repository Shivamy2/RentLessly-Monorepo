/**
 * Auth Module Routes
 * Defines all authentication endpoints for login, registration, token refresh, etc.
 */

import express from 'express';
import { authController } from './auth.controller.js';
import { validateRequest } from '../../middleware/validation.middleware.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const router = express.Router();

/**
 * POST /api/auth/send-otp
 * Send OTP to user's phone number
 * Body: { phoneNumber: string }
 */
router.post('/send-otp', validateRequest, authController.sendOTP);

/**
 * POST /api/auth/verify-otp
 * Verify OTP and return JWT tokens
 * Body: { phoneNumber: string, otp: string }
 */
router.post('/verify-otp', validateRequest, authController.verifyOTP);

/**
 * POST /api/auth/refresh-token
 * Refresh JWT access token
 * Body: { refreshToken: string }
 */
router.post('/refresh-token', authController.refreshToken);

/**
 * GET /api/auth/me
 * Get current logged-in user details
 * Headers: Authorization: Bearer <token>
 */
router.get('/me', authMiddleware, authController.getCurrentUser);

/**
 * POST /api/auth/logout
 * Logout user (optional - mainly for token blacklist if implemented)
 * Headers: Authorization: Bearer <token>
 */
router.post('/logout', authMiddleware, authController.logout);

export default router;
