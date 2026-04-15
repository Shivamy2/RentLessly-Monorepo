/**
 * Saved Properties Module Service
 */

import { prisma } from '../../lib/prisma.js';
import { AppError } from '../../lib/errors.js';

class SavedService {
  async getUserSavedProperties(userId, page, limit) {
    const skip = (page - 1) * limit;

    const total = await prisma.savedProperty.count({
      where: { userId },
    });

    const savedProperties = await prisma.savedProperty.findMany({
      where: { userId },
      include: { property: { include: { images: { take: 1 } } } },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return {
      properties: savedProperties.map((sp) => sp.property),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async saveProperty(userId, propertyId) {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new AppError('Property not found', 404);
    }

    // Check if already saved
    const existing = await prisma.savedProperty.findUnique({
      where: {
        userId_propertyId: { userId, propertyId },
      },
    });

    if (existing) {
      throw new AppError('Property already saved', 409);
    }

    await prisma.savedProperty.create({
      data: {
        userId,
        propertyId,
      },
    });
  }

  async removeSavedProperty(userId, propertyId) {
    await prisma.savedProperty.delete({
      where: {
        userId_propertyId: { userId, propertyId },
      },
    });
  }
}

export const savedService = new SavedService();
