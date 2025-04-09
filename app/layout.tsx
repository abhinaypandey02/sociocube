import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import type { Viewport } from "next";
import { Nunito_Sans as NunitoSans } from "next/font/google";
import localFont from "next/font/local";
import type { PropsWithChildren } from "react";
import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import ErrorToaster from "@/app/(public)/components/error-toaster";
import Schema from "@/app/(public)/components/schema";
import { getSEO, SEO } from "@/constants/seo";
import { ApolloWrapper } from "@/lib/apollo-client";
import { GlobalStateWrapper } from "@/lib/auth-client";

const madina = localFont({
  src: "../fonts/madina.woff2",
  display: "swap",
  variable: "--font-madina",
});

const kansas = localFont({
  src: [
    {
      path: "../fonts/New-Kansas/Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/New-Kansas/SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/New-Kansas/Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/New-Kansas/Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/New-Kansas/Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/New-Kansas/Thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/New-Kansas/BlackItalic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "../fonts/New-Kansas/BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/New-Kansas/SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/New-Kansas/MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/New-Kansas/RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/New-Kansas/LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/New-Kansas/ThinItalic.woff2",
      weight: "200",
      style: "italic",
    },
  ],
  variable: "--font-poppins",
});
const nunitoSans = NunitoSans({
  subsets: ["latin"],
});

export const metadata = getSEO();
export const viewport: Viewport = {
  themeColor: SEO.themeColor,
  colorScheme: "light",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`${nunitoSans.className} ${madina.variable} ${kansas.variable} flex min-h-screen flex-col bg-primary-bg `}
      >
        <Schema
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Sociocube",
            url: process.env.NEXT_PUBLIC_BASE_URL,
            alternateName: ["SocioCube", "Socio cube"],
          }}
          id="title"
        />
        <Toaster />
        <Suspense>
          <ErrorToaster />
        </Suspense>
        <ApolloWrapper>
          <GlobalStateWrapper>{children}</GlobalStateWrapper>
        </ApolloWrapper>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
    </html>
  );
}
