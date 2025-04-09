import type { MetadataRoute } from "next";

import { Route } from "@/constants/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: Route.Home,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: Route.Search,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: Route.Campaigns,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: Route.PrivacyPolicy,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: Route.TermsConditions,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
  const { users, campaigns } = (await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-sitemap-data`,
  ).then((data) => data.json())) as {
    campaigns: number[];
    users: string[];
  };
  routes.push(
    ...users.map((user) => ({
      url: `${Route.Profile}/${user}`,
      lastModified: new Date(),
      changeFrequency:
        "weekly" as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: 0.9,
    })),
  );
  routes.push(
    ...campaigns.map((user) => ({
      url: `${Route.Campaigns}/${user}`,
      lastModified: new Date(),
      changeFrequency:
        "weekly" as MetadataRoute.Sitemap[number]["changeFrequency"],
      priority: 0.9,
    })),
  );
  return routes.map((route) => ({
    ...route,
    url: process.env.NEXT_PUBLIC_BASE_URL + route.url,
  }));
}
