import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import type { PropsWithChildren } from "react";
import { Suspense } from "react";
import { Navbar } from "ui/navbar";
import { Footer } from "ui/footer";
import { ApolloWrapper } from "../lib/apollo-client";
import { GlobalStateWrapper } from "../lib/auth-client";
import AuthorisedNavbar from "./components/authorised-navbar";
import { UNAUTHORISED_NAVBAR_SECTIONS } from "./constants";

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
            <Suspense
              fallback={<Navbar sections={UNAUTHORISED_NAVBAR_SECTIONS} />}
            >
              <AuthorisedNavbar />
            </Suspense>
            <main className="grow">{children}</main>
            <Footer />
          </GlobalStateWrapper>
        </ApolloWrapper>
      </body>
    </html>
  );
}
