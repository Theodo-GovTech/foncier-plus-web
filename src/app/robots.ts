import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const allowIndexing = process.env.ALLOW_INDEXING === "true";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    disallow: allowIndexing ? undefined : "/",
  },
});

export default robots;
