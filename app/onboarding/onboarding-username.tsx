"use client";
import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import type { GraphQLError } from "graphql/error";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Form from "@/components/form";
import {
  handleGQLErrors,
  useAuthMutation,
  useAuthQuery,
} from "@/lib/apollo-client";
import { IS_USERNAME_AVAILABLE } from "@/lib/queries";
import { getUsernameInputRules } from "@/lib/utils";
import { UPDATE_USER } from "@/lib/mutations";
import { getRoute } from "@/constants/routes";

export default function OnboardingUsername({
  defaultValues,
}: {
  defaultValues: { username?: string };
}) {
  const router = useRouter();
  const form = useForm({ defaultValues, reValidateMode: "onSubmit" });
  const [updateUsername] = useAuthMutation(UPDATE_USER);
  const [loading, setLoading] = useState(false);
  const [isUsernameAvailable, { loading: loadingAvailability }] = useAuthQuery(
    IS_USERNAME_AVAILABLE,
  );

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    if (data.username) {
      setLoading(true);
      const res = await updateUsername({
        updatedUser: {
          username: data.username.toLowerCase(),
        },
      }).catch((e) => {
        handleGQLErrors(e as GraphQLError);
        setLoading(false);
      });
      if (res?.data?.updateUser) {
        router.push(`${getRoute("Profile")}/${data.username.toLowerCase()}`);
      }
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
        rules={getUsernameInputRules(async (username: string) => {
          const result = await isUsernameAvailable({ username });
          return Boolean(result.data?.isUsernameAvailable);
        })}
        suffix=".sociocube.me"
      />

      <div className="!mt-6 flex justify-end">
        <Button loading={loading || loadingAvailability} type="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}
