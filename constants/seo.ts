import type { Metadata } from "next";

export const SEO = {
  title: `Sociocube – Connecting Brands with Influencers` as const,
  description:
    "Sociocube is your go-to platform for seamless influencer collaborations. Combine the flexibility of freelancing with the power of influencer marketing." as const,
  companyName: "Sociocube" as const,
  themeColor: "#5b9364" as const,
};

export const getSEO = (title?: string, description?: string): Metadata => ({
  title: title ? `${title} • Sociocube` : SEO.title,
  description: description || SEO.description,
  openGraph: {
    type: "website",
    siteName: SEO.companyName,
  },

  twitter: {
    card: "summary_large_image",
  },
  appleWebApp: {
    title: title ? title : SEO.title,
    capable: true,
    startupImage: `${process.env.NEXT_PUBLIC_BASE_URL}/apple-icon.png`,
  },
  applicationName: SEO.companyName,
  creator: SEO.companyName,
  robots: "index, follow",
  publisher: SEO.companyName,
});
