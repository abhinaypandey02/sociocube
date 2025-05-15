"use client";
import { GraphQLError } from "graphql/error";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import { getAgeRange } from "@/constants/age";
import { ageValidation } from "@/constants/validations";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { UPDATE_USER } from "@/lib/mutations";

interface FormFields {
  dob?: string;
}

export default function OnboardingDOB({
  nextStep,
  defaultValues,
  fallbackToStep,
}: {
  nextStep: () => void;
  fallbackToStep: () => void;
  defaultValues: FormFields;
  isActive: boolean;
}) {
  const form = useForm({
    defaultValues: {
      dob: defaultValues.dob || "2000-01-01",
    },
  });
  const [updateDOB, { loading }] = useAuthMutation(UPDATE_USER);
  const dob = form.watch("dob");
  const ageRange = dob && getAgeRange(new Date(dob));
  const onSubmit: SubmitHandler<{ dob?: string }> = (data) => {
    if (data.dob) {
      nextStep();
      updateDOB({
        updatedUser: {
          dob: data.dob,
        },
      }).catch((e) => {
        fallbackToStep();
        handleGQLErrors(e as GraphQLError);
      });
    }
  };
  return (
    <Form className="space-y-3" form={form} onSubmit={onSubmit}>
      <Input
        className="block"
        label="Date of Birth"
        name="dob"
        placeholder="2000-01-01"
        rules={{
          required: true,
          validate: ageValidation,
        }}
        type="date"
      />
      {ageRange ? (
        <p className="text-center text-sm">
          You will come under <b>{ageRange.title}</b> category.
        </p>
      ) : null}
      <div className="mt-6! flex justify-end">
        <Button loading={loading} type="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}
