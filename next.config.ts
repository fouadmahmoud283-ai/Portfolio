import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  images: {
    // `images.domains` was removed in Next 16 — remotePatterns is the
    // replacement, and already covered every host the old list named.
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  compress: true,
};

export default nextConfig;
