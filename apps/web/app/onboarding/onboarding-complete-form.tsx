"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "ui/button";
import { Route } from "../../constants/routes";
import { useAuthMutation } from "../../lib/apollo-client";
import { COMPLETE_ONBOARDING } from "../../lib/mutations";

export default function OnboardingCompleteForm() {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const [completeOnboarding, { loading }] =
    useAuthMutation(COMPLETE_ONBOARDING);
  const [success, setSuccess] = useState(false);

  const onSubmit = async () => {
    const res = await completeOnboarding();
    if (res.data?.completeOnboarding) {
      setSuccess(true);
      router.push(Route.Account);
      router.refresh();
    }
  };
  return (
    <>
      <h2 className=" my-10 text-center text-4xl font-bold">
        All done? Let's finish it off!
      </h2>
      <form
        className="flex flex-col items-center gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Button disabled={success} loading={loading} type="submit">
          {success ? "Success!" : "Complete Onboarding"}
        </Button>
      </form>
    </>
  );
}
