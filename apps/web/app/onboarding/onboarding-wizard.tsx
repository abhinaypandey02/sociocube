"use client";
import React, { useState } from "react";
import { Button } from "ui/button";
import type { GetDefaultOnboardingDetailsQuery } from "../../__generated__/graphql";
import OnboardingBasicDetailsForm from "./onboarding-basic-details-form";
import SocialsStatus from "./socials-status";
import OnboardingCompleteForm from "./onboarding-complete-form";
import { ONBOARDING_SCOPES } from "./constants";
import { completedOnboardingScopes } from "./utils";
import OnboardingLocationForm from "./onboarding-location";
import OnboardingPricingForm from "./onboarding-pricing";

function getStep(
  currentUser: NonNullable<GetDefaultOnboardingDetailsQuery["getCurrentUser"]>,
) {
  if (
    completedOnboardingScopes(currentUser.scopes).length !==
    ONBOARDING_SCOPES.length
  )
    return 0;
  if (
    !currentUser.onboardingData?.name ||
    !currentUser.onboardingData.bio ||
    !currentUser.onboardingData.gender ||
    !currentUser.onboardingData.category ||
    !currentUser.onboardingData.dob
  )
    return 2;
  if (!currentUser.onboardingData.city) return 3;
  if (!currentUser.onboardingData.pricing) return 4;
  if (!currentUser.isOnboarded) return 5;
  return 0;
}

function OnboardingWizard({
  currentUser,
}: {
  currentUser: NonNullable<GetDefaultOnboardingDetailsQuery["getCurrentUser"]>;
}) {
  const [step, setStep] = useState(getStep(currentUser));
  const nextStep = () => {
    setStep((o) => Math.min(o + 1, 5));
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
    return <SocialsStatus nextStep={nextStep} scopes={currentUser.scopes} />;
  if (step === 2)
    return (
      <OnboardingBasicDetailsForm
        defaultValues={{
          name: currentUser.onboardingData?.name || currentUser.name || "",
          photo: currentUser.onboardingData?.photo || currentUser.photo || "",
          bio: currentUser.onboardingData?.bio || currentUser.bio || "",
          category: currentUser.onboardingData?.category || "",
          dob: currentUser.onboardingData?.dob || "",
          gender: currentUser.onboardingData?.gender || "",
        }}
        nextStep={nextStep}
        photoUpload={currentUser.pictureUploadURL}
      />
    );
  if (step === 3)
    return (
      <OnboardingLocationForm
        defaultValues={{
          city: currentUser.onboardingData?.city,
          country: currentUser.onboardingData?.country,
          state: currentUser.onboardingData?.state,
        }}
        nextStep={nextStep}
      />
    );
  if (step === 4)
    return (
      <OnboardingPricingForm
        defaultValues={currentUser.onboardingData?.pricing || {}}
        nextStep={nextStep}
      />
    );
  if (step === 5) return <OnboardingCompleteForm />;
}

export default OnboardingWizard;
