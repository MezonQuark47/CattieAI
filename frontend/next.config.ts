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
  },
  // Webpack configuration for Node.js polyfills
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
        util: require.resolve('util'),
        assert: require.resolve('assert'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        url: require.resolve('url'),
        zlib: require.resolve('browserify-zlib'),
        path: require.resolve('path-browserify'),
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
