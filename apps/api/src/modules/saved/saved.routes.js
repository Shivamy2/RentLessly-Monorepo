/**
 * Saved Properties Module Routes
 */

import express from 'express';
import { savedController } from './saved.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const router = express.Router();

/**
 * GET /api/saved
 * Get user's saved properties
 */
router.get('/', authMiddleware, savedController.getSavedProperties);

/**
 * POST /api/saved/:propertyId
 * Save a property
 */
router.post('/:propertyId', authMiddleware, savedController.saveProperty);

/**
 * DELETE /api/saved/:propertyId
 * Remove from saved
 */
router.delete(
  '/:propertyId',
  authMiddleware,
  savedController.removeSavedProperty,
);

export default router;
