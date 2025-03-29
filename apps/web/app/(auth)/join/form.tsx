"use client";
import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Form from "@/components/form";
import { useSignUpWithEmail } from "../../../lib/auth-client";
import { getRoute, Route } from "../../../constants/routes";
import useTurnstileToken from "../use-turnstile-token";
import AuthLayout from "../components/auth-layout";
import { EMAIL_REGEX } from "../../../constants/validations";

const defaultValues = {
  email: "",
  password: "",
  c_password: "",
  name: "",
};

const CONTAINER_ID = "captcha-container";

export default function SignupForm() {
  const form = useForm({ defaultValues });
  const router = useRouter();
  const { turnstileToken, resetTurnstileToken } =
    useTurnstileToken(CONTAINER_ID);
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const signupWithEmail = useSignUpWithEmail();
  const paramsRedirectURL = params.get("redirectURL");
  const redirectURL =
    Route.Onboarding +
    (paramsRedirectURL ? `?redirectURL=${paramsRedirectURL}` : "");

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    if (!turnstileToken) {
      return;
    }
    setIsLoading(true);
    const error = await signupWithEmail(
      data.email.toLowerCase(),
      data.password,
      data.name,
      turnstileToken,
    );
    if (error === null) {
      setSuccess(true);
      router.push(redirectURL);
      router.refresh();
    } else {
      toast.error(error || "Invalid data");
      setIsLoading(false);
      resetTurnstileToken();
    }
  };

  return (
    <AuthLayout
      bottomHeading={{
        question: "Already have an account?",
        link: getRoute("Login"),
        answer: "Sign in to your account!",
      }}
      redirectURL={redirectURL}
      title="Create a new account"
    >
      <Form
        className="space-y-4"
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Input
          className="block"
          label="Full name"
          name="name"
          placeholder="Name"
          rules={{ required: true }}
        />
        <Input
          className="block"
          label="Email"
          name="email"
          placeholder="Email"
          rules={{
            required: true,
            pattern: { value: EMAIL_REGEX, message: "Invalid email" },
          }}
          type="email"
        />

        <Input
          className="block"
          label="Password"
          name="password"
          placeholder="Password"
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
