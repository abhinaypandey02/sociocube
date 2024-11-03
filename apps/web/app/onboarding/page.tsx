import React, { Suspense } from "react";
import { cookies } from "next/headers";
import { Injector, queryGQL } from "../../lib/apollo-server";
import { GET_DEFAULT_ONBOARDING_DETAILS } from "../../lib/queries";
import OnboardingWizard from "./onboarding-wizard";

export default function AuthLayout() {
  return (
    <div className="mx-auto flex min-h-[85vh] w-full max-w-7xl  px-8 pt-10">
      <Suspense
        fallback={<OnboardingWizard data={{ getCurrentUser: null }} loading />}
      >
        <Injector
          Component={OnboardingWizard}
          fetch={async () =>
            queryGQL(GET_DEFAULT_ONBOARDING_DETAILS, {}, await cookies(), 0)
          }
        />
      </Suspense>
    </div>
  );
}
export const revalidate = 0;
