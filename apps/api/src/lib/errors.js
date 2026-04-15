/**
 * Custom Error Class
 * Extends Error with status code and additional error details
 */

export class AppError extends Error {
  constructor(message, statusCode = 500, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.timestamp = new Date().toISOString();

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Async error wrapper for route handlers
 * Automatically catches and passes errors to error middleware
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
