"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { useRouter } from "next/navigation";
import { Spinner } from "@phosphor-icons/react/dist/ssr";
import type {
  Currency,
  GetDefaultOnboardingDetailsQuery,
  UpdateInstagramUsernameMutation,
} from "@/__generated__/graphql";
import { Roles } from "@/__generated__/graphql";
import { getRoute } from "@/constants/routes";
import OnboardingBasicDetailsForm from "./onboarding-basic-details-form";
import SocialsStatus from "./socials-status";
import OnboardingLocationForm from "./onboarding-location";
import OnboardingPricingForm from "./onboarding-pricing";
import OnboardingStepper from "./stepper";
import OnboardingDOB from "./onboarding-dob";
import OnboardingUsername from "./onboarding-username";
import OnboardingRole from "./onboarding-role";

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
  return 0;
}

function OnboardingWizard({
  data,
  loading: dataLoading,
  redirectURL,
}: {
  data?: GetDefaultOnboardingDetailsQuery;
  loading?: boolean;
  redirectURL: string | null;
}) {
  const currentUser = data?.getCurrentUser;
  const showCreatorSteps = !currentUser || currentUser.role === Roles.Creator;
  const router = useRouter();
  const [step, setStep] = useState(getStep(currentUser));
  const [maxTouchedStep, setMaxTouchedStep] = useState(getStep(currentUser));
  const [basicDetails, setBasicDetails] =
    useState<UpdateInstagramUsernameMutation["updateInstagramUsername"]>();
  const [currency, setCurrency] = useState<Currency | undefined | null>(
    currentUser?.location?.currency,
  );
  const nextStep = useCallback(() => {
    setStep((o) => Math.min(o + 1, MAX_STEPS - 1));
    setMaxTouchedStep((o) => Math.max(o, step + 1));
  }, [router, step]);

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
            connections={{ instagram: Boolean(currentUser?.instagramStats) }}
            key={1}
            nextStep={nextStep}
            redirectURL={redirectURL}
            setBasicDetails={setBasicDetails}
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
              name: currentUser.name || "",
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
            photoUpload={currentUser.pictureUploadURL}
            showCreatorSteps={showCreatorSteps}
          />
        ) : null,
      },

      ...(showCreatorSteps
        ? [
            {
              title: "Date of birth",
              heading: "(Highly Recommended)",
              description: "Add details about your age.",
              longDescription:
                "We don't display your age anywhere in the platform. Your date of birth is used by brands to find influencers of a particular age range. Not providing this would leave you out of age based discoveries.",
              icon: Calendar,
              component: (
                <OnboardingDOB
                  defaultValues={{ dob: currentUser?.dob || undefined }}
                  fallbackToStep={() => {
                    fallbackToStep(3);
                  }}
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
              state: currentUser?.locationID?.state,
            }}
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
              component: (
                <OnboardingPricingForm
                  currency={currency}
                  defaultValues={currentUser?.pricing || undefined}
                  fallbackToStep={() => {
                    fallbackToStep(3);
                  }}
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
        component: (
          <OnboardingUsername
            defaultValues={{
              username:
                currentUser?.username || currentUser?.instagramStats?.username,
            }}
            key={4}
          />
        ),
      },
    ],
    [currentUser, currentUser?.instagramStats?.username, nextStep, redirectURL],
  );

  useEffect(() => {
    if (!currentUser && !dataLoading) {
      router.push(redirectURL || getRoute("SignUp"));
    }
    if (currentUser?.isOnboarded) {
      if (currentUser.username)
        router.push(
          `${getRoute("Profile")}/${currentUser.username}?noCache=true`,
        );
      else router.push(redirectURL || getRoute("Home"));
    }
  }, [currentUser, dataLoading, redirectURL, router]);

  const routeLoading =
    (!currentUser && !dataLoading) || currentUser?.isOnboarded;
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
            <div className="h-full sm:px-6">
              {currentStep?.heading ? (
                <h2 className="mb-1 mt-6 text-center font-poppins text-3xl font-semibold sm:mt-14">
                  {currentStep.heading}
                </h2>
              ) : null}
              {currentStep?.longDescription ? (
                <p className="mb-5 text-center text-gray-600 sm:mb-10">
                  {currentStep.longDescription}
                </p>
              ) : null}
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
