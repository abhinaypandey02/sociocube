"use client";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Input } from "ui/input";
import { Button } from "ui/button";
import { useAuthMutation } from "../../lib/apollo-client";
import { UPDATE_ONBOARDING_BASIC_DETAILS } from "../../lib/mutations";

export default function OnboardingBasicDetailsForm({
  defaultValues,
  nextStep,
}: {
  defaultValues: {
    name: string;
  };
  nextStep: () => void;
}) {
  const { register, handleSubmit } = useForm({ defaultValues });
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
      nextStep();
    }
  };
  return (
    <>
      <h2 className=" my-10 text-center text-4xl font-bold">
        Some details about you!
      </h2>
      <form
        className="flex flex-col items-center gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input className="block" placeholder="Name" {...register("name")} />
        <Button loading={loading} type="submit">
          Next
        </Button>
      </form>
    </>
  );
}
