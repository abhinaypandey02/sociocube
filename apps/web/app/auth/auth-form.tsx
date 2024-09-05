"use client";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useLoginWithEmail, useSignUpWithEmail } from "../../lib/auth-client";

const defaultValues = {
  email: "",
  password: "",
  c_password: "",
  name: "",
};

declare global {
  interface Window {
    onTurnstileLoad: () => void;
  }
}

export default function AuthForm({ signUp }: { signUp?: boolean }) {
  const { register, handleSubmit } = useForm({ defaultValues });
  const router = useRouter();
  const [turnstileToken, setTurnstileToken] = useState<string>();

  const signupWithEmail = useSignUpWithEmail();
  const loginWithEmail = useLoginWithEmail();
  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    if (!turnstileToken) {
      turnstile.execute("#captcha-container");
      return;
    }
    if (signUp)
      await signupWithEmail(
        data.email,
        data.password,
        data.name,
        turnstileToken,
      );
    else await loginWithEmail(data.email, data.password, turnstileToken);
    turnstile.reset();
    router.refresh();
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
  }, []);

  return (
    <div className="">
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" {...register("email")} />
        <input placeholder="Password" {...register("password")} />
        <input placeholder="Name" {...register("name")} />
        {signUp ? (
          <input
            placeholder="Confirm Password"
            {...register("c_password", {
              validate: {
                match: (value, formValues) => value === formValues.password,
              },
            })}
          />
        ) : null}
        <div id="captcha-container" />
        <button disabled={!turnstileToken}>
          {signUp ? "Sign up" : "Login"}
        </button>
      </form>
      <div>
        <a href="/_auth/google">{signUp ? "Sign up" : "Login"} with Google</a>
      </div>
      <div>
        <a href="/_auth/instagram">
          {signUp ? "Sign up" : "Login"} with Instagram
        </a>
      </div>
    </div>
  );
}
