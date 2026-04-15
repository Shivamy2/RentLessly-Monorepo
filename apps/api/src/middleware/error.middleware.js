/**
 * Error Handling Middleware
 * Centralized error handler for all routes
 */

import { AppError } from '../lib/errors.js';
import { logger } from '../lib/logger.js';

export const errorMiddleware = (err, req, res, next) => {
  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Default error
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors = [];

  // Handle custom AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors || [];
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
    errors = Object.values(err.errors).map((e) => e.message);
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  // Handle Prisma errors
  if (err.code === 'P2002') {
    // Unique constraint violation
    statusCode = 409;
    message = 'This resource already exists';
  }

  if (err.code === 'P2025') {
    // Record not found
    statusCode = 404;
    message = 'Resource not found';
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    errors: process.env.NODE_ENV === 'development' ? errors : [],
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
