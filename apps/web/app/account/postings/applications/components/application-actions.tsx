import React from "react";
import { Heart } from "@phosphor-icons/react/dist/ssr";
import { ThumbsDown } from "@phosphor-icons/react";
import { ApplicationStatus } from "../../../../../__generated__/graphql";
import { useAuthMutation } from "../../../../../lib/apollo-client";
import {
  LIKE_APPLICATION,
  REJECT_APPLICATION,
} from "../../../../../lib/mutations";

export default function ApplicationActions({
  status,
  id,
  handleReject,
  handleLike,
}: {
  status: ApplicationStatus;
  id: number;
  handleReject: (id: number) => void;
  handleLike: (id: number) => void;
}) {
  const [like] = useAuthMutation(LIKE_APPLICATION);
  const [reject] = useAuthMutation(REJECT_APPLICATION);
  const isLiked = status === ApplicationStatus.Interested;
  const isRejected = status === ApplicationStatus.Rejected;
  return (
    <div className="flex items-center gap-1" key={id}>
      {!isRejected && (
        <button
          disabled={isLiked}
          onClick={() => {
            handleLike(id);
            void like({
              id,
            });
          }}
          type="button"
        >
          <Heart
            className="text-primary"
            size={18}
            weight={isLiked ? "fill" : "regular"}
          />
        </button>
      )}
      <button
        disabled={isRejected}
        onClick={() => {
          handleReject(id);
          void reject({
            id,
          });
        }}
        type="button"
      >
        <ThumbsDown
          className="text-primary"
          size={18}
          weight={isRejected ? "fill" : "regular"}
        />
      </button>
    </div>
  );
}
