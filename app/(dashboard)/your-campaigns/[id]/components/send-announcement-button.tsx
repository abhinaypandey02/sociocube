import { Megaphone, PaperPlaneTilt } from "@phosphor-icons/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { ApplicationTableRow } from "@/app/(dashboard)/your-campaigns/[id]/components/applications-table";
import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import Modal from "@/components/modal";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { useToggleSubscribeModal } from "@/lib/auth-client";
import { SEND_ANNOUNCEMENT } from "@/lib/mutations";

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
  const toggleSubscribeModal = useToggleSubscribeModal();

  const form = useForm<FormType>();
  const [announce, { loading: announceLoading }] =
    useAuthMutation(SEND_ANNOUNCEMENT);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
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
  const handleSendAnnouncement = (data: FormType) => {
    const { announcement } = data;
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
  return (
    <>
      <Modal close={handleClose} open={isModalOpen}>
        <h3 className="mb-6 text-2xl font-semibold text-gray-700">
          Send Announcement to {applications.length}{" "} applicant{applications.length === 1 ? "" : "s"}
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
          <Button
            className="ml-auto mt-3 text-sm"
            loading={announceLoading}
            type="submit"
          >
            <span className={"shrink-0 pr-2"}> Send </span>
            <PaperPlaneTilt size={16} />
          </Button>
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
