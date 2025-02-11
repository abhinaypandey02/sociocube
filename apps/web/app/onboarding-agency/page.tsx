import React from "react";
import { cookies } from "next/headers";
import { Injector, queryGQL } from "../../lib/apollo-server";
import { GET_DEFAULT_AGENCY_ONBOARDING_DETAILS } from "../../lib/queries";
import { getSEO } from "../../constants/seo";
import AgencyOnboardingWizard from "./agency-onboarding-wizard";

export default async function AuthLayout({
  searchParams,
}: {
  searchParams: Promise<{ redirectURL: string | null }>;
}) {
  const { redirectURL } = await searchParams;
  return (
    <div className="mx-auto flex min-h-[83vh] w-full max-w-7xl  px-6 sm:px-8 sm:pt-10">
      <Injector
        Component={AgencyOnboardingWizard}
        fetch={async () =>
          queryGQL(
            GET_DEFAULT_AGENCY_ONBOARDING_DETAILS,
            {},
            await cookies(),
            0,
          )
        }
        props={{ redirectURL }}
      />
    </div>
  );
}
export const metadata = getSEO("Start an agency or brand!");
