import React from "react";
import { CheckCircle, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { Button } from "ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerToken } from "../../../lib/auth-server";
import { queryGQL } from "../../../lib/apollo-server";
import { GET_DEFAULT_ONBOARDING_DETAILS } from "../../../lib/queries";
import { AuthScopes } from "../../../__generated__/graphql";
import { Route } from "../../../constants/routes";

export default async function CompleteOnboardingPage() {
  const token = await getServerToken();
  const { getCurrentUser } = await queryGQL(
    GET_DEFAULT_ONBOARDING_DETAILS,
    {},
    token,
  );
  if (!getCurrentUser.onboardingData) redirect(Route.OnboardingBasicDetails);
  return (
    <>
      <h2 className=" my-10 text-center text-4xl font-bold">
        Let's connect your socials
      </h2>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <InstagramLogo />
          <h4>Instagram</h4>
        </div>
        {getCurrentUser.scopes.includes(AuthScopes.Instagram) ? (
          <div className="flex items-center gap-3">
            <h4>Connected</h4>
            <CheckCircle />
          </div>
        ) : (
          <Link
            href={`/_auth/instagram?redirectURL=${Route.OnboardingSocials}`}
          >
            <Button>Connect</Button>
          </Link>
        )}
      </div>
      {getCurrentUser.scopes.some((scope) =>
        [AuthScopes.Instagram].includes(scope),
      ) && (
        <Link href={Route.OnboardingComplete}>
          <Button>Next</Button>
        </Link>
      )}
    </>
  );
}
