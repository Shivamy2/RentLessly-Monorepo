/**
 * Shared API Types
 * Used across frontend and backend
 */

// =====================
// User Types
// =====================

/**
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} phoneNumber - User's phone number
 * @property {string} [email] - User's email
 * @property {string} role - USER | ADMIN | BROKER
 * @property {boolean} isPhoneVerified
 * @property {string} createdAt - ISO date string
 */

// =====================
// Property Types
// =====================

/**
 * @typedef {Object} PropertyFilters
 * @property {string} [location] - Search location
 * @property {number} [bhk] - Number of bedrooms
 * @property {number} [priceMin] - Minimum rent
 * @property {number} [priceMax] - Maximum rent
 * @property {boolean} [furnished] - Furnished status
 * @property {number} [page] - Page number
 * @property {number} [limit] - Items per page
 */

/**
 * @typedef {Object} Property
 * @property {string} id
 * @property {string} title
 * @property {string} slug - SEO-friendly slug
 * @property {string} locality
 * @property {string} city
 * @property {number} bhk
 * @property {number} rent - Monthly rent in INR
 * @property {number} area - Area in sq.ft
 * @property {string} furnishedType - UNFURNISHED | SEMI_FURNISHED | FULLY_FURNISHED
 * @property {string[]} amenities - ["AC", "Balcony", etc]
 * @property {PropertyImage[]} images
 * @property {number} viewCount
 * @property {string} createdAt
 */

/**
 * @typedef {Object} PropertyImage
 * @property {string} id
 * @property {string} url - Cloudflare R2 URL
 * @property {number} order
 */

// =====================
// Visit Types
// =====================

/**
 * @typedef {Object} Visit
 * @property {string} id
 * @property {string} propertyId
 * @property {string} visitDate
 * @property {string} timeSlot
 * @property {string} status - SCHEDULED | CONFIRMED | COMPLETED | CANCELLED
 * @property {string} [notes]
 * @property {string} createdAt
 */

/**
 * @typedef {Object} ScheduleVisitPayload
 * @property {string} propertyId
 * @property {string} visitDate - ISO date string
 * @property {string} timeSlot
 * @property {string} [notes]
 */

// =====================
// API Response Types
// =====================

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {string} message
 * @property {any} data
 */

/**
 * @typedef {Object} PaginationMeta
 * @property {number} page
 * @property {number} limit
 * @property {number} total
 * @property {number} pages
 */

export const types = {};
