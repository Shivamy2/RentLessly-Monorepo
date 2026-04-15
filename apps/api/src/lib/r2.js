/**
 * R2 Upload Service
 * Handles file uploads to Cloudflare R2
 */

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { logger } from './logger.js';

class R2Service {
    constructor() {
        this.client = new S3Client({
            region: 'auto',
            credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID,
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
            },
            endpoint: process.env.R2_ENDPOINT,
        });
    }

    /**
     * Upload file to R2
     * @param {string} filename - File name in R2
     * @param {Buffer} fileBuffer - File content
     * @param {string} mimeType - File MIME type
     * @returns {Promise<string>} Public URL
     */
    async uploadFile(filename, fileBuffer, mimeType) {
        try {
            const params = {
                Bucket: process.env.R2_BUCKET_NAME,
                Key: filename,
                Body: fileBuffer,
                ContentType: mimeType,
            };

            const command = new PutObjectCommand(params);
            await this.client.send(command);

            const publicUrl = `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET_NAME}/${filename}`;
            logger.info(`File uploaded to R2: ${filename}`);

            return publicUrl;
        } catch (error) {
            logger.error(`Failed to upload file to R2: ${error.message}`);
            throw error;
        }
    }

    /**
     * Generate unique filename with timestamp
     * @param {string} originalName
     * @returns {string}
     */
    generateFilename(originalName) {
        const timestamp = Date.now();
        const ext = originalName.split('.').pop();
        return `uploads/${timestamp}-${Math.random().toString(36).substr(2, 9)}.${ext}`;
    }
}

export const r2Service = new R2Service();