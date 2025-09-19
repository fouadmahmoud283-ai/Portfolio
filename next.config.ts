import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  images: {
    domains: [
      'images.unsplash.com',
      'github.com',
      'avatars.githubusercontent.com',
      'raw.githubusercontent.com',
      'techstack-generator.vercel.app',
      'skillicons.dev',
      'www.vectorlogo.zone',
      'upload.wikimedia.org',
      'readme-typing-svg.herokuapp.com',
      'github-readme-stats.vercel.app',
      'github-readme-streak-stats.herokuapp.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable compression
  compress: true,
};

export default nextConfig;
