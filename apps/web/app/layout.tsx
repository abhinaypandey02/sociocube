import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import type { PropsWithChildren } from "react";
import { Suspense } from "react";
import { Footer } from "ui/footer";
import { Navbar } from "ui/navbar";
import { ApolloWrapper } from "../lib/apollo-client";
import { GlobalStateWrapper } from "../lib/auth-client";
import OptimisticNavbar from "./components/optimistic-navbar";
import { NAVBAR_COMMON_ROUTES } from "./constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Freeluence | Freelancing Influencers",
  description: "Freelancing Influencers",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <ApolloWrapper>
          <GlobalStateWrapper>
            <Suspense fallback={<Navbar sections={NAVBAR_COMMON_ROUTES} />}>
              <OptimisticNavbar />
            </Suspense>
            <main className="grow">{children}</main>
            <Footer />
          </GlobalStateWrapper>
        </ApolloWrapper>
      </body>
    </html>
  );
}
