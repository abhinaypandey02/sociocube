import { Megaphone, PaperPlaneTilt } from "@phosphor-icons/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { ApplicationTableRow } from "@/app/(dashboard)/your-campaigns/[id]/components/applications-table";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { SEND_ANNOUNCEMENT } from "@/lib/mutations";

import Modal from "@/components/modal";
import Form from "@/components/form";
import { Button } from "@/components/button";
import { Input } from "@/components/input";

interface FormType {
  announcement: string;
}

export default function SendAnnouncementButton({
  applications,
  postingID,
  count,
}: {
  applications: ApplicationTableRow[];
  postingID: number;
  count: number;
}) {
  const form = useForm<FormType>();
  const [announce, { loading: announceLoading }] = useAuthMutation(SEND_ANNOUNCEMENT);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };
  const handleSendAnnouncement = (data: FormType) => {
    const { announcement } = data;
    if (announcement) {
      announce({
        body: announcement,
        postingID,
      })
        .then(() => {
          setIsModalOpen(false);
          toast.success("Announcement sent successfully");
          form.reset();
        })
        .catch(handleGQLErrors);
    }
  };
  const handleClose = () => {
    setIsModalOpen(false);
    form.reset();
  };
  return (
    <>
      <Modal close={handleClose} open={isModalOpen}>
        <h3 className="mb-6 text-2xl font-semibold text-gray-700">
          Send Announcement
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
            <PaperPlaneTilt className={"text-gray-800"} size={16} />
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
