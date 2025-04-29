import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import type { Viewport } from "next";
import { Nunito_Sans as NunitoSans } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import type { PropsWithChildren } from "react";
import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import ErrorToaster from "@/app/(public)/components/error-toaster";
import Schema from "@/app/(public)/components/schema";
import { getSEO, SEO } from "@/constants/seo";
import { ApolloWrapper } from "@/lib/apollo-client";
import { GlobalStateWrapper } from "@/lib/auth-client";

import AuthChecker from "./(public)/components/auth/auth-checker";
import TokenChecker from "./(public)/components/auth/token-checker";

const madina = localFont({
  src: "../fonts/madina.woff2",
  display: "swap",
  variable: "--font-madina",
});

const kansas = localFont({
  src: [
    {
      path: "../fonts/New-Kansas/Bold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/New-Kansas/SemiBold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/New-Kansas/Medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/New-Kansas/Regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/New-Kansas/Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/New-Kansas/Thin.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/New-Kansas/BoldItalic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "../fonts/New-Kansas/SemiBoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/New-Kansas/MediumItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/New-Kansas/RegularItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/New-Kansas/LightItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/New-Kansas/ThinItalic.woff2",
      weight: "300",
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
  if (process.env.NODE_ENV === "production") {
    // eslint-disable-next-line -- Message for public
  console.log(
      "BRO PLEASE DON'T TRY TO HACK. I AM BUILDING THIS ALONE, I AM NOT A BIG TECH COMPANY, JUST A SOLO DEVELOPER LIKE YOU, I AM MIGHT HAVE LEFT SOME LOOPHOLES. BE A GOOD HUMAN. I AM TRYING TO SAVE FOR MASTERS IN USA JUST LEAVE ME ALONE BRO I AM JUST 21 WTF IS WRONG WITH YOU.",
    );
  }
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`${nunitoSans.className} ${madina.variable} ${kansas.variable} flex flex-col bg-background `}
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
          <GlobalStateWrapper>
            <Suspense>
              <AuthChecker />
            </Suspense>
            <Suspense>
              <TokenChecker />
            </Suspense>
            {children}
          </GlobalStateWrapper>
        </ApolloWrapper>
      </body>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_AD_ID}`}
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
    </html>
  );
}
