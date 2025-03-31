"use client";
import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Form from "@/components/form";
import { useLoginWithEmail } from "@/lib/auth-client";
import { getRoute, Route } from "@/constants/routes";
import { EMAIL_REGEX } from "@/constants/validations";
import useTurnstileToken from "../use-turnstile-token";
import AuthLayout from "../components/auth-layout";

const defaultValues = {
  email: "",
  password: "",
  c_password: "",
  name: "",
};

const CONTAINER_ID = "captcha-container";

export default function LoginForm({
  data: paramsRedirectURL,
}: {
  data?: string;
}) {
  const form = useForm({ defaultValues });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { turnstileToken, resetTurnstileToken } =
    useTurnstileToken(CONTAINER_ID);
  const [success, setSuccess] = useState(false);

  const loginWithEmail = useLoginWithEmail();
  const redirectURL = paramsRedirectURL || Route.Home;
  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    if (!turnstileToken) {
      return;
    }
    setIsLoading(true);
    const error = await loginWithEmail(
      data.email.toLowerCase(),
      data.password,
      turnstileToken,
    );
    if (error === null) {
      setSuccess(true);
      router.push(redirectURL);
      router.refresh();
    } else {
      toast.error(error || "Invalid credentials");
      setIsLoading(false);
      resetTurnstileToken();
    }
  };

  return (
    <AuthLayout
      bottomHeading={{
        question: "New here?",
        answer: "Get started on a new account!",
        link: getRoute("SignUp"),
      }}
      redirectURL={redirectURL}
      title="Login to your account"
    >
      <Form
        className="space-y-6"
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
            <Input
              className="block"
              name="email"
              placeholder="Email"
              rules={{
                required: true,
                pattern: { value: EMAIL_REGEX, message: "Invalid email" },
              }}
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
              name="password"
              placeholder="Password"
              rules={{ required: true }}
              type="password"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm leading-6">
            <Link
              className="link-accent font-semibold"
              href={getRoute("Forgot")}
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <div id={CONTAINER_ID} />

        <div>
          <Button
            className="w-full"
            loading={!turnstileToken || isLoading}
            success={success}
            type="submit"
          >
            Login
          </Button>
        </div>
      </Form>
    </AuthLayout>
  );
}
