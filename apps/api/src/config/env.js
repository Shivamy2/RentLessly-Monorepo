/**
 * Environment Configuration
 * Validates and exports environment variables
 */

const requiredEnvVars = [
  'DATABASE_URL',
  'ACCESS_TOKEN_SECRET',
  'REFRESH_TOKEN_SECRET',
];

// Check required environment variables
const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !process.env[envVar],
);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(', ')}`,
  );
}

export const config = {
  // Server
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database
  databaseUrl: process.env.DATABASE_URL,

  // JWT
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || '15m',
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',

  // Frontend
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

  // Twilio
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
  twilioWhatsappNumber: process.env.TWILIO_WHATSAPP_NUMBER,

  // AWS/R2
  r2AccessKeyId: process.env.R2_ACCESS_KEY_ID,
  r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  r2BucketName: process.env.R2_BUCKET_NAME,
  r2Endpoint: process.env.R2_ENDPOINT,

  // Logging
  logLevel: process.env.LOG_LEVEL || 'info',
};

export default config;
