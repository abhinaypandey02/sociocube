"use client";
import React from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Button } from "ui/button";
import type { AuthScopes } from "../../__generated__/graphql";
import { Route } from "../../constants/routes";
import { ONBOARDING_SCOPES } from "./constants";
import { completedOnboardingScopes } from "./utils";

export default function SocialsStatus({
  scopes,
  nextStep,
}: {
  scopes: AuthScopes[];
  nextStep: () => void;
}) {
  return (
    <>
      {ONBOARDING_SCOPES.map((scope) => (
        <div className="flex justify-between px-6" key={scope.id}>
          <div className="flex items-center gap-3">
            <scope.icon size={30} />
            <h4 className=" text-xl font-medium">{scope.title}</h4>
          </div>
          {scopes.includes(scope.id) ? (
            <div className="flex items-center gap-3">
              <h4>Connected</h4>
              <CheckCircle />
            </div>
          ) : (
            <a href={`${scope.url}?redirectURL=${Route.Onboarding}`}>
              <Button>Connect</Button>
            </a>
          )}
        </div>
      ))}

      {completedOnboardingScopes(scopes).length ? (
        <Button onClick={nextStep}>Next</Button>
      ) : null}
    </>
  );
}
