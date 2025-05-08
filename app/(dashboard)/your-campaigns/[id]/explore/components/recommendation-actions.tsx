import { Check } from "@phosphor-icons/react";
import React, { useState } from "react";

import { ApplicationStatus } from "@/__generated__/graphql";
import { useAuthMutation } from "@/lib/apollo-client";
import { SHORTLIST_USER } from "@/lib/mutations";
import { cn } from "@/lib/utils";

export default function RecommendationActions({
  status,
  postingID,
  userID,
}: {
  status: ApplicationStatus;
  postingID: number;
  userID: number;
}) {
  const [shortlist] = useAuthMutation(SHORTLIST_USER);
  const [shortlisted, setShortlisted] = useState(
    status === ApplicationStatus.Shortlisted,
  );
  return (
    <div className="flex items-center gap-1">
      <button
        disabled={shortlisted}
        onClick={() => {
          void shortlist({
            userID,
            postingID,
          });
          setShortlisted(true);
        }}
        className={cn(
          shortlisted
            ? "text-primary font-medium flex items-center gap-1"
            : "text-accent underline",
        )}
        type="button"
      >
        {shortlisted ? "Requested" : "Shortlist"}
        {shortlisted && <Check />}
      </button>
    </div>
  );
}
