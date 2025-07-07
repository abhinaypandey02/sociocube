import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

import { getSEO } from "@/constants/seo";
import { Injector, queryGQL } from "@/lib/apollo-server";
import { GET_DEFAULT_ONBOARDING_DETAILS } from "@/lib/queries";

import OnboardingWizard from "./onboarding-wizard";

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectURL: string | null }>;
}) {
  return (
    <div className="mx-auto flex min-h-[83vh] w-full max-w-7xl  px-6 sm:px-8 sm:pt-10">
      <Injector
        Component={OnboardingWizard}
        fetch={async () => {
          const { redirectURL } = await searchParams;
          const { getCurrentUser } = await queryGQL(
            GET_DEFAULT_ONBOARDING_DETAILS,
            {},
            await cookies(),
            0,
          );
          return {
            redirectURL,
            user: getCurrentUser,
          };
        }}
      />
    </div>
  );
}
export const metadata: Metadata = getSEO("Become an influencer");
