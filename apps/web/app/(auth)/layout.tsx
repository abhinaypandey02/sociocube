import type { PropsWithChildren } from "react";
import React from "react";
import Script from "next/script";
import { Authorizer } from "../../lib/auth-server";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Authorizer />
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad" />
      {children}
    </>
  );
}
