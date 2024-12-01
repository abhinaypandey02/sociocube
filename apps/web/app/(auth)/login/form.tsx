"use client";
import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "ui/input";
import { Button } from "ui/button";
import Link from "next/link";
import Form from "ui/form";
import { toast } from "react-hot-toast";
import { useLoginWithEmail } from "../../../lib/auth-client";
import { getRoute } from "../../../constants/routes";
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

export default function LoginForm() {
  const form = useForm({ defaultValues });
  const params = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { turnstileToken, resetTurnstileToken } =
    useTurnstileToken(CONTAINER_ID);
  const [success, setSuccess] = useState(false);

  const loginWithEmail = useLoginWithEmail();
  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    if (!turnstileToken) {
      return;
    }
    setIsLoading(true);
    const error = await loginWithEmail(
      data.email,
      data.password,
      turnstileToken,
    );
    if (error === null) {
      setSuccess(true);
      router.push(params.get("redirect") || getRoute("Home"));
      router.refresh();
    } else {
      toast.error(error || "Invalid credentials");
      setIsLoading(false);
      resetTurnstileToken();
    }
  };

  return (
    <AuthLayout newUser={false}>
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
          <div className="flex items-center">
            <input
              className="size-4 rounded border-gray-300 text-accent focus:ring-accent"
              id="remember-me"
              name="remember-me"
              type="checkbox"
            />
            <label
              className="ml-3 block text-sm leading-6 text-gray-900"
              htmlFor="remember-me"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm leading-6">
            <Link className="link-accent font-semibold" href="#">
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
