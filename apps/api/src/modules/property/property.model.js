/**
 * Property Module Model
 * Prisma schema documentation for property-related models
 * 
 * model Property {
 *   id                String     @id @default(cuid())
 *   title             String
 *   description       String?
 *   slug              String     @unique // SEO-friendly URL slug
 *   locality          String     // Area/sector name
 *   city              String     @default("GURUGRAM") // Currently Gurugram
 *   bhk               Int        // 1, 2, 3, 4 BHK
 *   rent              Int        // Monthly rent
 *   area              Int        // Area in sq.ft
 *   furnishedType     String     // UNFURNISHED, SEMI_FURNISHED, FULLY_FURNISHED
 *   amenities         String[]   // ["AC", "Balcony", "Gym", "Pool"]
 *   viewCount         Int        @default(0)
 *   isActive          Boolean    @default(true)
 *   createdBy         String     // Admin user ID
 *   brokerId          String
 *   createdAt         DateTime   @default(now())
 *   updatedAt         DateTime   @updatedAt
 *   
 *   // Relations
 *   images            PropertyImage[]
 *   broker            Broker         @relation(fields: [brokerId] references: [id])
 *   savedBy           SavedProperty[]
 *   visits            Visit[]
 * }
 * 
 * model PropertyImage {
 *   id          String   @id @default(cuid())
 *   url         String   // Cloudflare R2 URL
 *   order       Int      // Display order
 *   propertyId  String
 *   createdAt   DateTime @default(now())
 *   
 *   property    Property @relation(fields: [propertyId] references: [id], onDelete: Cascade)
 * }
 */

export const propertyModel = {};
