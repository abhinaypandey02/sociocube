import { Megaphone } from "@phosphor-icons/react";
import React from "react";

import { ApplicationTableRow } from "@/app/(dashboard)/your-campaigns/[id]/components/applications-table";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { SEND_ANNOUNCEMENT } from "@/lib/mutations";

export default function SendAnnouncementButton({
  applications,
  postingID,
  count,
}: {
  applications: ApplicationTableRow[];
  postingID: number;
  count: number;
}) {
  const [announce] = useAuthMutation(SEND_ANNOUNCEMENT);
  const handleSendAnnouncement = () => {
    const body = window.prompt("Enter message");
    if (body)
      announce({
        body,
        postingID,
      })
        .then(() => {
          window.alert("Announcement sent successfully");
        })
        .catch(handleGQLErrors);
  };
  return (
    <button
      className="flex items-center gap-1 text-sm font-medium text-primary underline underline-offset-4"
      onClick={handleSendAnnouncement}
      type="button"
      disabled={count === 0}
    >
      <Megaphone size={18} />
      <span className={"shrink-0"}>Send announcement ({count}) </span>
    </button>
  );
}
