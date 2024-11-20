import type { MetadataRoute } from "next";
import { SEO } from "../constants/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SEO.title,
    short_name: SEO.companyName,
    description: SEO.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fcfcfc",
    theme_color: "#F45B69",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
