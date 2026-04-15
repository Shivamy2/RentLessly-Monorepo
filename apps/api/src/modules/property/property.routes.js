/**
 * Property Module Routes
 * Defines property search, filter, and details endpoints
 */

import express from 'express';
import { propertyController } from './property.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const router = express.Router();

/**
 * GET /api/properties
 * Get all properties with filters and pagination
 * Query params: location, bhk, priceMin, priceMax, furnished, page, limit
 */
router.get('/', propertyController.getProperties);

/**
 * GET /api/properties/:propertyId
 * Get single property details by ID
 */
router.get('/:propertyId', propertyController.getPropertyById);

/**
 * GET /api/properties/slug/:slug
 * Get property by SEO-friendly slug
 */
router.get('/slug/:slug', propertyController.getPropertyBySlug);

/**
 * POST /api/properties (Admin only)
 * Create new property
 */
router.post('/', authMiddleware, propertyController.createProperty);

export default router;
