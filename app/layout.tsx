import "./globals.css";
import "./animations.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import type { Viewport } from "next";
import { Nunito_Sans as NunitoSans } from "next/font/google";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import type { PropsWithChildren } from "react";
import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import AuthApply from "@/app/(public)/components/auth/auth-apply";
import SubscriptionApply from "@/app/(public)/components/auth/subscription-apply";
import TokenApply from "@/app/(public)/components/auth/token-apply";
import ErrorToaster from "@/app/(public)/components/error-toaster";
import Schema from "@/app/(public)/components/schema";
import { getSEO, SEO } from "@/constants/seo";
import { ApolloWrapper } from "@/lib/apollo-client";
import { Injector, queryGQL } from "@/lib/apollo-server";
import { GET_CURRENT_USER, GET_SUBSCRIPTION } from "@/lib/queries";
import { GlobalStateWrapper } from "@/state/memory";

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
            <Injector
              fetch={async () =>
                queryGQL(GET_CURRENT_USER, undefined, await cookies(), 0)
              }
              Component={AuthApply}
            />
            <Injector
              fetch={async () =>
                queryGQL(GET_SUBSCRIPTION, undefined, await cookies(), 0)
              }
              Component={SubscriptionApply}
            />
            <Injector
              fetch={async () =>
                fetch(process.env.NEXT_PUBLIC_BACKEND_BASE_URL + `/email`, {
                  credentials: "include",
                  headers: {
                    Cookie: (await cookies()).toString(),
                  },
                })
                  .then((res) => res.text())
                  .catch(() => null)
              }
              Component={TokenApply}
            />
            {children}
          </GlobalStateWrapper>
        </ApolloWrapper>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
    </html>
  );
}
