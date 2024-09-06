"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "ui/button";
import { Route } from "../../../constants/routes";
import { useAuthMutation } from "../../../lib/apollo-client";
import { COMPLETE_ONBOARDING } from "../../../lib/mutations";

export default function OnboardingCompleteForm() {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const [completeOnboarding, { loading }] =
    useAuthMutation(COMPLETE_ONBOARDING);

  const onSubmit = async () => {
    const res = await completeOnboarding();
    if (res.data?.completeOnboarding) {
      router.push(Route.Account);
      router.refresh();
    }
  };
  return (
    <form
      className="flex flex-col items-center gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Button disabled={loading} type="submit">
        Complete Onboarding
      </Button>
    </form>
  );
}
