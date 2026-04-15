/**
 * Property Module Service
 * Contains business logic for property operations
 */

import { prisma } from '../../lib/prisma.js';
import { AppError } from '../../lib/errors.js';

class PropertyService {
  /**
   * Get properties with advanced filtering and pagination
   */
  async getProperties(filters, page, limit) {
    try {
      const skip = (page - 1) * limit;

      // Build where clause
      const where = {};

      if (filters.location) {
        where.locality = {
          contains: filters.location,
          mode: 'insensitive',
        };
      }

      if (filters.bhk) {
        where.bhk = Number(filters.bhk);
      }

      if (filters.priceMin || filters.priceMax) {
        where.rent = {};
        if (filters.priceMin) {
          where.rent.gte = filters.priceMin;
        }
        if (filters.priceMax) {
          where.rent.lte = filters.priceMax;
        }
      }

      if (filters.furnished !== undefined) {
        where.furnishedType = filters.furnished ? 'FULLY_FURNISHED' : 'UNFURNISHED';
      }

      where.isActive = true;

      // Fetch total count
      const total = await prisma.property.count({ where });

      // Fetch properties
      const properties = await prisma.property.findMany({
        where,
        include: {
          images: {
            take: 1, // Get first image for thumbnail
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      return {
        properties,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new AppError('Failed to fetch properties', 500);
    }
  }

  /**
   * Get single property by ID
   */
  async getPropertyById(propertyId) {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        images: true,
        broker: {
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
          },
        },
      },
    });

    if (!property) {
      throw new AppError('Property not found', 404);
    }

    // Increment view count
    await prisma.property.update({
      where: { id: propertyId },
      data: { viewCount: { increment: 1 } },
    });

    return property;
  }

  /**
   * Get property by SEO-friendly slug
   * Slug format: 2-bhk-fully-furnished-sector-56-gurugram-12345
   */
  async getPropertyBySlug(slug) {
    // Extract property ID from slug (last part)
    const parts = slug.split('-');
    const propertyId = parts[parts.length - 1];

    if (!propertyId || isNaN(propertyId)) {
      throw new AppError('Invalid property slug', 400);
    }

    return this.getPropertyById(propertyId);
  }

  /**
   * Create new property
   */
  async createProperty(data, userId) {
    // Validate required fields
    const required = ['title', 'locality', 'bhk', 'rent', 'area', 'brokerId'];
    const missing = required.filter((field) => !data[field]);

    if (missing.length > 0) {
      throw new AppError(
        `Missing required fields: ${missing.join(', ')}`,
        400,
      );
    }

    // Generate slug
    const slug = this.generateSlug(
      data.bhk,
      data.furnishedType,
      data.locality,
      Date.now(),
    );

    const property = await prisma.property.create({
      data: {
        title: data.title,
        description: data.description,
        locality: data.locality,
        city: data.city || 'GURUGRAM',
        bhk: Number(data.bhk),
        rent: Number(data.rent),
        area: Number(data.area),
        furnishedType: data.furnishedType || 'UNFURNISHED',
        amenities: data.amenities || [],
        slug,
        brokerId: data.brokerId,
        createdBy: userId,
      },
      include: {
        broker: true,
      },
    });

    return property;
  }

  /**
   * Generate SEO-friendly slug
   */
  generateSlug(bhk, furnishedType, locality, timestamp) {
    const bhkStr = `${bhk}-bhk`;
    const furnished =
      furnishedType === 'FULLY_FURNISHED' ? 'fully-furnished' : 'unfurnished';
    const localityStr = locality.toLowerCase().replace(/\s+/g, '-');

    return `${bhkStr}-${furnished}-${localityStr}-${timestamp}`;
  }
}

export const propertyService = new PropertyService();
