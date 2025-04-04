"use client";

import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import React, {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ProgressLoader } from "nextjs-progressloader";
import { NavItem } from "@/app/(dashboard)/type";
import GetVerifiedModal from "../app/components/get-verified-modal";

const GlobalState = createContext<{
  openSubPage?: NavItem;
  setOpenSubPage: Dispatch<SetStateAction<NavItem | undefined>>;
  token?: string | null;
  setToken: Dispatch<SetStateAction<string | null | undefined>>;
  toggleIsGetVerifiedModalOpen: () => void;
}>({
  setToken: () => null,
  toggleIsGetVerifiedModalOpen: () => null,
  setOpenSubPage: () => null,
});

export function useToken() {
  const { token } = useContext(GlobalState);
  return token;
}

export function useSubPage() {
  const { openSubPage, setOpenSubPage } = useContext(GlobalState);
  return {
    openSubPage,
    setOpenSubPage,
  };
}

export function useToggleGetVerifiedModal() {
  const { toggleIsGetVerifiedModalOpen } = useContext(GlobalState);
  return toggleIsGetVerifiedModalOpen;
}

export function GlobalStateWrapper({ children }: PropsWithChildren) {
  const [openSubPage, setOpenSubPage] = useState<NavItem>();
  const [token, setToken] = useState<string | null>();
  const [isGetVerifiedModalOpen, setIsGetVerifiedModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    fetch(`/api/auth/email`, {
      credentials: "include",
    })
      .then(async (res) => {
        if (res.ok) setToken(await res.text());
        else setToken(null);
      })
      .catch(() => {
        setToken(null);
      });
  }, []);
  return (
    <GlobalState.Provider
      value={{
        openSubPage,
        setOpenSubPage,
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
