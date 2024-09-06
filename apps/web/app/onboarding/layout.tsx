import type { PropsWithChildren } from "react";
import React from "react";
import { redirect } from "next/navigation";
import { getServerToken, handleUnauthorized } from "../../lib/auth-server";
import { queryGQL } from "../../lib/apollo-server";
import { GET_CURRENT_USER } from "../../lib/queries";
import { Route } from "../../constants/routes";

export default async function AuthLayout({ children }: PropsWithChildren) {
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
        {children}
      </div>
    </div>
  );
}
