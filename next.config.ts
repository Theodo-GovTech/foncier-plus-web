import type { NextConfig } from "next";

const repoName = "foncier-plus-web";
const basePath = process.env.GITHUB_ACTIONS ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
