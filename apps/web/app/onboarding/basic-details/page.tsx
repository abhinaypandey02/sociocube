import React from "react";
import { getServerToken } from "../../../lib/auth-server";
import { queryGQL } from "../../../lib/apollo-server";
import { GET_DEFAULT_ONBOARDING_DETAILS } from "../../../lib/queries";
import OnboardingBasicDetailsForm from "./onboarding-basic-details-form";

export default async function LoginPage() {
  const token = await getServerToken();
  const { getCurrentUser } = await queryGQL(
    GET_DEFAULT_ONBOARDING_DETAILS,
    {},
    token,
  );
  return (
    <>
      <h2 className=" my-10 text-center text-4xl font-bold">
        Some details about you!
      </h2>
      <OnboardingBasicDetailsForm
        defaultValues={{
          name:
            getCurrentUser.onboardingData?.name || getCurrentUser.name || "",
        }}
      />
    </>
  );
}
