/**
 * Shared Utilities
 * Reusable functions for both frontend and backend
 */

/**
 * Validate Indian phone number
 * @param {string} phone - Phone number
 * @returns {boolean}
 */
export const isValidIndianPhone = (phone) => {
  const cleaned = phone.replace(/[^\d]/g, '');
  if (cleaned.length === 10) return true;
  if (cleaned.length === 12 && cleaned.startsWith('91')) return true;
  return false;
};

/**
 * Normalize phone number to +91 format
 * @param {string} phone
 * @returns {string}
 */
export const normalizePhone = (phone) => {
  let cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+')) cleaned = cleaned.slice(1);
  if (cleaned.startsWith('91')) return '+' + cleaned;
  if (cleaned.length === 10) return '+91' + cleaned;
  return null;
};

/**
 * Format price in Indian Rupees
 * @param {number} price
 * @returns {string}
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * Format area with unit
 * @param {number} area - Area in sq.ft
 * @returns {string}
 */
export const formatArea = (area) => {
  return `${area.toLocaleString('en-IN')} sq.ft`;
};

/**
 * Generate SEO slug from title and ID
 * @param {string} title
 * @param {string} id
 * @returns {string}
 */
export const generateSearchSlug = (title, id) => {
  const slugified = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return `${slugified}-${id}`;
};

/**
 * Extract ID from slug
 * @param {string} slug
 * @returns {string|null}
 */
export const extractIdFromSlug = (slug) => {
  const parts = slug.split('-');
  return parts[parts.length - 1] || null;
};

/**
 * Debounce function
 * @param {Function} func
 * @param {number} delay
 * @returns {Function}
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const utils = {};
