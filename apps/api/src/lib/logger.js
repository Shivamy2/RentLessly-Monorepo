/**
 * Logger Utility
 * Winston logger configuration for structured logging
 */

import winston from 'winston';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports: [
    // Console transport
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          ({ level, message, timestamp, ...meta }) =>
            `${timestamp} [${level}]: ${message} ${
              Object.keys(meta).length ? JSON.stringify(meta) : ''
            }`,
        ),
      ),
    }),

    // File transport for errors
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),

    // File transport for all logs
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
