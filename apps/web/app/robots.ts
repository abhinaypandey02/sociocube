import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    host: "*",
    rules: {
      userAgent: "*",
    },
    sitemap: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/sitemap.xml`,
  };
}
