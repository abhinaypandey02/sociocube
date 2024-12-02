"use client";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Input } from "ui/input";
import { Button } from "ui/button";
import Form from "ui/form";
import { USERNAME_REGEX } from "commons/regex";
import {
  handleGQLErrors,
  useAuthMutation,
  useAuthQuery,
} from "../../lib/apollo-client";
import { UPDATE_ONBOARDING_USERNAME } from "../../lib/mutations";
import { IS_USERNAME_AVAILABLE } from "../../lib/queries";

export default function OnboardingUsername({
  defaultValues,
  nextStep,
}: {
  defaultValues: { username?: string };
  nextStep: () => void;
}) {
  const form = useForm({ defaultValues, reValidateMode: "onSubmit" });
  const [updateUsername, { loading }] = useAuthMutation(
    UPDATE_ONBOARDING_USERNAME,
  );
  const [isUsernameAvailable, { loading: loadingAvailability }] = useAuthQuery(
    IS_USERNAME_AVAILABLE,
  );

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    if (data.username) {
      const res = await updateUsername({
        data: {
          username: data.username,
        },
      }).catch(handleGQLErrors);
      if (res?.data?.updateOnboardingUsername) nextStep();
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
        label="Username"
        name="username"
        onChange={() => {
          form.clearErrors();
        }}
        placeholder="Enter your desired username"
        rules={{
          required: true,
          pattern: {
            value: USERNAME_REGEX,
            message: "Username can only contain alphabets, numbers and '-'",
          },
          maxLength: {
            value: 16,
            message: "Username can only contain maximum 16 characters",
          },
          validate: {
            availability: async (username: string) => {
              const result = await isUsernameAvailable({ username });
              return (
                result.data?.isUsernameAvailable || "Username already taken!"
              );
            },
          },
        }}
        suffix=".freeluencers.me"
      />

      <div className="!mt-6 flex justify-end">
        <Button loading={loading || loadingAvailability} type="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}
