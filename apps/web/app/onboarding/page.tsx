import React, { Suspense } from "react";
import { Spinner } from "@phosphor-icons/react/dist/ssr";
import OnboardingInjector from "./injector";

export default function AuthLayout() {
  return (
    <div className="flex min-h-[85vh] w-full items-center justify-center">
      <div className="w-full max-w-lg rounded bg-white p-5 shadow-elevation-2">
        <Suspense
          fallback={<Spinner className="animate-spin fill-primary" size={40} />}
        >
          <OnboardingInjector />
        </Suspense>
      </div>
    </div>
  );
}
