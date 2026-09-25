import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const allowIndexing = process.env.ALLOW_INDEXING === "true";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: allowIndexing ? undefined : "/",
    },
  };
}
