"use client";
import React, { useEffect, useState } from "react";
import { Pause, Play, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Spinner } from "@phosphor-icons/react/dist/ssr";
import type { GetPostingQuery } from "../../../../../__generated__/graphql";
import {
  handleGQLErrors,
  useAuthMutation,
} from "../../../../../lib/apollo-client";
import {
  DELETE_POSTING,
  PAUSE_POSTING,
  RESUME_POSTING,
} from "../../../../../lib/mutations";
import { revalidateAllPostings } from "../../../../../lib/revalidate";

export default function ManagePostingButton({
  posting,
}: {
  posting: NonNullable<GetPostingQuery["posting"]>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [pausePosting, { loading: pausingPosting }] =
    useAuthMutation(PAUSE_POSTING);
  const [deletePosting, { loading: deletingPosting }] =
    useAuthMutation(DELETE_POSTING);
  const [resumePosting, { loading: resumingPosting }] =
    useAuthMutation(RESUME_POSTING);

  const loading =
    pausingPosting || deletingPosting || resumingPosting || isLoading;
  const handleReload = () => {
    router.refresh();
    toast.success("Successfully updated posting");
    void revalidateAllPostings();
  };
  useEffect(() => {
    setIsLoading(false);
  }, [posting]);
  if (loading)
    return (
      <div className="ml-3 grow">
        <Spinner className="animate-spin text-accent" size={24} />
      </div>
    );
  return (
    <div className="ml-3 flex grow gap-3">
      {posting.open ? (
        <button
          disabled={loading}
          onClick={() => {
            setIsLoading(true);
            pausePosting({ postingID: posting.id })
              .then(handleReload)
              .catch(handleGQLErrors);
          }}
        >
          <Pause className="text-accent" size={24} weight="fill" />
        </button>
      ) : (
        <button
          disabled={loading}
          onClick={() => {
            setIsLoading(true);
            resumePosting({ postingID: posting.id })
              .then(handleReload)
              .catch(handleGQLErrors);
          }}
        >
          <Play className="text-accent" size={24} weight="fill" />
        </button>
      )}
      {posting.applicationsCount === 0 && (
        <button
          disabled={loading}
          onClick={() => {
            setIsLoading(true);
            deletePosting({ postingID: posting.id })
              .then(handleReload)
              .catch(handleGQLErrors);
          }}
        >
          <Trash color="red" size={24} weight="fill" />
        </button>
      )}
    </div>
  );
}
