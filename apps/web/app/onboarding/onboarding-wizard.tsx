"use client";
import React, { useState } from "react";
import { Button, Variants } from "ui/button";
import { ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { GetDefaultOnboardingDetailsQuery } from "../../__generated__/graphql";
import { Route } from "../../constants/routes";
import OnboardingBasicDetailsForm from "./onboarding-basic-details-form";
import SocialsStatus from "./socials-status";
import { ONBOARDING_SCOPES } from "./constants";
import { completedOnboardingScopes } from "./utils";
import OnboardingLocationForm from "./onboarding-location";
import OnboardingPricingForm from "./onboarding-pricing";

export function getStep(
  currentUser: GetDefaultOnboardingDetailsQuery["getCurrentUser"],
) {
  if (!currentUser) return 0;
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
  data: { getCurrentUser: currentUser },
}: {
  data: GetDefaultOnboardingDetailsQuery;
}) {
  const router = useRouter();
  const [step, setStep] = useState(getStep(currentUser));
  const [maxTouchedStep, setMaxTouchedStep] = useState(getStep(currentUser));
  if (!currentUser) {
    router.push(Route.Home);
    return null;
  }
  const steps = [
    <div className="flex h-full flex-col justify-center pb-14" key={0}>
      <Image
        alt="Start for sales"
        className="mx-auto"
        height={400}
        src="/onboarding-start.svg"
        width={200}
      />
      <h2 className="mt-5 text-center font-poppins text-3xl font-bold text-gray-800">
        Let's get you onboarded
      </h2>
      <small className="mx-auto mt-2 max-w-96 text-center text-gray-500">
        With some simple steps you can onboard to become a seller at Freeluence!
      </small>
      <Button
        className="mx-auto mt-5 flex items-center gap-2 !font-medium"
        onClick={nextStep}
        variant={Variants.ACCENT}
      >
        Start now <ArrowRight weight="bold" />
      </Button>
    </div>,
    <SocialsStatus key={1} nextStep={nextStep} scopes={currentUser.scopes} />,
    <OnboardingBasicDetailsForm
      defaultValues={{
        name: currentUser.onboardingData?.name || currentUser.name || "",
        photo: currentUser.onboardingData?.photo || currentUser.photo || "",
        bio: currentUser.onboardingData?.bio || currentUser.bio || "",
        category: currentUser.onboardingData?.category || "",
        dob: currentUser.onboardingData?.dob || "",
        gender: currentUser.onboardingData?.gender || "",
      }}
      key={2}
      nextStep={nextStep}
      photoUpload={currentUser.pictureUploadURL}
    />,
    <OnboardingLocationForm
      defaultValues={{
        city: currentUser.onboardingData?.city,
        country: currentUser.onboardingData?.country,
        state: currentUser.onboardingData?.state,
      }}
      key={3}
      nextStep={nextStep}
    />,
    <OnboardingPricingForm
      defaultValues={currentUser.onboardingData?.pricing || {}}
      key={4}
      nextStep={nextStep}
    />,
  ];
  const MAX_STEPS = steps.length;

  function nextStep() {
    setStep((o) => Math.min(o + 1, MAX_STEPS));
    setMaxTouchedStep(step + 1);
  }

  function prevStep() {
    setStep((o) => Math.max(o - 1, 0));
  }

  const allowForward = step < maxTouchedStep;
  return (
    <div className="h-full">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          {step > 0 ? (
            <button onClick={prevStep}>
              <CaretLeft />
            </button>
          ) : null}
        </div>
        {allowForward ? (
          <button onClick={nextStep}>
            <CaretRight />
          </button>
        ) : null}
      </div>
      {steps[step]}
    </div>
  );
}

export default OnboardingWizard;
