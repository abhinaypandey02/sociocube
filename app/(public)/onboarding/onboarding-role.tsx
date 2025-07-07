import { ArrowRight } from "@phosphor-icons/react";
import { GraphQLError } from "graphql/error";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { Roles } from "@/__generated__/graphql";
import { Button } from "@/components/button";
import { Variants } from "@/components/constants";
import { getRoute } from "@/constants/routes";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { UPDATE_USER } from "@/lib/mutations";
import { useUser } from "@/state/hooks";

export default function OnboardingRole({
  nextStep,
  fallbackToStep,
  setShowCreatorSteps,
  role,
}: {
  nextStep: () => void;
  fallbackToStep: () => void;
  setShowCreatorSteps: (show: boolean) => void;
  role?: Roles;
}) {
  const [update] = useAuthMutation(UPDATE_USER);
  const [selectedRole, setSelectedRole] = useState<Roles | undefined>(role);
  const [, setUser] = useUser();
  const handleSubmit = (newRole?: Roles) => {
    nextStep();
    const newRoleSelected = newRole || selectedRole;
    if (newRole) {
      setSelectedRole(newRole);
    }
    setShowCreatorSteps(newRoleSelected === Roles.Creator);
    if (newRoleSelected) setUser({ role: newRoleSelected });
    if (newRoleSelected !== role)
      update({
        updatedUser: {
          role: newRoleSelected,
        },
      }).catch((e) => {
        handleGQLErrors(e as GraphQLError);
        fallbackToStep();
      });
  };

  const roleOptions = [
    {
      role: Roles.Creator,
      title: "Creator",
      description: "Create and share content with your audience",
    },
    {
      role: Roles.Brand,
      title: "Brand",
      description: "Connect with creators to promote your brand",
    },
    {
      role: Roles.Agency,
      title: "Agency",
      description: "Manage creators with professional tools",
    },
  ];
  return (
    <div className="h-full pb-14 pt-8" key={0}>
      <Image
        alt="Start for sales"
        className="mx-auto"
        height={100}
        loading="eager"
        src="/onboarding-start.svg"
        width={100}
      />
      <h2 className="mt-5 text-center font-poppins text-3xl font-semibold text-gray-800">
        Let's get you onboarded
      </h2>
      <small className="mx-auto block mt-2 max-w-96 text-center text-gray-500">
        With some simple steps you can onboard to become a creator on Sociocube!
      </small>
      <div className="mx-auto mt-8 grid w-full max-w-md grid-cols-2 gap-4">
        {roleOptions.map((option, i) => (
          <button
            className={`flex flex-col rounded-lg border-2 p-4 text-left transition-all ${
              selectedRole === option.role
                ? "border-accent"
                : "border-gray-200 hover:border-accent/50"
            } ${!i ? "col-span-2" : ""}`}
            key={option.role}
            onClick={() => {
              handleSubmit(option.role);
            }}
          >
            <span className="font-medium text-gray-900">{option.title}</span>
            <span className="text-sm text-gray-500">{option.description}</span>
          </button>
        ))}
      </div>
      <Button
        autoFocus
        className="mx-auto mt-6 flex items-center gap-2 font-medium!"
        onClick={() => {
          handleSubmit();
        }}
        variant={Variants.ACCENT}
      >
        Start now <ArrowRight weight="bold" />
      </Button>
      <Link
        className="mt-5 block text-center w-full text-sm underline underline-offset-2"
        href={getRoute("Home")}
      >
        No thanks, not right now
      </Link>
    </div>
  );
}
