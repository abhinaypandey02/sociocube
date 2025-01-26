"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Route } from "../constants/routes";
import { useLogout } from "../lib/auth-client";

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
  return null;
}
