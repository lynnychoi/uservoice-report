import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/uservoice-report' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/uservoice-report' : '',
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
