import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // Opt into React View Transitions so /works/[slug] navigations can run
    // shared-element morphs on the artwork image (view-transition-name set
    // on <img> in ArtCard3D and the detail-page hero).
    viewTransition: true,
  },
  images: {
    // Modern formats first — Next will serve AVIF where supported.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // jvladimir.store Shopify CDN — reserved for Phase 3 when product
      // data is pulled live via the Storefront API instead of mirrored.
      {
        protocol: 'https',
        hostname: 'jvladimir.store',
        pathname: '/cdn/shop/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
