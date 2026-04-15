/**
 * Visit Module Routes
 */

import express from 'express';
import { visitController } from './visit.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const router = express.Router();

/**
 * POST /api/visits
 * Schedule a visit
 */
router.post('/', authMiddleware, visitController.scheduleVisit);

/**
 * GET /api/visits
 * Get user's scheduled visits
 */
router.get('/', authMiddleware, visitController.getUserVisits);

/**
 * PUT /api/visits/:visitId
 * Update visit status
 */
router.put('/:visitId', authMiddleware, visitController.updateVisitStatus);

export default router;
