import React from "react";
import { cookies } from "next/headers";
import { Injector, queryGQL } from "../../lib/apollo-server";
import { GET_DEFAULT_ONBOARDING_DETAILS } from "../../lib/queries";
import { getSEO } from "../../constants/seo";
import OnboardingWizard from "./onboarding-wizard";

export default function AuthLayout() {
  return (
    <div className="mx-auto flex min-h-[85vh] w-full max-w-7xl  px-3 pt-10 sm:px-8">
      <Injector
        Component={OnboardingWizard}
        fetch={async () =>
          queryGQL(GET_DEFAULT_ONBOARDING_DETAILS, {}, await cookies(), 0)
        }
      />
    </div>
  );
}
export const metadata = getSEO("Become an influencer");
