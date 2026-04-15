/**
 * Next.js Configuration
 * App Router setup with optimization
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for development
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudflarestorage.com', // Cloudflare R2
      },
      {
        protocol: 'https',
        hostname: '**.cloudflare.com',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // Compression
  compress: true,

  // Powering by header (optional)
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Powered-By',
            value: 'Rent Lessly',
          },
        ],
      },
    ];
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  },
};

export default nextConfig;
