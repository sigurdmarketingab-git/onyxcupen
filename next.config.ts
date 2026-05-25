import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/studio", destination: "/studio/structure", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "onyxcupen.se" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "stats.innebandy.se" },
    ],
  },
};

export default nextConfig;
