"use client";
import React, { useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Spinner } from "@phosphor-icons/react/dist/ssr";
import { Route } from "../constants/routes";
import { useLogout } from "../lib/auth-client";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();
  const path = usePathname();
  const logout = useLogout();

  const handleError = useCallback(async () => {
    console.error(error);
    await logout();
    if (path !== Route.Home.toString()) router.push(Route.Home);
    router.refresh();
  }, [error, logout, path, router]);

  useEffect(() => {
    void handleError();
  }, [handleError]);

  return (
    <div className="flex min-h-[83vh] items-center justify-center sm:pt-10">
      <Spinner className="animate-spin fill-primary" size={60} />
    </div>
  );
}
