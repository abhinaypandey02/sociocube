import type { PropsWithChildren } from "react";
import React from "react";
import Link from "next/link";
import { GoogleLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { Route } from "../../../constants/routes";

export default function AuthLayout({
  newUser,
  children,
}: PropsWithChildren<{ newUser?: boolean }>) {
  return (
    <section className="mt-32  flex flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          className="mx-auto block w-auto text-center text-5xl font-bold italic text-primary"
          href="/"
        >
          freeluence
        </Link>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {newUser ? "Create a new account" : "Get back to your account"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className=" px-6 py-12 sm:rounded-lg sm:bg-white sm:px-12 sm:shadow">
          {children}
          <div>
            <div className="relative mt-10">
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

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Link
                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                href="/_auth/google"
              >
                <GoogleLogo size={20} />
                <span className="text-sm font-semibold leading-6">Google</span>
              </Link>

              <Link
                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                href="/_auth/instagram"
              >
                <InstagramLogo size={20} />
                <span className="text-sm font-semibold leading-6">
                  Instagram
                </span>
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          {newUser ? "Already have an account? " : "New here? "}
          <Link
            className="link-accent font-semibold leading-6"
            href={newUser ? Route.Login : Route.SignUp}
          >
            {newUser
              ? "Sign in to your account!"
              : "Get started on a new account!"}
          </Link>
        </p>
      </div>
    </section>
  );
}
