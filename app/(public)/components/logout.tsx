"use client";
import { useRouter } from "next/navigation";
import React from "react";

import { useLogout } from "@/lib/auth-client";

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
        className="px-4 py-1.5 sm:py-3 max-sm:text-sm text-gray-700"
        onClick={handleLogout}
        type="button"
      >
        Logout
      </button>
    </>
  );
}
