import type { MetadataRoute } from "next";

import { Route } from "@/constants/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    host: "*",
    rules: {
      userAgent: "*",
      disallow: [Route.Login, Route.Chat, "/_next", "*opengraph-image*"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
  };
}
