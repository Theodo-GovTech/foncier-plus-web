import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const BDT_ORIGIN = "https://www.banquedesterritoires.fr";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: true,
  images: { unoptimized: true },
  // The France Foncier web component loads its bundles, config and Pollen stylesheet from
  // root-relative paths, so we serve them from our origin.
  async rewrites() {
    return [
      {
        source: "/webcomponents/fo4-bdt-wc-foncier/:path*",
        destination: `${BDT_ORIGIN}/webcomponents/fo4-bdt-wc-foncier/:path*`,
      },
      {
        source: "/design/pollen/:path*",
        destination: `${BDT_ORIGIN}/design/pollen/:path*`,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
