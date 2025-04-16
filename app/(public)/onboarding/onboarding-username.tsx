"use client";
import type { GraphQLError } from "graphql/error";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import { getRoute } from "@/constants/routes";
import {
  handleGQLErrors,
  useAuthMutation,
  useAuthQuery,
} from "@/lib/apollo-client";
import { UPDATE_USER } from "@/lib/mutations";
import { IS_USERNAME_AVAILABLE } from "@/lib/queries";
import { getUsernameInputRules } from "@/lib/utils";

export default function OnboardingUsername({
  defaultValues,
  isActive,
  redirectURL,
}: {
  defaultValues: { username?: string | null };
  isActive: boolean;
  redirectURL?: string | null;
}) {
  const router = useRouter();
  const form = useForm({ defaultValues, reValidateMode: "onSubmit" });
  const [updateUsername] = useAuthMutation(UPDATE_USER);
  const [loading, setLoading] = useState(false);
  const [isUsernameAvailable, { loading: loadingAvailability }] = useAuthQuery(
    IS_USERNAME_AVAILABLE,
  );
  useEffect(() => {
    if (defaultValues.username && isActive && !redirectURL) {
      router.prefetch(`${getRoute("Profile")}/${defaultValues.username}`);
    }
  }, [defaultValues.username, isActive]);
  const onSubmit: SubmitHandler<typeof defaultValues> = (data) => {
    if (data.username) {
      setLoading(true);
      router.replace(
        redirectURL ?? `${getRoute("Profile")}/${defaultValues.username}`,
      );
      router.refresh();
      updateUsername({
        updatedUser: {
          username: data.username.toLowerCase(),
        },
      }).catch((e) => {
        handleGQLErrors(e as GraphQLError);
        setLoading(false);
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

      <div className="mt-6! flex justify-end">
        <Button loading={loading || loadingAvailability} type="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}
