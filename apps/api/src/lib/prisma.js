/**
 * Prisma Client Singleton
 * Ensures single Prisma instance is used throughout the app
 */

import { PrismaClient } from '@prisma/client';

// Global variable to store Prisma instance (to avoid multiple instantiations in dev mode)
let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'warn'],
    });
  }
  prisma = global.prisma;
}

export { prisma };
