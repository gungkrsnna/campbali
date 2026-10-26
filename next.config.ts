import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Keep the dev-only "N" badge in the bottom-right corner.
  devIndicators: { position: "bottom-right" },
  turbopack: {
    rules: {
      "*.css": {
        // Let Next.js preserve scoped class exports for CSS Modules.
        condition: { not: { path: /\.module\.css$/ } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
