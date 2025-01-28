"use client";
import React from "react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { Button } from "ui/button";
import { useToggleGetVerifiedModal } from "../../../../lib/auth-client";

export default function AddPostingButton({
  isVerified,
}: {
  isVerified: boolean;
}) {
  const toggle = useToggleGetVerifiedModal();
  return (
    <Button
      className="flex items-center gap-1 !text-sm max-lg:size-9 max-lg:rounded-full max-lg:!p-0"
      onClick={isVerified ? undefined : toggle}
    >
      <Plus weight="bold" /> <span className="max-lg:hidden">Create new</span>
    </Button>
  );
}
