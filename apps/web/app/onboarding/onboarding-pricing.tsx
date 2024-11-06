"use client";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Input } from "ui/input";
import { Button } from "ui/button";
import Form from "ui/form";
import { handleGQLErrors, useAuthMutation } from "../../lib/apollo-client";
import { UPDATE_ONBOARDING_PRICING } from "../../lib/mutations";
import type { Currency, Pricing } from "../../__generated__/graphql";

export default function OnboardingPricingForm({
  defaultValues,
  nextStep,
  currency,
}: {
  defaultValues: Pricing;
  nextStep: () => void;
  currency?: Currency | null;
}) {
  const form = useForm({ defaultValues });
  const [updatePricing, { loading }] = useAuthMutation(
    UPDATE_ONBOARDING_PRICING,
  );

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    if (data.starting) {
      const res = await updatePricing({
        data: {
          starting: data.starting,
        },
      }).catch(handleGQLErrors);
      if (res?.data?.updateOnboardingPricing) nextStep();
    }
  };
  return (
    <Form
      className="space-y-3"
      form={form}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Input
        className="block"
        disabled
        label="Currency"
        name="currency"
        placeholder="Currency"
        value={`${currency?.name} (${currency?.symbol})`}
      />
      <Input
        className="block"
        label="Starting price"
        name="starting"
        placeholder={`Enter your starting price in ${currency?.name}`}
        rules={{ required: true, valueAsNumber: true }}
      />
      <div className="!mt-6 flex justify-between">
        <Button onClick={nextStep} outline type="submit">
          Skip
        </Button>

        <Button loading={loading} type="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}
