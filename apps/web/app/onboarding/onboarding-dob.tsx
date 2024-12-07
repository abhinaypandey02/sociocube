"use client";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Input } from "ui/input";
import { Button } from "ui/button";
import Form from "ui/form";
import { getAgeRange } from "commons/age";
import { handleGQLErrors, useAuthMutation } from "../../lib/apollo-client";
import { UPDATE_ONBOARDING_DOB } from "../../lib/mutations";
import { ageValidation } from "../../constants/validations";

export default function OnboardingDOB({
  defaultValues,
  nextStep,
}: {
  defaultValues: { dob?: string };
  nextStep: () => void;
}) {
  const form = useForm({ defaultValues });
  const [updateDOB, { loading }] = useAuthMutation(UPDATE_ONBOARDING_DOB);

  const dob = form.watch("dob");
  const ageRange = dob && getAgeRange(new Date(dob));
  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    if (data.dob) {
      const res = await updateDOB({
        dobDetails: {
          dob: data.dob,
        },
      }).catch(handleGQLErrors);
      if (res?.data?.updateOnboardingDOB) nextStep();
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
        label="Date of Birth"
        name="dob"
        placeholder="Enter your date of birth"
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
      <div className="!mt-6 flex justify-between">
        <Button onClick={nextStep} outline type="submit">
          Skip it
        </Button>

        <Button loading={loading} type="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}
