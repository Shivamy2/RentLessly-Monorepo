/**
 * Shared Middleware for Auth Module Validation
 * Used with auth routes
 */

import {
  authValidationRules,
  validateRequest,
} from '../../middleware/validation.middleware.js';

export const validateSendOTP = authValidationRules.sendOTP();
export const validateVerifyOTP = authValidationRules.verifyOTP();
export const validateRefreshToken = authValidationRules.refreshToken();
