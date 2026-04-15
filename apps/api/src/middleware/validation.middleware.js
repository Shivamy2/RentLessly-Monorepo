/**
 * Request Validation Middleware
 * Validates request body using express-validator
 */

import { body, validationResult } from 'express-validator';
import { AppError } from '../lib/errors.js';

/**
 * Validate request and return errors if any
 */
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map((e) => `${e.param}: ${e.msg}`);
    throw new AppError('Validation failed', 400, messages);
  }

  next();
};

/**
 * Validation rules for auth module
 */
export const authValidationRules = {
  sendOTP: () => [
    body('phoneNumber')
      .notEmpty()
      .withMessage('Phone number is required')
      .matches(/^[\d\+\-\s]{10,15}$/)
      .withMessage('Invalid phone format'),
  ],

  verifyOTP: () => [
    body('phoneNumber')
      .notEmpty()
      .withMessage('Phone number is required'),
    body('otp')
      .notEmpty()
      .withMessage('OTP is required')
      .matches(/^\d{6}$/)
      .withMessage('OTP must be 6 digits'),
  ],

  refreshToken: () => [
    body('refreshToken')
      .optional()
      .isString()
      .withMessage('Refresh token must be a string'),
  ],
};
