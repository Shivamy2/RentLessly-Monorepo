/**
 * Main API Entry Point
 * Initializes Express server, configures middleware, and mounts routes
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import dotenv from 'dotenv';

import authRoutes from './modules/auth/auth.routes.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import { loggerMiddleware } from './middleware/logger.middleware.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * Middleware Configuration
 */

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Logger middleware
app.use(loggerMiddleware);

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

/**
 * API Routes
 */
app.use('/api/auth', authRoutes);
// More routes will be added here as modules are created

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
  });
});

/**
 * Global error handling middleware
 * Must be last middleware
 */
app.use(errorMiddleware);

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
