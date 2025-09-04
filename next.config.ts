import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.dummyjson.com'], // заміни на домен, з якого приходять картинки з бекенду
  },
};

export default nextConfig;
