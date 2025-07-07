"use client";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import { getRoute } from "@/constants/routes";
import { handleGQLErrors } from "@/lib/apollo-client";
import { RESET_PASSWORD } from "@/lib/mutations";

import AuthLayout from "../../components/auth/auth-layout";

const defaultValues = {
  password: "",
  c_password: "",
};

export default function ResetForm({ token }: { token: string }) {
  const form = useForm({ defaultValues });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [resetPassword] = useMutation(RESET_PASSWORD);
  const onSubmit: SubmitHandler<typeof defaultValues> = (data) => {
    setIsLoading(true);
    resetPassword({
      variables: {
        newPassword: data.password,
        token,
      },
    })
      .then((res) => {
        if (res.data?.resetPassword) {
          toast.success("Password updated successfully");
        }
      })
      .catch(handleGQLErrors)
      .finally(() => {
        form.reset();
        router.push(getRoute("Home"));
      });
  };

  return (
    <AuthLayout
      bottomHeading={{
        question: "Create a new account instead?",
        answer: "Get started now!",
        link: getRoute("SignUp"),
      }}
      title="Reset password"
    >
      <Form className="space-y-4" form={form} onSubmit={onSubmit}>
        <Input
          className="block"
          label="New password"
          name="password"
          placeholder="New Password"
          rules={{ required: true }}
          type="password"
        />
        <Input
          className="block"
          label="Confirm password"
          name="c_password"
          placeholder="Confirm Password"
          rules={{
            required: true,
            validate: {
              passwordMatch: (value, formValues) =>
                value === formValues.password,
            },
          }}
          type="password"
        />
        <Button className="w-full" loading={isLoading} type="submit">
          Update password
        </Button>
      </Form>
    </AuthLayout>
  );
}
