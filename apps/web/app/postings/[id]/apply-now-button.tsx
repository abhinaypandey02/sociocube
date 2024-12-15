"use client";
import React, { useCallback, useMemo, useState } from "react";
import { Button, Variants } from "ui/button";
import { useRouter } from "next/navigation";
import type { GetCurrentUserQuery } from "../../../__generated__/graphql";
import { getRoute } from "../../../constants/routes";

export default function ApplyNowButton({
  data,
  loading,
  isOpen,
}: {
  data?: GetCurrentUserQuery;
  loading: boolean;
  isOpen: boolean;
}) {
  const router = useRouter();
  const [, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const message = useMemo(() => {
    if (!isOpen) return ["Closed", null];
    if (!data?.user) return ["Sign in to apply", getRoute("SignUp")];
    if (!data.user.isOnboarded)
      return ["Connect socials to apply", getRoute("Onboarding")];
    return ["Apply Now", null];
  }, [data?.user, isOpen]);

  const handleClick = useCallback(() => {
    if (message[1]) {
      setIsLoading(true);
      router.push(message[1]);
    } else setIsModalOpen(true);
  }, [message]);

  return (
    <Button
      className="max-sm:w-full sm:ml-auto"
      disabled={!isOpen}
      loading={loading || isLoading}
      onClick={handleClick}
      variant={Variants.ACCENT}
    >
      {message[0]}
    </Button>
  );
}
