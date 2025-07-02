import {
  EnvelopeSimple,
  Megaphone,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { ApplicationTableRow } from "@/app/(dashboard)/your-campaigns/[id]/components/applications-table";
import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import Modal from "@/components/modal";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { SEND_ANNOUNCEMENT } from "@/lib/mutations";
import { useOpenPopup, useSubscription } from "@/state/hooks";

interface FormType {
  announcement: string;
}

export default function SendAnnouncementButton({
  applications,
  postingID,
  count,
  dailyCount,
}: {
  applications: ApplicationTableRow[];
  postingID: number;
  count: number;
  dailyCount: number;
}) {
  const toggleSubscribeModal = useOpenPopup("GET_SUBSCRIPTION");
  const [subscription] = useSubscription();
  const form = useForm<FormType>();
  const [announce, { loading: announceLoading }] =
    useAuthMutation(SEND_ANNOUNCEMENT);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (!subscription?.existing.plan)
      return toggleSubscribeModal("Subscribe now to send broadcast emails");
    if (count === 0) {
      toggleSubscribeModal(
        "You have used all the announcements for this posting.",
      );
    } else if (dailyCount === 0) {
      toggleSubscribeModal("Your daily announcement limit has been reached");
    } else setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
    form.reset();
  };
  const handleSendAnnouncement = ({ announcement }: FormType) => {
    if (!subscription?.existing.plan)
      return toggleSubscribeModal("Subscribe now to send broadcast emails");
    if (announcement) {
      announce({
        apps: applications.length
          ? applications.map((app) => app.id)
          : undefined,
        body: announcement,
        postingID,
      })
        .then(() => {
          toast.success("Announcement sent successfully");
          handleClose();
        })
        .catch(handleGQLErrors);
    }
  };

  const handleCustomEmail = async () => {
    if (!subscription?.existing.plan)
      return toggleSubscribeModal("Subscribe now to send broadcast emails");
    const emails = applications
      .map((app) => app.user?.email)
      .filter((e): e is string => Boolean(e));
    if (emails.length === 0) return;

    navigator.clipboard
      .writeText(emails.join(","))
      .then(() => toast.success("Emails copied to clipboard"));

    window.location.href = `mailto:?bcc=${emails
      .map((e) => encodeURIComponent(e))
      .join(",")}`;
  };
  return (
    <>
      <Modal close={handleClose} open={isModalOpen}>
        <h3 className="mb-6 text-2xl font-semibold text-gray-700">
          Send Announcement to {applications.length} applicant
          {applications.length === 1 ? "" : "s"}
        </h3>
        <Form form={form} onSubmit={handleSendAnnouncement}>
          <Input
            className="mb-4 placeholder:text-xs"
            label=""
            name="announcement"
            placeholder="Type a message"
            required={true}
            textarea
          />
          <div className="flex mt-4 justify-end gap-2">
            <Button
              className="flex items-center gap-1 text-sm"
              invert
              onClick={handleCustomEmail}
              type="button"
            >
              <EnvelopeSimple size={16} />
              <span className="shrink-0">Copy selected emails</span>
            </Button>
            <Button className="text-sm" loading={announceLoading} type="submit">
              <span className={"shrink-0 pr-2"}> Send </span>
              <PaperPlaneTilt size={16} />
            </Button>
          </div>
        </Form>
      </Modal>

      <button
        className="flex items-center gap-1 text-sm font-medium text-primary underline underline-offset-4"
        onClick={handleClick}
        type="button"
        disabled={count === 0}
      >
        <Megaphone size={18} />
        <span className={"shrink-0"}>Send announcement ({count}) </span>
      </button>
    </>
  );
}
