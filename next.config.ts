import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // images: {
  //   domains: ['uxjsdzryhpcckayazqev.supabase.co', 'cdn.shopify.com' ],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uxjsdzryhpcckayazqev.supabase.co', // Replace with your domain
      },
    ],
  },
  // webpack: (config) => {
  //   config.cache = false; // Disable caching
  //   return config;
  // },

  
};

export default nextConfig;
