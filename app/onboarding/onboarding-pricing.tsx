"use client";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { GraphQLError } from "graphql/error";
import { useRouter } from "next/navigation";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Form from "@/components/form";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import type { Currency, Pricing } from "@/__generated__/graphql";
import { UPDATE_USER } from "@/lib/mutations";

export default function OnboardingPricingForm({
  fallbackToStep,
  nextStep,
  currency,
  defaultValues,
}: {
  fallbackToStep: () => void;
  nextStep: () => void;
  currency?: Currency | null;
  defaultValues: Pricing | undefined;
}) {
  const router = useRouter();
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
      })
        .catch((e) => {
          fallbackToStep();
          handleGQLErrors(e as GraphQLError);
        })
        .finally(() => {
          router.refresh();
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
