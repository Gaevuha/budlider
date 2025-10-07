import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.dummyjson.com', 'budlider.vercel.app'], // домен для картинок
  },
  async rewrites() {
    return [
      {
        source: '/:path*', // всі запити на /api/*
        destination: 'http://localhost:5000/:path*', // проксируються на бекенд
      },
    ];
  },
};

export default nextConfig;
