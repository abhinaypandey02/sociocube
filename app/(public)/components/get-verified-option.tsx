"use client";
import { SealCheck } from "@phosphor-icons/react/dist/ssr";
import React from "react";

import { useToggleGetVerifiedModal } from "@/lib/auth-client";

export default function GetVerifiedOption() {
  const toggle = useToggleGetVerifiedModal();
  return (
    <>
      <button
        className="px-4 py-1.5 sm:py-3 max-sm:text-sm text-gray-700 flex items-center gap-2"
        onClick={toggle}
        type="button"
      >
        Get verified <SealCheck className="text-accent" />
      </button>
    </>
  );
}
