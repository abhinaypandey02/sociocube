"use client";
import { Spinner } from "@phosphor-icons/react/dist/ssr";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { Route } from "@/constants/routes";
import { useLogout } from "@/lib/auth-client";

export default function Error({ error }: { error: Error }) {
  const router = useRouter();
  const path = usePathname();
  const logout = useLogout();
  useEffect(() => {
    void logout();
    if (path !== Route.Home.toString()) router.push(Route.Home);
    router.refresh();
  }, [logout, path, router]);
  console.error(error);
  return (
    <div className="flex min-h-[83vh] items-center justify-center sm:pt-10">
      <Spinner className="animate-spin fill-primary" size={60} />
    </div>
  );
}
