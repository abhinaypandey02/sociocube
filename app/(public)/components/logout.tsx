"use client";
import { useRouter } from "next/navigation";
import React from "react";

import { useLogout } from "@/lib/auth";

export default function Logout() {
  const logout = useLogout();
  const router = useRouter();
  async function handleLogout() {
    router.push("/");
    await logout();
    window.location.reload();
  }
  return (
    <>
      <button
        className="px-4 py-1.5 sm:py-2 text-gray-700 hover:bg-gray-100 w-full text-start"
        onClick={handleLogout}
        type="button"
      >
        Logout
      </button>
    </>
  );
}
