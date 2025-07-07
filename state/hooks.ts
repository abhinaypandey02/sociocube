import { useCallback } from "react";
import { MemoryActionType, MemoryState, useMemoryState } from "@/state/memory";
import { OpenModalParams } from "@/state/modals";

export function useUser() {
  const { state, dispatch } = useMemoryState();

  const setUser = useCallback(
    (payload: Partial<MemoryState["user"]>) => {
      dispatch({
        payload,
        type: MemoryActionType.SET_USER,
      });
    },
    [dispatch],
  );

  return [state.user, setUser] as const;
}

export function useSubscription() {
  const { state, dispatch } = useMemoryState();

  const setSubscription = useCallback(
    (payload: MemoryState["subscription"]) => {
      dispatch({
        payload,
        type: MemoryActionType.SET_SUBSCRIPTION,
      });
    },
    [dispatch],
  );

  return [state.subscription, setSubscription] as const;
}

export function useToken() {
  const { state, dispatch } = useMemoryState();

  const setToken = useCallback(
    (payload: MemoryState["token"]) => {
      dispatch({
        payload,
        type: MemoryActionType.SET_TOKEN,
      });
    },
    [dispatch],
  );

  return [state.token, setToken] as const;
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
