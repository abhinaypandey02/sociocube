import Link from "next/link";
import Script from "next/script";
import type { PropsWithChildren } from "react";
import React from "react";

import SocialBar from "./social-bar";

export default function AuthLayout({
  title,
  bottomHeading,
  children,
  redirectURL,
}: PropsWithChildren<{
  title: string;
  bottomHeading?: {
    question: string;
    answer: string;
    link: string;
  };
  redirectURL?: string;
}>) {
  return (
    <section className="flex flex-1 flex-col justify-center py-3 sm:px-6 sm:py-8 lg:px-8">
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad" />
      <div className="sm:mx-auto sm:w-full ">
        <h2 className="text-center font-poppins text-3xl font-semibold leading-9 text-gray-800 sm:text-5xl ">
          {title}
        </h2>
      </div>

      <div className="sm:mx-auto sm:mt-20 sm:w-full sm:max-w-[480px] mt-8">
        <div className=" px-4 sm:rounded-lg sm:bg-white sm:px-12 sm:shadow-sm">
          {children}
          {redirectURL ? (
            <>
              <div className="relative my-6">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">
                    Or continue with
                  </span>
                </div>
              </div>

              <SocialBar />
            </>
          ) : null}
        </div>

        {bottomHeading ? (
          <p className="mt-4 text-center text-sm text-gray-500">
            {bottomHeading.question}&nbsp;
            <Link
              className="link-accent font-semibold leading-6"
              href={bottomHeading.link}
            >
              {bottomHeading.answer}
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
