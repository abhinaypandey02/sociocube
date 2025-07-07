import { useCallback } from "react";
import { MemoryActionType, MemoryState, useMemoryState } from "@/state/memory";
import { OpenModalParams } from "@/state/modals";

export function useUser() {
  const { state, dispatch } = useMemoryState();
  return [
    state.user,
    (payload: Partial<MemoryState["user"]>) => {
      dispatch({
        payload,
        type: MemoryActionType.SET_USER,
      });
    },
  ] as const;
}

export function useSubscription() {
  const { state, dispatch } = useMemoryState();
  return [
    state.subscription,
    (payload: MemoryState["subscription"]) => {
      dispatch({
        payload,
        type: MemoryActionType.SET_SUBSCRIPTION,
      });
    },
  ] as const;
}

export function useToken() {
  const { state, dispatch } = useMemoryState();
  return [
    state.token,
    (payload: MemoryState["token"]) => {
      dispatch({
        payload,
        type: MemoryActionType.SET_TOKEN,
      });
    },
  ] as const;
}

export function useOpenPopup(type: OpenModalParams["type"]) {
  const { dispatch } = useMemoryState();
  return useCallback(
    (message: string) => {
      dispatch({
        payload: {
          type,
          message,
        },
        type: MemoryActionType.SET_GLOBAL_MODAL,
      });
    },
    [dispatch, type],
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
