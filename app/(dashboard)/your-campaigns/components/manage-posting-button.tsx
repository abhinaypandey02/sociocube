"use client";
import { Pause, Play } from "@phosphor-icons/react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

import type { GetPostingQuery } from "@/__generated__/graphql";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { PAUSE_POSTING, RESUME_POSTING } from "@/lib/mutations";

export default function ManagePostingButton({
  posting,
}: {
  posting: NonNullable<GetPostingQuery["posting"]>;
}) {
  const [status, setStatus] = useState(posting.open);
  const [pausePosting] = useAuthMutation(PAUSE_POSTING);
  const [resumePosting] = useAuthMutation(RESUME_POSTING);

  const handleToast = () => {
    toast.success(
      status
        ? `Successfully resumed your posting`
        : "Your posting is now paused",
    );
    setStatus(!status);
  };
  if (status)
    return (
      <button
        onClick={() => {
          handleToast();
          pausePosting({ postingID: posting.id }).catch(handleGQLErrors);
        }}
      >
        <Pause className="text-accent" weight="fill" />
      </button>
    );
  return (
    <button
      onClick={() => {
        handleToast();
        resumePosting({ postingID: posting.id }).catch(handleGQLErrors);
      }}
    >
      <Play className="text-primary" weight="fill" />
    </button>
  );
}
