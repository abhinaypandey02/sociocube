"use client";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "ui/input";
import { Button } from "ui/button";
import { Route } from "../../../constants/routes";
import { useAuthMutation } from "../../../lib/apollo-client";
import { UPDATE_ONBOARDING_BASIC_DETAILS } from "../../../lib/mutations";

export default function OnboardingBasicDetailsForm({
  defaultValues,
}: {
  defaultValues: {
    name: string;
  };
}) {
  const { register, handleSubmit } = useForm({ defaultValues });
  const router = useRouter();
  const [updateBasicDetails, { loading }] = useAuthMutation(
    UPDATE_ONBOARDING_BASIC_DETAILS,
  );

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    const res = await updateBasicDetails({
      data: {
        name: data.name,
        imageURL: "",
      },
    });
    if (res.data?.updateOnboardingBasicDetails) {
      router.push(Route.OnboardingSocials);
      router.refresh();
    }
  };
  return (
    <form
      className="flex flex-col items-center gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input className="block" placeholder="Name" {...register("name")} />
      <Button disabled={loading} type="submit">
        Next
      </Button>
    </form>
  );
}
