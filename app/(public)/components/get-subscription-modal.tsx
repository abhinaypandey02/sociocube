"use client";
import { ArrowSquareOut, Check } from "@phosphor-icons/react/dist/ssr";
import React from "react";

import { Button } from "@/components/button";
import { useSubscription } from "@/lib/auth-client";

import Modal from "../../../components/modal";

export default function GetSubscriptionModal({
  close,
  message,
}: {
  close: () => void;
  message?: string;
}) {
  const [sub] = useSubscription();
  return (
    <Modal title={"Get Sociocube plus"} close={close} open={!!message}>
      {message ? <p className="text-center text-sm text-gray-700">{message}</p> : null}
      {!sub?.existing.plan && (
        <div className="space-y-6 py-9">
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <Check className="text-primary" weight="bold" />
              10 AI searches per day
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-primary" weight="bold" />
              20 creators per search
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-primary" weight="bold" />
              View contact details
            </li>
            <li className="flex items-start gap-2">
              <Check className="text-primary" weight="bold" />
              Download applicant data
            </li>
          </ul>
          {sub?.link && (
            <a href={sub.link}>
              <Button className="mx-auto flex items-center gap-2">
                Start 7-day free trial <ArrowSquareOut weight="bold" />
              </Button>
            </a>
          )}
        </div>
      )}
    </Modal>
  );
}
