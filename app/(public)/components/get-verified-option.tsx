"use client";
import { SealCheck } from "@phosphor-icons/react/dist/ssr";
import React from "react";

import { useToggleGetVerifiedModal } from "@/lib/auth-client";

export default function GetVerifiedOption() {
  const toggle = useToggleGetVerifiedModal();
  return (
    <>
      <button
        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 max-lg:hidden"
        onClick={toggle}
        type="button"
      >
        Get verified <SealCheck className="text-accent" />
      </button>
      <button
        className="-mx-3 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-gray-900 hover:bg-gray-50 hover:underline hover:underline-offset-8  lg:hidden "
        onClick={toggle}
        type="button"
      >
        Get verified <SealCheck className="text-accent" />
      </button>
    </>
  );
}
