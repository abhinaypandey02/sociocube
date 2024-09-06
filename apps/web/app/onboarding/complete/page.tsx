import React from "react";
import { redirect } from "next/navigation";
import { getServerToken } from "../../../lib/auth-server";
import { queryGQL } from "../../../lib/apollo-server";
import { GET_CURRENT_USER } from "../../../lib/queries";
import { Route } from "../../../constants/routes";
import { AuthScopes } from "../../../__generated__/graphql";
import OnboardingCompleteForm from "./onboarding-complete-form";

export default async function CompleteOnboardingPage() {
  const token = await getServerToken();
  const { getCurrentUser } = await queryGQL(GET_CURRENT_USER, {}, token);
  if (
    !getCurrentUser.scopes.some((scope) =>
      [AuthScopes.Instagram].includes(scope),
    )
  )
    redirect(Route.OnboardingSocials);
  return (
    <>
      <h2 className=" my-10 text-center text-4xl font-bold">
        All done? Let's finish it off!
      </h2>
      <OnboardingCompleteForm />
    </>
  );
}
