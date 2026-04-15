/**
 * Auth Module Model
 * Prisma schema exports and database-related utilities for auth module
 * Note: Actual schema is in prisma/schema.prisma at root
 */

/**
 * User model schema from Prisma
 * 
 * model User {
 *   id                  String    @id @default(cuid())
 *   phoneNumber         String    @unique
 *   email               String?   @unique
 *   role                String    @default("USER") // USER, ADMIN, BROKER
 *   isPhoneVerified     Boolean   @default(false)
 *   isEmailVerified     Boolean   @default(false)
 *   lastLoginAt         DateTime?
 *   createdAt           DateTime  @default(now())
 *   updatedAt           DateTime  @updatedAt
 *   
 *   // Relations
 *   savedProperties     SavedProperty[]
 *   visits              Visit[]
 *   notifications       Notification[]
 * }
 * 
 * model OTPLog {
 *   id          String   @id @default(cuid())
 *   phoneNumber String
 *   otp         String
 *   attempts    Int      @default(0)
 *   isVerified  Boolean  @default(false)
 *   expiresAt   DateTime
 *   createdAt   DateTime @default(now())
 * }
 */

// This file serves as documentation and future expansion point for auth model utilities
// Auth model operations are handled through Prisma client in the service layer

export const authModel = {};
