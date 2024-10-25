"use client";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Input } from "ui/input";
import { Button } from "ui/button";
import Form from "ui/form";
import { useAuthMutation } from "../../lib/apollo-client";
import { UPDATE_ONBOARDING_PRICING } from "../../lib/mutations";
import type { Pricing } from "../../__generated__/graphql";

export default function OnboardingPricingForm({
  defaultValues,
  nextStep,
}: {
  defaultValues: Pricing;
  nextStep: () => void;
}) {
  const form = useForm({ defaultValues });
  const [updatePricing, { loading }] = useAuthMutation(
    UPDATE_ONBOARDING_PRICING,
  );

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    if (data.general) {
      const res = await updatePricing({
        data: {
          general: data.general,
        },
      });
      if (res.data?.updateOnboardingPricing) nextStep();
    }
  };
  return (
    <>
      <h2 className=" my-10 text-center text-4xl font-bold">
        What would you like to charge on an average?
      </h2>
      <Form
        className="flex flex-col items-center gap-3"
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Input
          className="block"
          name="general"
          placeholder="General price"
          rules={{ required: true, valueAsNumber: true }}
        />
        <Button loading={loading} type="submit">
          Next
        </Button>
      </Form>

      <Button loading={loading} onClick={nextStep} type="submit">
        Skip
      </Button>
    </>
  );
}
