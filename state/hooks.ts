import { useCallback, useContext } from "react";
import { GlobalState } from "@/state/memory";
import { OpenModalParams } from "@/state/modals";

export function useUser() {
  const { userState } = useContext(GlobalState);
  return userState;
}

export function useSubscription() {
  const { subscriptionState } = useContext(GlobalState);
  return subscriptionState;
}

export function useToken() {
  const { tokenState } = useContext(GlobalState);
  return tokenState;
}

export function useOpenPopup(type: OpenModalParams["type"]) {
  const { setGlobalModal } = useContext(GlobalState);
  return useCallback(
    (message: string) => {
      setGlobalModal({
        message,
        type,
      });
    },
    [setGlobalModal, type],
  );
}

export function useRequireEmailVerification() {
  const [user] = useUser();
  const toggleModal = useOpenPopup("VERIFY_EMAIL");

  return useCallback(
    (message: string) => {
      if (!user?.emailVerified) {
        toggleModal(message);
        return false;
      }
      return true;
    },
    [user?.emailVerified, toggleModal],
  );
}
