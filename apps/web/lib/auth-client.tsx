"use client";

import type { PropsWithChildren } from "react";
import React, {
  useEffect,
  createContext,
  Suspense,
  useCallback,
  useContext,
  useState,
} from "react";
import { ProgressLoader } from "nextjs-progressloader";
import GetVerifiedModal from "../app/components/get-verified-modal";

const GlobalState = createContext<{
  token?: string;
  setToken: (token?: string) => void;
  toggleIsGetVerifiedModalOpen: () => void;
}>({
  setToken: () => null,
  toggleIsGetVerifiedModalOpen: () => null,
});

export function useToken() {
  const { token } = useContext(GlobalState);
  return token;
}

export function useToggleGetVerifiedModal() {
  const { toggleIsGetVerifiedModalOpen } = useContext(GlobalState);
  return toggleIsGetVerifiedModalOpen;
}

export function GlobalStateWrapper({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string>();
  const [isGetVerifiedModalOpen, setIsGetVerifiedModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    fetch(`/api/auth/email`, {
      credentials: "include",
    })
      .then(async (res) => {
        if (res.ok) setToken(await res.text());
      })
      .catch(console.error);
  }, []);
  return (
    <GlobalState.Provider
      value={{
        token,
        setToken,
        toggleIsGetVerifiedModalOpen: () => {
          setIsGetVerifiedModalOpen((prev) => !prev);
        },
      }}
    >
      <GetVerifiedModal
        close={() => {
          setIsGetVerifiedModalOpen(false);
        }}
        isOpen={isGetVerifiedModalOpen}
        token={token}
      />
      <Suspense>
        <ProgressLoader color="#F45B69" showSpinner={false} />
      </Suspense>
      {children}
    </GlobalState.Provider>
  );
}

export function useSignUpWithEmail() {
  const { setToken } = useContext(GlobalState);
  return useCallback(
    async (
      email: string,
      password: string,
      name: string,
      captchaToken: string,
    ) => {
      const res = await fetch(`/api/auth/email`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          name,
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
  const { setToken } = useContext(GlobalState);
  return useCallback(
    async (email: string, password: string, captchaToken: string) => {
      const res = await fetch(`/api/auth/email`, {
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
  const { setToken } = useContext(GlobalState);
  return useCallback(async () => {
    const res = await fetch(`/api/auth/email`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      setToken(undefined);
    }
  }, [setToken]);
}
