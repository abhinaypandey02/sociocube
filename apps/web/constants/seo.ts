import type { Metadata } from "next";

export const SEO = {
  title: `Freeluencers – Connecting Brands with Influencers`,
  description:
    "Freeluencers is your go-to platform for seamless influencer collaborations. Combine the flexibility of freelancing with the power of influencer marketing.",
  companyName: "Freeluencers",
  themeColor: "#F45B69",
};

export const getSEO = (
  title?: string,
  description?: string,
  images?: string[],
): Metadata => ({
  title: title ? `${title} • Freeluencers` : SEO.title,
  description: description || SEO.description,
  openGraph: {
    title: title ? title : SEO.title,
    description: description || SEO.description,
    type: "website",
    siteName: title ? title : SEO.title,
    images: images || [
      `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/opengraph-image.png`,
    ],
  },

  twitter: {
    title: title ? title : SEO.title,
    description: description || SEO.description,
    images: images || [
      `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/twitter-image.png`,
    ],
    card: "summary_large_image",
  },
  appleWebApp: {
    title: title ? title : SEO.title,
    capable: true,
    startupImage:
      images?.[0] ||
      `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/opengraph-image.png`,
  },
  applicationName: SEO.companyName,
  creator: SEO.companyName,
  robots: "index, follow",
  publisher: SEO.companyName,
});
