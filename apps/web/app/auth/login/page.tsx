"use client";
import React, { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "ui/input";
import { Button } from "ui/button";
import { useLoginWithEmail } from "../../../lib/auth-client";
import { Route } from "../../../constants/routes";

const defaultValues = {
  email: "",
  password: "",
  c_password: "",
  name: "",
};

declare global {
  interface Window {
    onTurnstileLoad: () => void;
    turnstile: typeof turnstile;
  }
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm({ defaultValues });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>();

  const loginWithEmail = useLoginWithEmail();
  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    if (!turnstileToken) {
      turnstile.execute("#captcha-container");
      return;
    }
    setIsLoading(true);
    if (await loginWithEmail(data.email, data.password, turnstileToken)) {
      router.push(Route.Home);
      router.refresh();
    } else {
      setIsLoading(false);
      turnstile.reset();
    }
  };

  useEffect(() => {
    window.onTurnstileLoad = () => {
      turnstile.render("#captcha-container", {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
        callback(token: string) {
          setTurnstileToken(token);
        },
      });
    };

    if (typeof window.turnstile !== "undefined") {
      turnstile.execute("#captcha-container", {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
        callback(token: string) {
          setTurnstileToken(token);
        },
      });
    }
  }, []);

  return (
    <>
      <h2 className=" my-10 text-center text-4xl font-bold">Get back in!</h2>
      <form
        className="flex flex-col items-center gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input className="block" placeholder="Email" {...register("email")} />
        <Input
          className="block"
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        <div id="captcha-container" />
        <Button loading={!turnstileToken || isLoading} type="submit">
          Login
        </Button>
      </form>
    </>
  );
}

export const dynamic = "force-dynamic";
