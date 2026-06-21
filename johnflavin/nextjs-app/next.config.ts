import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  async redirects() {
    return [
      { source: "/our-work", destination: "/showcase", permanent: true },
      { source: "/our-work/:path*", destination: "/showcase/:path*", permanent: true },
      { source: "/catalogue", destination: "/options", permanent: true },
      { source: "/catalogue/:path*", destination: "/options/:path*", permanent: true },
      { source: "/portfolio", destination: "/selection", permanent: true },
      { source: "/portfolio/:path*", destination: "/selection/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
