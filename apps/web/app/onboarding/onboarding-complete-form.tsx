"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button, Variants } from "ui/button";
import Image from "next/image";
import { getRoute } from "../../constants/routes";
import { handleGQLErrors, useAuthMutation } from "../../lib/apollo-client";
import { COMPLETE_ONBOARDING } from "../../lib/mutations";

export default function OnboardingCompleteForm({
  userID,
}: {
  userID?: number;
}) {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const [completeOnboarding, { loading }] =
    useAuthMutation(COMPLETE_ONBOARDING);
  const [success, setSuccess] = useState(false);

  const onSubmit = async () => {
    const res = await completeOnboarding().catch(handleGQLErrors);
    if (res?.data?.completeOnboarding) {
      setSuccess(true);
      router.push(`${getRoute("Profile")}/${userID}`);
      router.refresh();
    }
  };
  return (
    <form
      className="flex flex-col items-center gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Image
        alt="complete onboarding"
        className="mx-auto"
        height={400}
        src="/onboarding-end.svg"
        width={200}
      />
      <Button
        className="mt-16"
        loading={loading}
        success={success}
        type="submit"
        variant={Variants.ACCENT}
      >
        Submit details
      </Button>
    </form>
  );
}
