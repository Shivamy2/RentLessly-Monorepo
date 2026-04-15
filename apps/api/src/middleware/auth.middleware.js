/**
 * Authentication Middleware
 * Verifies JWT token and attaches user to request object
 */

import jwt from 'jsonwebtoken';
import { AppError } from '../lib/errors.js';

export const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authorization header missing or invalid', 401);
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Attach user info to request
    req.user = {
      id: decoded.userId,
      phoneNumber: decoded.phoneNumber,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError('Token expired', 401));
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError('Invalid token', 401));
    }
    next(error);
  }
};

/**
 * Admin Authorization Middleware
 * Ensures user has admin role
 */
export const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return next(new AppError('Authentication required', 401));
  }

  if (req.user.role !== 'ADMIN') {
    return next(new AppError('Admin access required', 403));
  }

  next();
};

/**
 * Role-based Authorization Middleware
 * @param {string[]} allowedRoles - Array of allowed roles
 */
export const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError('Insufficient permissions', 403));
    }

    next();
  };
};
