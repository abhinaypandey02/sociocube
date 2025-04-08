import Script from "next/script";
import React, { PropsWithChildren, Suspense } from "react";

import AuthChecker from "@/app/(auth)/components/auth-checker";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Suspense>
        <AuthChecker />
      </Suspense>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad" />
      {children}
    </>
  );
}
