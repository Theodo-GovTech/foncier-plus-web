import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { buildSecurityHeaders } from "./src/lib/securityHeaders.ts";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  headers: () => [{ source: "/(.*)", headers: buildSecurityHeaders(isDev) }],
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
