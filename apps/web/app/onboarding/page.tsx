import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { Spinner } from "@phosphor-icons/react/dist/ssr";
import { getServerToken, handleUnauthorized } from "../../lib/auth-server";
import { queryGQL } from "../../lib/apollo-server";
import { GET_CURRENT_USER } from "../../lib/queries";
import { Route } from "../../constants/routes";
import OnboardingInjector from "./injector";

export default async function AuthLayout() {
  const token = await getServerToken();
  if (!token) {
    handleUnauthorized();
    return;
  }
  const { getCurrentUser } = await queryGQL(GET_CURRENT_USER, {}, token);
  if (getCurrentUser.isOnboarded) {
    redirect(Route.Account);
  }
  return (
    <div className="flex min-h-[85vh] w-full items-center justify-center">
      <div className="w-full max-w-lg rounded bg-white p-5 shadow-elevation-2">
        <Suspense
          fallback={<Spinner className="animate-spin fill-primary" size={40} />}
        >
          <OnboardingInjector />
        </Suspense>
      </div>
    </div>
  );
}
