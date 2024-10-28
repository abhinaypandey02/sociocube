import React, { Suspense } from "react";
import { Spinner } from "@phosphor-icons/react/dist/ssr";
import { cookies } from "next/headers";
import { Injector, queryGQL } from "../../lib/apollo-server";
import { GET_DEFAULT_ONBOARDING_DETAILS } from "../../lib/queries";
import OnboardingWizard from "./onboarding-wizard";
import OnboardingStepper from "./stepper";

export default function AuthLayout() {
  return (
    <div className="mx-auto flex min-h-[85vh] w-full max-w-7xl  px-8 pt-10">
      <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-elevation-1">
        <Suspense
          fallback={<Spinner className="animate-spin fill-primary" size={40} />}
        >
          <Injector
            Component={OnboardingWizard}
            fetch={async () =>
              queryGQL(GET_DEFAULT_ONBOARDING_DETAILS, {}, await cookies(), 0)
            }
          />
        </Suspense>
      </div>
      <div className="flex grow justify-center px-4">
        <OnboardingStepper
          steps={[
            {
              title: "Socials",
              description: "Get your socials connected",
            },
            {
              title: "Socials",
              description: "Get your socials connected",
            },
            {
              title: "Socials",
              description: "Get your socials connected",
            },
            {
              title: "Socials",
              description: "Get your socials connected",
            },
            {
              title: "Socials",
              description: "Get your socials connected",
            },
          ]}
        />
      </div>
    </div>
  );
}
