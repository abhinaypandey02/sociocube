import GetEmailVerificationModal from "@/app/(public)/components/get-email-verification-modal";
import GetSubscriptionModal from "@/app/(public)/components/get-subscription-modal";
import React, { Dispatch, SetStateAction, useCallback, useMemo } from "react";

const GLOBAL_MODALS = {
  VERIFY_EMAIL: GetEmailVerificationModal,
  GET_SUBSCRIPTION: GetSubscriptionModal,
};

export interface GlobalModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export interface OpenModalParams {
  type?: keyof typeof GLOBAL_MODALS;
  message?: string;
}

export function GlobalModals({
  globalModal,
  setGlobalModal,
}: {
  globalModal?: OpenModalParams;
  setGlobalModal: Dispatch<SetStateAction<OpenModalParams | undefined>>;
}) {
  const onModalClose = useCallback(() => {
    setGlobalModal((prev) => (prev ? { ...prev, type: undefined } : prev));
  }, [setGlobalModal]);

  return useMemo(
    () =>
      Object.keys(GLOBAL_MODALS).map((type) => {
        const Modal = GLOBAL_MODALS[type as keyof typeof GLOBAL_MODALS];
        return (
          <Modal
            key={type}
            isOpen={type === globalModal?.type}
            onClose={onModalClose}
            message={globalModal?.message}
          />
        );
      }),
    [globalModal?.message, globalModal?.type, onModalClose],
  );
}
