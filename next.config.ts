import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 changed default to [75] only — pin the qualities used in code.
    qualities: [50, 75, 90],
    // 4h is the new Next 16 default; pinned here for clarity.
    minimumCacheTTL: 14400,
  },
};

export default nextConfig;
