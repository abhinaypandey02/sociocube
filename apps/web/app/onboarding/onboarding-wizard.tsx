"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Button, Variants } from "ui/button";
import {
  ArrowRight,
  Calendar,
  CaretLeft,
  CaretRight,
  FlagCheckered,
  MapPin,
  MoneyWavy,
  PencilSimple,
  SealCheck,
  ShareNetwork,
  Link as LinkIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Spinner } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type {
  Currency,
  GetDefaultOnboardingDetailsQuery,
} from "../../__generated__/graphql";
import { getMeURL, getRoute } from "../../constants/routes";
import OnboardingBasicDetailsForm from "./onboarding-basic-details-form";
import SocialsStatus from "./socials-status";
import { ONBOARDING_SCOPES } from "./constants";
import { completedOnboardingScopes } from "./utils";
import OnboardingLocationForm from "./onboarding-location";
import OnboardingPricingForm from "./onboarding-pricing";
import OnboardingStepper from "./stepper";
import OnboardingCompleteForm from "./onboarding-complete-form";
import OnboardingDOB from "./onboarding-dob";
import OnboardingUsername from "./onboarding-username";

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
    !currentUser.onboardingData.category
  )
    return 2;
  if (!currentUser.onboardingData.dob && !currentUser.onboardingData.username)
    return 3;
  if (!currentUser.onboardingData.username) return 4;
  if (!currentUser.onboardingData.city) return 5;
  if (!currentUser.onboardingData.pricing) return 6;
  if (!currentUser.isOnboarded) return 7;
  return 0;
}

function OnboardingWizard({
  data,
  loading,
}: {
  data?: GetDefaultOnboardingDetailsQuery;
  loading?: boolean;
}) {
  const currentUser = data?.getCurrentUser;
  const router = useRouter();
  const [step, setStep] = useState(getStep(currentUser));
  const [maxTouchedStep, setMaxTouchedStep] = useState(getStep(currentUser));
  const [currency, setCurrency] = useState<Currency | undefined | null>(
    data?.getCurrentUser?.onboardingData?.currency,
  );
  const nextStep = useCallback(() => {
    setStep((o) => Math.min(o + 1, MAX_STEPS - 1));
    setMaxTouchedStep((o) => Math.max(o, step + 1));
    if (step !== 0) router.refresh();
  }, [step]);
  const steps = useMemo(
    () => [
      {
        title: "",
        heading: "",
        description: "",
        icon: FlagCheckered,
        component: (
          <div className="flex h-full flex-col justify-center pb-14" key={0}>
            <Image
              alt="Start for sales"
              className="mx-auto"
              height={400}
              loading="eager"
              src="/onboarding-start.svg"
              width={200}
            />
            <h2 className="mt-5 text-center font-poppins text-3xl font-bold text-gray-800">
              Let's get you onboarded
            </h2>
            <small className="mx-auto mt-2 max-w-96 text-center text-gray-500">
              With some simple steps you can onboard to become a seller at
              Freeluencers!
            </small>
            <Button
              className="mx-auto mt-3 flex items-center gap-2 !font-medium"
              onClick={nextStep}
              variant={Variants.ACCENT}
            >
              Start now <ArrowRight weight="bold" />
            </Button>
            <Link
              className="mt-5 text-center text-sm underline underline-offset-2"
              href={getRoute("Home")}
            >
              No thanks!, I am not an influencer.
            </Link>
          </div>
        ),
      },
      {
        title: "Socials",
        heading: "Let's connect your socials",
        description: "Connect your socials.",
        longDescription:
          "Connect your instagram account to verify your identity.",
        icon: ShareNetwork,
        component: (
          <SocialsStatus
            key={1}
            nextStep={nextStep}
            scopes={currentUser?.scopes || []}
          />
        ),
      },
      {
        title: "Basic details",
        heading: "Let's know you better",
        description: "Information about you",
        longDescription:
          "Provide information about you so we can help you be found!",
        icon: PencilSimple,
        component: currentUser ? (
          <OnboardingBasicDetailsForm
            defaultValues={{
              name: currentUser.onboardingData?.name || currentUser.name || "",
              photo:
                currentUser.onboardingData?.photo || currentUser.photo || "",
              bio: currentUser.onboardingData?.bio || currentUser.bio || "",
              category: currentUser.onboardingData?.category || "",
              gender: currentUser.onboardingData?.gender || "",
            }}
            key={2}
            nextStep={nextStep}
            photoUpload={currentUser.pictureUploadURL}
          />
        ) : null,
      },

      {
        title: "Date of birth",
        heading: "(Highly Recommended)",
        description: "Add details about your age.",
        longDescription:
          "We don't display your age anywhere in the platform. Your date of birth is used by brands to find influencers of a particular age range. Not providing this would leave you out of age based discoveries.",
        icon: Calendar,
        component: (
          <OnboardingDOB
            defaultValues={{
              dob: currentUser?.onboardingData?.dob || undefined,
            }}
            key={3}
            nextStep={nextStep}
          />
        ),
      },
      {
        title: "Username",
        heading: "Personalised link",
        description: "Get a personalized link",
        longDescription:
          "Get a personalised sharing link. Select a unique username and get your own custom link that you can share easily!",
        icon: LinkIcon,
        component: (
          <OnboardingUsername
            defaultValues={{
              username: currentUser?.onboardingData?.username || undefined,
            }}
            key={4}
            nextStep={nextStep}
          />
        ),
      },
      {
        title: "Location",
        heading: "Where are you based?",
        description: "Your current city",
        longDescription:
          "Enter the details about your current location to help people find you better",
        icon: MapPin,
        component: (
          <OnboardingLocationForm
            defaultValues={{
              city: currentUser?.onboardingData?.city,
              country: currentUser?.onboardingData?.country,
              state: currentUser?.onboardingData?.state,
            }}
            key={5}
            nextStep={nextStep}
            setCurrency={setCurrency}
          />
        ),
      },
      {
        title: "Pricing",
        heading: "Your base price",
        description: "Your starting price",
        longDescription:
          "Add a starting price you would like to charge for collaborations. This would be an approximation for potential brands",
        icon: MoneyWavy,
        component: (
          <OnboardingPricingForm
            currency={currency}
            defaultValues={currentUser?.onboardingData?.pricing || {}}
            key={6}
            nextStep={nextStep}
          />
        ),
      },
      {
        title: "Finish",
        heading: "Complete onboarding",
        description: "Complete onboarding",
        longDescription:
          "You have completed all the steps and are ready to go!",
        icon: SealCheck,
        component: (
          <OnboardingCompleteForm
            key={7}
            username={currentUser?.onboardingData?.username}
          />
        ),
      },
    ],
    [currentUser, nextStep],
  );
  if (!currentUser && !loading) {
    router.push(getRoute("SignUp"));
    return null;
  }
  if (currentUser?.isOnboarded) {
    if (currentUser.username) router.push(getMeURL(currentUser.username));
    else router.push(getRoute("Home"));
    return null;
  }
  const MAX_STEPS = steps.length;

  function prevStep() {
    setStep((o) => Math.max(o - 1, 0));
  }

  const allowForward = step < maxTouchedStep;
  const currentStep = steps[step];
  return (
    <>
      <div className="w-full max-w-lg rounded-xl sm:p-5 sm:shadow-elevation-1">
        {!loading && (
          <div className="h-full">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 font-poppins">
                {step > 0 ? (
                  <>
                    <button onClick={prevStep}>
                      <CaretLeft />
                    </button>
                    ({step}/{MAX_STEPS - 1}) {currentStep?.title}
                  </>
                ) : null}
              </div>
              {allowForward ? (
                <button onClick={nextStep}>
                  <CaretRight />
                </button>
              ) : null}
            </div>
            <div className="h-full sm:px-6">
              <h2 className="mb-1 mt-14 text-center font-poppins text-3xl font-semibold">
                {currentStep?.heading}
              </h2>
              <p className="mb-14 text-center text-gray-600">
                {currentStep?.longDescription}
              </p>
              {steps[step]?.component}
            </div>
          </div>
        )}
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <Spinner className="animate-spin fill-primary " size={60} />
          </div>
        ) : null}
      </div>
      <div className="flex grow items-center justify-center px-4 max-sm:hidden">
        <OnboardingStepper currentStep={step - 1} steps={steps.slice(1)} />
      </div>
    </>
  );
}

export default OnboardingWizard;
