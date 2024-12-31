"use client";
import React from "react";
import { Button, Variants } from "ui/button";
import { Pause, Play, Trash } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import type {
  GetCurrentUserApplicationStatusQuery,
  GetPostingQuery,
} from "../../../__generated__/graphql";
import { handleGQLErrors, useAuthMutation } from "../../../lib/apollo-client";
import {
  DELETE_POSTING,
  PAUSE_POSTING,
  RESUME_POSTING,
} from "../../../lib/mutations";
import { revalidateAllPostings } from "../../../lib/revalidate";

export default function ManagePostingButton({
  data,
  loading: dataLoading,
  posting,
}: {
  data?: GetCurrentUserApplicationStatusQuery;
  loading: boolean;
  posting: GetPostingQuery["posting"];
}) {
  const router = useRouter();
  const [pausePosting, { loading: pausingPosting }] =
    useAuthMutation(PAUSE_POSTING);
  const [deletePosting, { loading: deletingPosting }] =
    useAuthMutation(DELETE_POSTING);
  const [resumePosting, { loading: resumingPosting }] =
    useAuthMutation(RESUME_POSTING);

  const editAccess = posting?.user?.id === data?.user?.id;
  if (!editAccess || !posting?.id || dataLoading) return null;
  const loading = pausingPosting || deletingPosting || resumingPosting;
  const handleReload = () => {
    toast.success("Successfully updated posting");
    void revalidateAllPostings();
    router.refresh();
  };
  // if (success) return null;
  return (
    <>
      {posting.open ? (
        <Button
          loading={loading}
          onClick={() =>
            pausePosting({ postingID: posting.id })
              .then(handleReload)
              .catch(handleGQLErrors)
          }
          outline
          variant={Variants.ACCENT}
        >
          <Pause />
        </Button>
      ) : (
        <Button
          loading={loading}
          onClick={() =>
            resumePosting({ postingID: posting.id })
              .then(handleReload)
              .catch(handleGQLErrors)
          }
          outline
          variant={Variants.ACCENT}
        >
          <Play />
        </Button>
      )}
      {posting.applicationsCount === 0 && (
        <Button
          loading={loading}
          onClick={() =>
            deletePosting({ postingID: posting.id })
              .then(handleReload)
              .catch(handleGQLErrors)
          }
          outline
          variant={Variants.ACCENT}
        >
          <Trash color="red" />
        </Button>
      )}
    </>
  );
}
