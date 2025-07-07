import { GraphQLError } from "graphql/error";
import React, { useEffect } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import type { Pricing } from "@/__generated__/graphql";
import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { UPDATE_USER } from "@/lib/mutations";

export default function OnboardingPricingForm({
  fallbackToStep,
  nextStep,
  currency,
  defaultValues,
  isActive,
}: {
  fallbackToStep: () => void;
  nextStep: () => void;
  currency?: string | null;
  defaultValues: Pricing | undefined;
  isActive: boolean;
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
  useEffect(() => {
    form.setFocus("starting");
  }, [isActive]);
  return (
    <Form className="space-y-3" form={form} onSubmit={onSubmit}>
      <Input
        className="block"
        label="Starting price"
        name="starting"
        placeholder="Enter your starting price"
        prefix={currency || undefined}
        rules={{ required: true, valueAsNumber: true }}
        type="number"
      />
      <div className="mt-6! flex justify-between">
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
