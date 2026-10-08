import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  images: { unoptimized: true },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
