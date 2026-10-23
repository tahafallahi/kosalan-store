import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  allowedDevOrigins: ["192.168.1.7"],
  images: {
    qualities: [25, 50, 75, 100],
    remotePatterns: [{
      protocol: "http", 
      hostname: "localhost"
    }, 
    // {
    //   protocol: "https", 
    //   hostname: process.env.S3_URL ?? ""
    // }
  ],
  dangerouslyAllowLocalIP: process.env.NODE_ENV === "development"
  }
};

export default nextConfig;
