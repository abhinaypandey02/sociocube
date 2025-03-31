"use client";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { GraphQLError } from "graphql/error";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Form from "@/components/form";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import type { Pricing } from "@/__generated__/graphql";
import { UPDATE_USER } from "@/lib/mutations";

export default function OnboardingPricingForm({
  fallbackToStep,
  nextStep,
  currency,
  defaultValues,
}: {
  fallbackToStep: () => void;
  nextStep: () => void;
  currency?: string | null;
  defaultValues: Pricing | undefined;
}) {
  const form = useForm({ defaultValues });
  const [updatePricing, { loading }] = useAuthMutation(UPDATE_USER);

  const onSubmit: SubmitHandler<Pricing> = (data) => {
    if (data.starting) {
      nextStep();
      updatePricing({
        updatedUser: {
          pricing: {
            starting: data.starting,
          },
        },
      }).catch((e) => {
        fallbackToStep();
        handleGQLErrors(e as GraphQLError);
      });
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
        label="Starting price"
        name="starting"
        placeholder="Enter your starting price"
        prefix={currency || undefined}
        rules={{ required: true, valueAsNumber: true }}
      />
      <div className="!mt-6 flex justify-between">
        <Button invert onClick={nextStep} type="submit">
          Skip
        </Button>

        <Button loading={loading} type="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}
