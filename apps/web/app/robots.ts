import type { MetadataRoute } from "next";
import { Route } from "../constants/routes";

export default function robots(): MetadataRoute.Robots {
  return {
    host: "*",
    rules: {
      userAgent: "*",
      disallow: [Route.Login, Route.Account, Route.Chat],
    },
    sitemap: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/sitemap.xml`,
  };
}
