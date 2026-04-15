/**
 * Saved Properties Module Controller
 */

import { savedService } from './saved.service.js';

class SavedController {
  async getSavedProperties(req, res, next) {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 20 } = req.query;

      const result = await savedService.getUserSavedProperties(
        userId,
        Number(page),
        Number(limit),
      );

      return res.status(200).json({
        success: true,
        data: result.properties,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  async saveProperty(req, res, next) {
    try {
      const userId = req.user.id;
      const { propertyId } = req.params;

      await savedService.saveProperty(userId, propertyId);

      return res.status(200).json({
        success: true,
        message: 'Property saved successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async removeSavedProperty(req, res, next) {
    try {
      const userId = req.user.id;
      const { propertyId } = req.params;

      await savedService.removeSavedProperty(userId, propertyId);

      return res.status(200).json({
        success: true,
        message: 'Property removed from saved',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const savedController = new SavedController();
