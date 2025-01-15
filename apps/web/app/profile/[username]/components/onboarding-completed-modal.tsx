"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DialogTitle } from "@headlessui/react";
import { Button, Variants } from "ui/button";
import Modal from "../../../../components/modal";
import CopyLinkButton from "./copy-link-button";

export default function OnboardingCompletedModal({ url }: { url: string }) {
  const params = useSearchParams();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);
  if (!params.has("onboarding_completed")) return null;
  return (
    <Modal
      close={() => {
        setOpen(false);
      }}
      open={open}
    >
      <div>
        <div className="mt-3 translate-x-2 text-center text-4xl">🎉</div>
        <div className="mt-3 text-center sm:mt-3">
          <DialogTitle
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Welcome to Sociocube!
          </DialogTitle>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Your profile is live and ready for brands to discover! We'll
              notify you when a you catch a brand's eye!
            </p>

            <p className="mt-3 text-xs text-gray-500">
              Here's your personalised link 👇
            </p>
            <a className="text-sm font-medium text-accent " href={url}>
              {url}
            </a>
          </div>
        </div>
      </div>
      <div className="mt-5 flex gap-2 sm:mt-6">
        <Button
          className="grow"
          onClick={close}
          type="button"
          variant={Variants.ACCENT}
        >
          Edit details
        </Button>
        <CopyLinkButton url={url} />
      </div>
    </Modal>
  );
}
