import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30, // Dynamic routes stale after 30 seconds
      static: 180, // Static routes stale after 3 minutes
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      }
    ],
  },
};

export default nextConfig;
