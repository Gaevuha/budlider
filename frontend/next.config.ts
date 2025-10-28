import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    domains: ["cdn.dummyjson.com", "budlider.vercel.app"],
  },
  async rewrites() {
    return [
      {
        source: "/backend/:path*", // всі запити на /backend/*
        destination: "http://localhost:5000/:path*", // проксі на Node.js
      },
    ];
  },
};

export default nextConfig;
