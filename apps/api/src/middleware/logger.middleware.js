/**
 * Logger Middleware
 * Logs incoming requests and outgoing responses
 */

import { logger } from '../lib/logger.js';

export const loggerMiddleware = (req, res, next) => {
  const startTime = Date.now();

  // Log request
  logger.info({
    message: 'Incoming request',
    method: req.method,
    path: req.path,
    query: req.query,
    ip: req.ip,
  });

  // Log response on finish
  res.on('finish', () => {
    const duration = Date.now() - startTime;

    logger.info({
      message: 'Request completed',
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
};
