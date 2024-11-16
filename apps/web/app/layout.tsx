import "./globals.css";
import type { Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "../globals.css";
import type { PropsWithChildren } from "react";
import { Suspense } from "react";
import { Footer } from "ui/footer";
import { Navbar } from "ui/navbar";
import { Toaster } from "react-hot-toast";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ApolloWrapper } from "../lib/apollo-client";
import { GlobalStateWrapper } from "../lib/auth-client";
import { getSEO, SEO } from "../constants/seo";
import { Route } from "../constants/routes";
import type { GetCurrentUserQuery } from "../__generated__/graphql";
import { getCurrentUser, Injector } from "../lib/apollo-server";
import OptimisticNavbar from "./components/optimistic-navbar";
import { UNAUTHORISED_NAVBAR_SECTIONS } from "./constants";

const inter = Inter({
  subsets: ["latin"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata = getSEO();
export const viewport: Viewport = {
  themeColor: SEO.themeColor,
  colorScheme: "light",
};

function AuthFooter({ data }: { data?: GetCurrentUserQuery }) {
  if (data?.user) {
    if (data.user.isOnboarded) {
      return (
        <Footer
          links={[
            { name: "Search", href: Route.Search },
            { name: "Account", href: Route.Account },
            { name: "How it works", href: "/#how-it-works" },
            { name: "Features", href: "/#features" },
            { name: "Terms", href: Route.TermsConditions },
            { name: "Privacy", href: Route.PrivacyPolicy },
          ]}
        />
      );
    }
    return (
      <Footer
        links={[
          { name: "Search", href: Route.Search },
          { name: "Get listed", href: Route.Onboarding },
          { name: "How it works", href: "/#how-it-works" },
          { name: "Features", href: "/#features" },
          { name: "Terms", href: Route.TermsConditions },
          { name: "Privacy", href: Route.PrivacyPolicy },
        ]}
      />
    );
  }
  return (
    <Footer
      links={[
        { name: "Search", href: Route.Search },
        { name: "Sign up", href: Route.SignUp },
        { name: "Login", href: Route.Login },
        { name: "How it works", href: "/#how-it-works" },
        { name: "Features", href: "/#features" },
        { name: "Terms", href: Route.TermsConditions },
        { name: "Privacy", href: Route.PrivacyPolicy },
      ]}
    />
  );
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html className="scroll-smooth" lang="en">
      <body
        className={`${inter.className} ${poppins.variable} flex min-h-screen flex-col  bg-primary-bg`}
      >
        <Toaster />
        <ApolloWrapper>
          <GlobalStateWrapper>
            <Suspense
              fallback={
                <Navbar {...UNAUTHORISED_NAVBAR_SECTIONS} secondaryLinks={[]} />
              }
            >
              <OptimisticNavbar />
            </Suspense>
            <main className="grow">{children}</main>

            <Injector Component={AuthFooter} fetch={getCurrentUser} />
          </GlobalStateWrapper>
        </ApolloWrapper>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
    </html>
  );
}
