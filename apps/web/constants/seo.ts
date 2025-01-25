import type { Metadata } from "next";

export const SEO = {
  title: `Sociocube – Connecting Brands with Influencers`,
  description:
    "Sociocube is your go-to platform for seamless influencer collaborations. Combine the flexibility of freelancing with the power of influencer marketing.",
  companyName: "Sociocube",
  themeColor: "#F45B69",
};

export const getSEO = (
  title?: string,
  description?: string,
  images?: string[],
): Metadata => ({
  title: title ? `${title} • Sociocube` : SEO.title,
  description: description || SEO.description,
  openGraph: {
    title: title ? title : SEO.title,
    description: description || SEO.description,
    type: "website",
    siteName: title ? title : SEO.title,
    images,
  },

  twitter: {
    title: title ? title : SEO.title,
    description: description || SEO.description,
    images,
    card: "summary_large_image",
  },
  appleWebApp: {
    title: title ? title : SEO.title,
    capable: true,
    startupImage: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/apple-icon.png`,
  },
  applicationName: SEO.companyName,
  creator: SEO.companyName,
  robots: "index, follow",
  publisher: SEO.companyName,
});
