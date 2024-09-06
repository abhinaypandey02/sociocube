import type { PropsWithChildren } from "react";
import React from "react";
import Script from "next/script";
import { getServerToken, handleAuthorized } from "../../lib/auth-server";
import SocialBar from "./components/social-bar";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const token = await getServerToken();
  if (token) {
    handleAuthorized();
    return;
  }
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad" />
      <div className="flex min-h-[85vh] w-full items-center justify-center">
        <div className="w-full max-w-lg rounded bg-white p-5 shadow-elevation-2">
          {children}
          <SocialBar />
        </div>
      </div>
    </>
  );
}
