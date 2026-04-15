/**
 * Property Module Controller
 * Handles property-related HTTP requests
 */

import { propertyService } from './property.service.js';

class PropertyController {
  /**
   * Get properties with filters
   */
  async getProperties(req, res, next) {
    try {
      const {
        location,
        bhk,
        priceMin,
        priceMax,
        furnished,
        page = 1,
        limit = 20,
      } = req.query;

      const filters = {
        location,
        bhk,
        priceMin: priceMin ? Number(priceMin) : undefined,
        priceMax: priceMax ? Number(priceMax) : undefined,
        furnished: furnished === 'true',
      };

      const result = await propertyService.getProperties(
        filters,
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

  /**
   * Get single property by ID
   */
  async getPropertyById(req, res, next) {
    try {
      const { propertyId } = req.params;

      const property = await propertyService.getPropertyById(propertyId);

      return res.status(200).json({
        success: true,
        data: property,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get property by SEO slug
   */
  async getPropertyBySlug(req, res, next) {
    try {
      const { slug } = req.params;

      const property = await propertyService.getPropertyBySlug(slug);

      return res.status(200).json({
        success: true,
        data: property,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new property (admin only)
   */
  async createProperty(req, res, next) {
    try {
      const propertyData = req.body;
      const userId = req.user.id;

      const newProperty = await propertyService.createProperty(
        propertyData,
        userId,
      );

      return res.status(201).json({
        success: true,
        message: 'Property created successfully',
        data: newProperty,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const propertyController = new PropertyController();
