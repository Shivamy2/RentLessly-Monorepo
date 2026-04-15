/**
 * Auth Module Helpers
 * Utility functions for OTP generation, phone number validation, etc.
 */

class AuthHelpers {
  /**
   * Generate random OTP
   * @param {number} length - Length of OTP (default: 6)
   * @returns {string} Generated OTP
   */
  generateOTP(length = 6) {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;
    return otp.toString();
  }

  /**
   * Normalize phone number to Indian format with country code
   * Handles various formats: 9876543210, +919876543210, 919876543210
   * @param {string} phoneNumber - Raw phone number
   * @returns {string|null} Normalized phone number or null if invalid
   */
  normalizePhoneNumber(phoneNumber) {
    // Remove all non-digit characters except +
    let cleaned = phoneNumber.replace(/[^\d+]/g, '');

    // Remove leading +
    if (cleaned.startsWith('+')) {
      cleaned = cleaned.slice(1);
    }

    // If starts with 91, it already has country code
    if (cleaned.startsWith('91')) {
      // Check if it's valid length (91 + 10 digits = 12)
      if (cleaned.length === 12) {
        return '+' + cleaned;
      }
    }

    // If 10 digits (without country code), add 91
    if (cleaned.length === 10 && /^\d{10}$/.test(cleaned)) {
      return '+91' + cleaned;
    }

    // Invalid format
    return null;
  }

  /**
   * Hash password using bcryptjs
   * @param {string} password - Plain text password
   * @returns {Promise<string>} Hashed password
   */
  async hashPassword(password) {
    const bcrypt = await import('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  /**
   * Compare password with hash
   * @param {string} password - Plain text password
   * @param {string} hash - Hashed password
   * @returns {Promise<boolean>} True if password matches
   */
  async comparePassword(password, hash) {
    const bcrypt = await import('bcryptjs');
    return bcrypt.compare(password, hash);
  }

  /**
   * Validate email format
   * @param {string} email - Email address
   * @returns {boolean} True if valid email
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Check if phone number is from India
   * @param {string} phoneNumber - Normalized phone number
   * @returns {boolean} True if Indian phone number
   */
  isIndianPhoneNumber(phoneNumber) {
    return phoneNumber.startsWith('+91');
  }
}

export const authHelpers = new AuthHelpers();
