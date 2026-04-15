/**
 * OTP Service
 * Handles OTP generation, storage, and sending via Twilio
 */

import twilio from 'twilio';
import { logger } from './logger.js';

// In-memory OTP store (use Redis in production)
const otpStore = new Map();

class OTPService {
  constructor() {
    this.twilioClient = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  /**
   * Store OTP in cache
   * @param {string} phoneNumber - Normalized phone number
   * @param {string} otp - OTP code
   * @param {number} expirySeconds - Expiry time in seconds
   */
  async store(phoneNumber, otp, expirySeconds) {
    const expiryTime = Date.now() + expirySeconds * 1000;

    otpStore.set(phoneNumber, {
      otp,
      expiryTime,
      attempts: 0,
    });

    // Cleanup expired OTP after expiry time
    setTimeout(() => {
      otpStore.delete(phoneNumber);
    }, expirySeconds * 1000);

    logger.info(`OTP stored for ${phoneNumber}, expires in ${expirySeconds}s`);
  }

  /**
   * Verify OTP
   * @param {string} phoneNumber - Normalized phone number
   * @param {string} otp - OTP provided by user
   * @returns {boolean} True if OTP is valid
   */
  async verify(phoneNumber, otp) {
    const storedData = otpStore.get(phoneNumber);

    if (!storedData) {
      logger.warn(`OTP verification failed: No OTP found for ${phoneNumber}`);
      return false;
    }

    // Check if OTP is expired
    if (Date.now() > storedData.expiryTime) {
      otpStore.delete(phoneNumber);
      logger.warn(`OTP verification failed: OTP expired for ${phoneNumber}`);
      return false;
    }

    // Check attempts (max 3)
    if (storedData.attempts >= 3) {
      otpStore.delete(phoneNumber);
      logger.warn(
        `OTP verification failed: Max attempts exceeded for ${phoneNumber}`,
      );
      return false;
    }

    // Check OTP
    if (storedData.otp !== otp) {
      storedData.attempts += 1;
      logger.warn(
        `OTP verification failed: Invalid OTP for ${phoneNumber} (attempt ${storedData.attempts})`,
      );
      return false;
    }

    logger.info(`OTP verified successfully for ${phoneNumber}`);
    return true;
  }

  /**
   * Delete OTP from cache
   * @param {string} phoneNumber - Normalized phone number
   */
  async delete(phoneNumber) {
    otpStore.delete(phoneNumber);
    logger.info(`OTP deleted for ${phoneNumber}`);
  }

  /**
   * Send OTP via Twilio SMS
   * @param {string} phoneNumber - Phone number with country code
   * @param {string} otp - OTP to send
   */
  async sendViaTwilio(phoneNumber, otp) {
    try {
      const message = await this.twilioClient.messages.create({
        body: `Your Rent Lessly verification code is: ${otp}. Valid for 10 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });

      logger.info(
        `OTP sent successfully to ${phoneNumber} via Twilio (SID: ${message.sid})`,
      );
      return message;
    } catch (error) {
      logger.error(`Failed to send OTP to ${phoneNumber}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send OTP via Whatsapp (Twilio)
   * @param {string} phoneNumber - Phone number with country code
   * @param {string} otp - OTP to send
   */
  async sendViaWhatsapp(phoneNumber, otp) {
    try {
      const message = await this.twilioClient.messages.create({
        body: `Your Rent Lessly verification code is: ${otp}. Valid for 10 minutes.`,
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: `whatsapp:${phoneNumber}`,
      });

      logger.info(
        `OTP sent successfully to ${phoneNumber} via WhatsApp (SID: ${message.sid})`,
      );
      return message;
    } catch (error) {
      logger.error(`Failed to send OTP via WhatsApp to ${phoneNumber}: ${error.message}`);
      throw error;
    }
  }
}

export const otpService = new OTPService();
