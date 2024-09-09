"use client";
import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "ui/input";
import { Button } from "ui/button";
import { useLoginWithEmail } from "../../../lib/auth-client";
import { Route } from "../../../constants/routes";
import useTurnstileToken from "../use-turnstile-token";

const defaultValues = {
  email: "",
  password: "",
  c_password: "",
  name: "",
};

const CONTAINER_ID = "captcha-container";

export default function LoginPage() {
  const { register, handleSubmit } = useForm({ defaultValues });
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
    if (await loginWithEmail(data.email, data.password, turnstileToken)) {
      setSuccess(true);
      router.push(Route.Home);
      router.refresh();
    } else {
      setIsLoading(false);
      resetTurnstileToken();
    }
  };

  return (
    <>
      <h2 className=" my-10 text-center text-4xl font-bold">Get back in!</h2>
      <form
        className="flex flex-col items-center gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className="block"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <Input
          className="block"
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />
        <div id={CONTAINER_ID} />
        <Button
          loading={!turnstileToken || isLoading}
          success={success}
          type="submit"
        >
          Login
        </Button>
      </form>
    </>
  );
}

export const dynamic = "force-dynamic";
