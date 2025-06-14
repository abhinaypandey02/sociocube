"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import useHandleAuthorized from "@/app/(public)/components/auth/handle-authorized";
import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import { getRoute, Route } from "@/constants/routes";
import { EMAIL_REGEX } from "@/constants/validations";
import { useSignUpWithEmail } from "@/lib/auth-client";

import AuthLayout from "../components/auth/auth-layout";
import useTurnstileToken from "../components/auth/use-turnstile-token";

const defaultValues = {
  email: "",
  password: "",
  c_password: "",
  name: "",
};

const CONTAINER_ID = "captcha-container";

export default function SignupForm({
  data: paramsRedirectURL,
}: {
  data?: string;
}) {
  useHandleAuthorized();
  const form = useForm({ defaultValues });
  const router = useRouter();
  const { turnstileToken, resetTurnstileToken } =
    useTurnstileToken(CONTAINER_ID);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const signupWithEmail = useSignUpWithEmail();
  const redirectURL =
    Route.Onboarding +
    (paramsRedirectURL ? `?redirectURL=${paramsRedirectURL}` : "");

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    if (!turnstileToken) {
      return;
    }
    if (data.password !== data.c_password) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const error = await signupWithEmail(
      data.email.toLowerCase(),
      data.password,
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
      <Form className="space-y-4" form={form} onSubmit={onSubmit}>
        <Input
          className="block"
          label="Email"
          name="email"
          placeholder="Your Email"
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
          placeholder="Setup a password"
          rules={{ required: true }}
          type="password"
        />
        <Input
          className="block"
          label="Confirm Password"
          name="c_password"
          placeholder="Confirm password"
          rules={{ required: true }}
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
