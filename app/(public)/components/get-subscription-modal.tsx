import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import React from "react";

import { Button } from "@/components/button";
import { useSubscription } from "@/lib/auth-client";

import Modal from "../../../components/modal";

export default function GetSubscriptionModal({
  isOpen,
  close,
  message,
}: {
  isOpen: boolean;
  close: () => void;
  message?: string;
}) {
  const [sub] = useSubscription();
  return (
    <Modal title={"Get Sociocube plus"} close={close} open={isOpen}>
      <div>{message}</div>
      {!sub?.existing.plan && (
        <div className="space-y-2 py-9">
          <p className="text-center">Get Plus for 20$</p>
          {sub?.link && (
            <a href={sub.link}>
              <Button className="mx-auto flex items-center gap-2">
                Purchase now <ArrowSquareOut weight="bold" />
              </Button>
            </a>
          )}
        </div>
      )}
    </Modal>
  );
}
