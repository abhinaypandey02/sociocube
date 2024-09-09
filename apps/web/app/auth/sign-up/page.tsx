"use client";
import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "ui/input";
import { Button } from "ui/button";
import { useSignUpWithEmail } from "../../../lib/auth-client";
import { Route } from "../../../constants/routes";
import useTurnstileToken from "../use-turnstile-token";

const defaultValues = {
  email: "",
  password: "",
  c_password: "",
  name: "",
};

const CONTAINER_ID = "captcha-container";

export default function Signup() {
  const { register, handleSubmit } = useForm({ defaultValues });
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
    <>
      <h2 className=" my-10 text-center text-4xl font-bold">
        Join the largest community!
      </h2>
      <form
        className="flex flex-col items-center gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input className="block" placeholder="Name" {...register("name")} />
        <Input className="block" placeholder="Email" {...register("email")} />
        <Input
          className="block"
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <Input
          className="block"
          placeholder="Confirm Password"
          type="password"
          {...register("c_password", {
            validate: {
              match: (value, formValues) => value === formValues.password,
            },
          })}
        />
        <div id={CONTAINER_ID} />
        <Button
          loading={!turnstileToken || isLoading}
          success={success}
          type="submit"
        >
          Sign up
        </Button>
      </form>
    </>
  );
}
