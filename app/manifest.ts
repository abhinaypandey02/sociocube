import type { MetadataRoute } from "next";

import { SEO } from "@/constants/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SEO.title,
    short_name: SEO.companyName,
    description: SEO.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fcfcfc",
    theme_color: "#5b9364",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
