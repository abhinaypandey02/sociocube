"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useLogout } from "../../lib/auth-client";

export default function Logout() {
  const logout = useLogout();
  const router = useRouter();
  async function handleLogout() {
    router.push("/");
    await logout();
    router.refresh();
  }
  return (
    <>
      <button className="-mx-3 block w-full rounded-lg px-3 py-2.5 text-left text-base font-medium leading-7 text-gray-900 hover:bg-gray-50 hover:underline hover:underline-offset-8  lg:hidden">
        Logout
      </button>
      <button
        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 max-lg:hidden"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );
}
