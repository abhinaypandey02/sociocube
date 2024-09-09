import React from "react";
import { redirect } from "next/navigation";
import { getServerToken, handleUnauthorized } from "../../lib/auth-server";
import { queryGQL } from "../../lib/apollo-server";
import { GET_DEFAULT_ONBOARDING_DETAILS } from "../../lib/queries";
import { Route } from "../../constants/routes";
import OnboardingWizard from "./onboarding-wizard";

export default async function OnboardingInjector() {
  const token = await getServerToken();
  if (!token) {
    handleUnauthorized();
    return;
  }
  const { getCurrentUser } = await queryGQL(
    GET_DEFAULT_ONBOARDING_DETAILS,
    {},
    token,
  );
  if (getCurrentUser.isOnboarded) {
    redirect(Route.Account);
  }
  return <OnboardingWizard currentUser={getCurrentUser} />;
}
