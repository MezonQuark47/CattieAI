import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Force fresh build
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
  // Disable static optimization for problematic pages
  output: 'standalone',
  // Force dynamic rendering
  generateBuildId: async () => {
    return `build-${Date.now()}`
  }
};

export default nextConfig;
