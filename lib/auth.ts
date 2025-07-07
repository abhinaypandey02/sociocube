import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { useToken } from "@/state/hooks";
import { MemoryActionType, useMemoryState } from "@/state/memory";

export function useSignUpWithEmail() {
  const [, setToken] = useToken();
  return useCallback(
    async (email: string, password: string, captchaToken: string) => {
      const res = await fetch(`/api/email`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          captchaToken,
        }),
        credentials: "include",
      });
      if (res.ok) {
        setToken(await res.text());
        return null;
      }
      return res.text();
    },
    [setToken],
  );
}
export function useLoginWithEmail() {
  const [, setToken] = useToken();
  return useCallback(
    async (email: string, password: string, captchaToken: string) => {
      const res = await fetch(`/api/email`, {
        method: "PUT",
        body: JSON.stringify({
          email,
          password,
          captchaToken,
        }),
        credentials: "include",
      });
      if (res.ok) {
        setToken(await res.text());
        return null;
      }
      return res.text();
    },
    [setToken],
  );
}
export function useLogout() {
  const [, setToken] = useToken();
  const { dispatch } = useMemoryState();
  const router = useRouter();
  return useCallback(async () => {
    const res = await fetch(`/api/email`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      dispatch({
        type: MemoryActionType.SET_ABSOLUTE_USER,
        payload: null,
      });
      setToken(undefined);
      router.push("/");
    }
  }, [setToken, router]);
}
