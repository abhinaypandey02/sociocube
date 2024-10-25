"use client";
import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "ui/input";
import { Button } from "ui/button";
import Form from "ui/form";
import { useSignUpWithEmail } from "../../../lib/auth-client";
import { Route } from "../../../constants/routes";
import useTurnstileToken from "../use-turnstile-token";
import AuthLayout from "../components/auth-layout";

const defaultValues = {
  email: "",
  password: "",
  c_password: "",
  name: "",
};

const CONTAINER_ID = "captcha-container";

export default function Signup() {
  const form = useForm({ defaultValues });
  const router = useRouter();
  const { turnstileToken, resetTurnstileToken } =
    useTurnstileToken(CONTAINER_ID);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const signupWithEmail = useSignUpWithEmail();
  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    if (!turnstileToken) {
      return;
    }
    setIsLoading(true);
    if (
      await signupWithEmail(
        data.email,
        data.password,
        data.name,
        turnstileToken,
      )
    ) {
      setSuccess(true);
      router.push(Route.Home);
      router.refresh();
    } else {
      setIsLoading(false);
      resetTurnstileToken();
    }
  };

  return (
    <AuthLayout newUser>
      <Form
        className="space-y-4"
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div>
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="email"
          >
            Email address
          </label>
          <div className="mt-2">
            <Input className="block" name="name" placeholder="Name" />
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="password"
          >
            Password
          </label>
          <div className="mt-2">
            <Input className="block" name="email" placeholder="Email" />
          </div>
        </div>
        <div>
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="password"
          >
            Password
          </label>
          <div className="mt-2">
            <Input
              className="block"
              name="password"
              placeholder="Password"
              type="password"
            />
          </div>
        </div>
        <div>
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="password"
          >
            Password
          </label>
          <div className="mt-2">
            <Input
              className="block"
              name="c_password"
              placeholder="Confirm Password"
              rules={{
                validate: {
                  match: (value, formValues) => value === formValues.password,
                },
              }}
              type="password"
            />
          </div>
        </div>

        <div id={CONTAINER_ID} />
        <Button
          className="w-full"
          loading={!turnstileToken || isLoading}
          success={success}
          type="submit"
        >
          Sign up
        </Button>
      </Form>
    </AuthLayout>
  );
}
