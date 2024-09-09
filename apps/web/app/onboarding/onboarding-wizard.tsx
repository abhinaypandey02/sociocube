"use client";
import React, { useState } from "react";
import { Button } from "ui/button";
import type { GetDefaultOnboardingDetailsQuery } from "../../__generated__/graphql";
import OnboardingBasicDetailsForm from "./onboarding-basic-details-form";
import SocialsStatus from "./socials-status";
import OnboardingCompleteForm from "./onboarding-complete-form";
import { ONBOARDING_SCOPES } from "./constants";
import { completedOnboardingScopes } from "./utils";

function getStep(
  currentUser: NonNullable<GetDefaultOnboardingDetailsQuery["getCurrentUser"]>,
) {
  if (!currentUser.onboardingData?.name) return 0;
  if (
    completedOnboardingScopes(currentUser.scopes).length ===
    ONBOARDING_SCOPES.length
  )
    return 2;
  if (!currentUser.isOnboarded) return 3;
  return 0;
}

function OnboardingWizard({
  currentUser,
}: {
  currentUser: NonNullable<GetDefaultOnboardingDetailsQuery["getCurrentUser"]>;
}) {
  const [step, setStep] = useState(getStep(currentUser));
  const nextStep = () => {
    setStep((o) => Math.min(o + 1, 3));
  };
  if (step === 0) {
    return (
      <>
        <h2>It's the start of something amazing!</h2>
        <Button onClick={nextStep}>Let's begin!</Button>
      </>
    );
  }
  if (step === 1)
    return (
      <OnboardingBasicDetailsForm
        defaultValues={{
          name: currentUser.onboardingData?.name || currentUser.name || "",
        }}
        nextStep={nextStep}
      />
    );
  if (step === 2)
    return <SocialsStatus nextStep={nextStep} scopes={currentUser.scopes} />;
  if (step === 3) return <OnboardingCompleteForm />;
}

export default OnboardingWizard;
