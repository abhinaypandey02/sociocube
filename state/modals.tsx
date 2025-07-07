import GetEmailVerificationModal from "@/app/(public)/components/get-email-verification-modal";
import GetSubscriptionModal from "@/app/(public)/components/get-subscription-modal";
import React, { useCallback, useContext, useMemo } from "react";
import { MemoryActionType, useMemoryState } from "@/state/memory";

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

export function GlobalModals() {
  const { state, dispatch } = useMemoryState();
  const globalModal = state.globalModal;

  const onModalClose = useCallback(() => {
    dispatch({
      type: MemoryActionType.SET_GLOBAL_MODAL,
      payload: globalModal ? { ...globalModal, type: undefined } : undefined,
    });
  }, [dispatch, globalModal]);
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
