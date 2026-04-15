/**
 * Visit Module Service
 */

import { prisma } from '../../lib/prisma.js';
import { AppError } from '../../lib/errors.js';

class VisitService {
  async scheduleVisit(data) {
    const { userId, propertyId, visitDate, timeSlot, notes } = data;

    // Validate property exists
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new AppError('Property not found', 404);
    }

    // Check if visit already exists for same date/time
    const existing = await prisma.visit.findFirst({
      where: {
        propertyId,
        visitDate: new Date(visitDate),
        timeSlot,
        status: { in: ['SCHEDULED', 'CONFIRMED'] },
      },
    });

    if (existing && existing.userId === userId) {
      throw new AppError('You already have a visit scheduled for this time', 409);
    }

    const visit = await prisma.visit.create({
      data: {
        userId,
        propertyId,
        visitDate: new Date(visitDate),
        timeSlot,
        notes,
        status: 'SCHEDULED',
      },
      include: { property: true },
    });

    return visit;
  }

  async getUserVisits(userId, page, limit, status) {
    const skip = (page - 1) * limit;
    const where = { userId };

    if (status) {
      where.status = status;
    }

    const total = await prisma.visit.count({ where });

    const visits = await prisma.visit.findMany({
      where,
      include: {
        property: { include: { images: { take: 1 } } },
      },
      orderBy: { visitDate: 'desc' },
      skip,
      take: limit,
    });

    return {
      visits,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async updateVisitStatus(visitId, status) {
    const validStatuses = ['SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];

    if (!validStatuses.includes(status)) {
      throw new AppError('Invalid status', 400);
    }

    const visit = await prisma.visit.update({
      where: { id: visitId },
      data: { status },
      include: { property: true },
    });

    return visit;
  }
}

export const visitService = new VisitService();
