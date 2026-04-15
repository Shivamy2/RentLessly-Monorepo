/**
 * Visit Module Controller
 */

import { visitService } from './visit.service.js';

class VisitController {
  async scheduleVisit(req, res, next) {
    try {
      const userId = req.user.id;
      const { propertyId, visitDate, timeSlot, notes } = req.body;

      const visit = await visitService.scheduleVisit({
        userId,
        propertyId,
        visitDate,
        timeSlot,
        notes,
      });

      return res.status(201).json({
        success: true,
        message: 'Visit scheduled successfully',
        data: visit,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserVisits(req, res, next) {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 20, status } = req.query;

      const result = await visitService.getUserVisits(
        userId,
        Number(page),
        Number(limit),
        status,
      );

      return res.status(200).json({
        success: true,
        data: result.visits,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateVisitStatus(req, res, next) {
    try {
      const { visitId } = req.params;
      const { status } = req.body;

      const visit = await visitService.updateVisitStatus(visitId, status);

      return res.status(200).json({
        success: true,
        message: 'Visit updated',
        data: visit,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const visitController = new VisitController();
