import type { PropsWithChildren } from "react";
import React from "react";
import Script from "next/script";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad" />
      {children}
    </>
  );
}
