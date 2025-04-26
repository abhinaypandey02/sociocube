"use client";
import {
  Calendar,
  CaretLeft,
  CaretRight,
  FlagCheckered,
  Link as LinkIcon,
  MapPin,
  MoneyWavy,
  PencilSimple,
  ShareNetwork,
} from "@phosphor-icons/react";
import { Spinner } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import type {
  GetDefaultOnboardingDetailsQuery,
  UpdateInstagramUsernameMutation,
} from "@/__generated__/graphql";
import { Roles } from "@/__generated__/graphql";
import { getRoute } from "@/constants/routes";
import { useUser } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import OnboardingBasicDetailsForm from "./onboarding-basic-details-form";
import OnboardingDOB from "./onboarding-dob";
import OnboardingLocationForm from "./onboarding-location";
import OnboardingPricingForm from "./onboarding-pricing";
import OnboardingRole from "./onboarding-role";
import OnboardingUsername from "./onboarding-username";
import SocialsStatus from "./socials-status";
import OnboardingStepper from "./stepper";

export function getStep(
  currentUser: GetDefaultOnboardingDetailsQuery["getCurrentUser"],
) {
  if (!currentUser) return 0;
  if (!currentUser.instagramStats?.username) {
    if (currentUser.role === Roles.Creator) return 0;
    return 1;
  }
  if (
    !currentUser.name ||
    !currentUser.bio ||
    !currentUser.gender ||
    !currentUser.category
  )
    return 2;
  if (currentUser.role === Roles.Creator && !currentUser.dob) return 3;
  if (!currentUser.location?.city)
    return 4 - (currentUser.role === Roles.Creator ? 0 : 1);
  if (currentUser.role === Roles.Creator && !currentUser.pricing) return 5;
  if (!currentUser.username)
    return 6 - (currentUser.role === Roles.Creator ? 0 : 2);
  return -1;
}

function OnboardingWizard({
  data,
  loading: dataLoading,
}: {
  data?: {
    user: GetDefaultOnboardingDetailsQuery["getCurrentUser"];
    redirectURL: string | null;
  };
  loading?: boolean;
}) {
  const currentUser = data?.user;
  const redirectURL = data?.redirectURL;
  const [showCreatorSteps, setShowCreatorSteps] = useState(
    !currentUser || currentUser.role === Roles.Creator,
  );
  const [, setUser] = useUser();
  const router = useRouter();
  const [step, setStep] = useState(getStep(currentUser));
  const [maxTouchedStep, setMaxTouchedStep] = useState(getStep(currentUser));
  const [basicDetails, setBasicDetails] =
    useState<UpdateInstagramUsernameMutation["updateInstagramUsername"]>();
  const [currency, setCurrency] = useState<string | undefined | null>(
    currentUser?.location?.currency,
  );
  const nextStep = useCallback(() => {
    setStep((o) => Math.min(o + 1, MAX_STEPS - 1));
    setMaxTouchedStep((o) => Math.max(o, step + 1));
  }, [step]);

  const fallbackToStep = useCallback(
    (fallbackStep: number) => {
      setStep(fallbackStep);
      setMaxTouchedStep(fallbackStep);
      router.refresh();
    },
    [router],
  );

  const steps = useMemo(
    () => [
      {
        title: "",
        heading: "",
        description: "",
        icon: FlagCheckered,
        component: (
          <OnboardingRole
            fallbackToStep={() => {
              fallbackToStep(0);
            }}
            nextStep={nextStep}
            role={currentUser?.role}
            setShowCreatorSteps={setShowCreatorSteps}
          />
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
            defaultValues={{
              instagram:
                basicDetails?.username || currentUser?.instagramStats?.username,
            }}
            isActive={step === 1}
            key={1}
            nextStep={nextStep}
            isCreator={currentUser?.role === Roles.Creator}
            setBasicDetails={(val) => {
              setUser((prev) =>
                prev
                  ? {
                      ...prev,
                      name: val.name,
                      photo: val.photo,
                      username: val.username,
                    }
                  : prev,
              );
              setBasicDetails(val);
            }}
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
        key: String(basicDetails?.photo) + basicDetails?.bio,
        component: currentUser ? (
          <OnboardingBasicDetailsForm
            defaultValues={{
              name: basicDetails?.name || currentUser.name || "",
              photo: basicDetails?.photo || currentUser.photo || "",
              bio: basicDetails?.bio || currentUser.bio || "",
              category: currentUser.category || undefined,
              gender: currentUser.gender || undefined,
            }}
            fallbackToStep={() => {
              fallbackToStep(2);
            }}
            key={currentUser.instagramStats?.username}
            nextStep={nextStep}
            showCreatorSteps={showCreatorSteps}
          />
        ) : null,
      },

      ...(showCreatorSteps
        ? [
            {
              title: "Date of birth",
              heading: "Age verification",
              description: "Add details about your age.",
              longDescription:
                "We need to ensure you are 13 years or older. We don't display your age anywhere in the platform, only your age group is visible to brands you apply for.",
              icon: Calendar,
              component: (
                <OnboardingDOB
                  defaultValues={{ dob: currentUser?.dob || undefined }}
                  fallbackToStep={() => {
                    fallbackToStep(3);
                  }}
                  isActive={step === 3}
                  key={3}
                  nextStep={nextStep}
                />
              ),
            },
          ]
        : []),
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
              city: currentUser?.locationID?.city,
              country: currentUser?.locationID?.country,
            }}
            fallbackToStep={() => {
              fallbackToStep(showCreatorSteps ? 4 : 3);
            }}
            isActive={step === (showCreatorSteps ? 4 : 3)}
            key={5}
            nextStep={nextStep}
            setCurrency={setCurrency}
          />
        ),
      },

      ...(showCreatorSteps
        ? [
            {
              title: "Pricing",
              heading: "Your base price",
              description: "Your starting price",
              longDescription:
                "Add a starting price you would like to charge for collaborations. This would be an approximation for potential brands",
              icon: MoneyWavy,
              exclusiveRole: Roles.Creator,
              key: currency,
              component: (
                <OnboardingPricingForm
                  currency={currency}
                  defaultValues={currentUser?.pricing || undefined}
                  fallbackToStep={() => {
                    fallbackToStep(5);
                  }}
                  isActive={step === 5}
                  key={6}
                  nextStep={nextStep}
                />
              ),
            },
          ]
        : []),

      {
        title: "Username",
        heading: "Personalised link",
        description: "Get a personalized link",
        longDescription:
          "Get a personalised sharing link. Select a unique username and get your own custom link that you can share easily!",
        icon: LinkIcon,
        key: basicDetails?.username,
        component: (
          <OnboardingUsername
            defaultValues={{
              username: currentUser?.username || basicDetails?.username,
            }}
            redirectURL={redirectURL}
            isActive={step === (showCreatorSteps ? 6 : 4)}
            key={4}
          />
        ),
      },
    ],
    [
      currency,
      currentUser,
      nextStep,
      redirectURL,
      basicDetails,
      showCreatorSteps,
    ],
  );

  useEffect(() => {
    if (!currentUser && !dataLoading) {
      router.replace(redirectURL || getRoute("SignUp"));
    }
  }, [currentUser, dataLoading, redirectURL, router]);

  useEffect(() => {
    if (step === -1) {
      router.push(getRoute("Profile"));
    }
  }, [step, router]);
  const routeLoading = !currentUser && !dataLoading;
  const MAX_STEPS = steps.length;

  function prevStep() {
    setStep((o) => Math.max(o - 1, 0));
  }

  const allowForward = step < maxTouchedStep;
  const currentStep = steps[step];
  const loading = dataLoading || routeLoading;

  return (
    <>
      <div className="w-full max-w-lg rounded-xl sm:p-5 sm:shadow-elevation-1">
        {!loading && (
          <div className="h-full">
            <div className="flex items-center justify-between">
              <div className="flex gap-4 font-poppins">
                {step > 0 ? (
                  <>
                    <button onClick={prevStep} type="button">
                      <CaretLeft />
                    </button>
                    ({step}/{MAX_STEPS - 1}) {currentStep?.title}
                  </>
                ) : null}
              </div>
              {allowForward ? (
                <button onClick={nextStep} type="button">
                  <CaretRight />
                </button>
              ) : null}
            </div>
            {steps.map((stepValue, i) => (
              <div
                className={cn("h-full sm:px-6 ", i !== step && "hidden")}
                key={stepValue.key || stepValue.heading}
              >
                {stepValue.heading && (
                  <h2 className="mb-1 mt-6 text-center font-poppins text-3xl font-semibold sm:mt-14">
                    {stepValue.heading}
                  </h2>
                )}
                {stepValue.longDescription && (
                  <p className="mb-5 text-center text-gray-600 sm:mb-10">
                    {stepValue.longDescription}
                  </p>
                )}
                {stepValue.component}
              </div>
            ))}
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
