"use client";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Input } from "ui/input";
import { Button } from "ui/button";
import Form from "ui/form";
import { getAgeRange } from "commons/age";
import { handleGQLErrors, useAuthMutation } from "../../lib/apollo-client";
import { ageValidation } from "../../constants/validations";
import { UPDATE_USER } from "../../lib/mutations";

export default function OnboardingDOB({ nextStep }: { nextStep: () => void }) {
  const form = useForm<{ dob?: string }>();
  const [updateDOB, { loading }] = useAuthMutation(UPDATE_USER);

  const dob = form.watch("dob");
  const ageRange = dob && getAgeRange(new Date(dob));
  const onSubmit: SubmitHandler<{ dob?: string }> = async (data) => {
    if (data.dob) {
      const res = await updateDOB({
        updatedUser: {
          dob: data.dob,
        },
      }).catch(handleGQLErrors);
      if (res?.data?.updateUser) nextStep();
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
        <Button invert onClick={nextStep} type="submit">
          Skip it
        </Button>

        <Button loading={loading} type="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}
