"use client";
import React from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Button } from "ui/button";
import Link from "next/link";
import type { AuthScopes } from "../../__generated__/graphql";
import { Route } from "../../constants/routes";
import { ONBOARDING_SCOPES } from "./constants";
import { hasOnboardingScopes } from "./utils";

export default function SocialsStatus({
  scopes,
  nextStep,
}: {
  scopes: AuthScopes[];
  nextStep: () => void;
}) {
  return (
    <>
      <h2 className=" my-10 text-center text-4xl font-bold">
        Let's connect your socials
      </h2>
      {ONBOARDING_SCOPES.map((scope) => (
        <div className="flex justify-between" key={scope.id}>
          <div className="flex items-center gap-3">
            <scope.icon />
            <h4>{scope.title}</h4>
          </div>
          {scopes.includes(scope.id) ? (
            <div className="flex items-center gap-3">
              <h4>Connected</h4>
              <CheckCircle />
            </div>
          ) : (
            <Link href={`${scope.url}?redirectURL=${Route.Onboarding}`}>
              <Button>Connect</Button>
            </Link>
          )}
        </div>
      ))}

      {hasOnboardingScopes(scopes) && <Button onClick={nextStep}>Next</Button>}
    </>
  );
}
