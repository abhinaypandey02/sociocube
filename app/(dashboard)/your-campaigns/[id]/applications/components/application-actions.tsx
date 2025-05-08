import { Check, X } from "@phosphor-icons/react";
import React, { useState } from "react";

import { ApplicationStatus } from "@/__generated__/graphql";
import { useAuthMutation } from "@/lib/apollo-client";
import { LIKE_APPLICATION, REJECT_APPLICATION } from "@/lib/mutations";

export default function ApplicationActions({
  status: _status,
  id,
}: {
  status: ApplicationStatus;
  id: number;
}) {
  const [like] = useAuthMutation(LIKE_APPLICATION);
  const [reject] = useAuthMutation(REJECT_APPLICATION);
  const [status, setStatus] = useState(_status);
  const completed = status === ApplicationStatus.Selected;
  const isRejected = status === ApplicationStatus.Rejected;
  return (
    <div className="flex items-center gap-1" key={id}>
      {!isRejected ? (
        <button
          disabled={completed}
          onClick={() => {
            setStatus(ApplicationStatus.Selected);
            void like({
              id,
            });
          }}
          type="button"
        >
          <Check
            className="text-primary"
            size={18}
            weight={completed ? "bold" : "regular"}
          />
        </button>
      ) : null}
      {!completed ? (
        <button
          disabled={isRejected}
          onClick={() => {
            setStatus(ApplicationStatus.Rejected);
            void reject({
              id,
            });
          }}
          type="button"
        >
          <X
            className="text-primary"
            size={18}
            weight={isRejected ? "fill" : "regular"}
          />
        </button>
      ) : null}
    </div>
  );
}
