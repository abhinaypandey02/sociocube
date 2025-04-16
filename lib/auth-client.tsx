"use client";

import { ProgressLoader } from "nextjs-progressloader";
import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import React, {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useState,
} from "react";

import { GetCurrentUserQuery } from "@/__generated__/graphql";
import { NavItem } from "@/app/(dashboard)/type";
import GetVerifiedModal from "@/app/(public)/components/get-verified-modal";

type CurrentUser = GetCurrentUserQuery["user"];

const GlobalState = createContext<{
  openSubPage?: NavItem;
  setOpenSubPage: Dispatch<SetStateAction<NavItem | undefined>>;
  token?: string | null;
  setToken: Dispatch<SetStateAction<string | null | undefined>>;
  user?: CurrentUser;
  setUser: Dispatch<SetStateAction<CurrentUser>>;
  toggleIsGetVerifiedModalOpen: () => void;
}>({
  setToken: () => null,
  setUser: () => null,
  toggleIsGetVerifiedModalOpen: () => null,
  setOpenSubPage: () => null,
});

export function useUser() {
  const { user, setUser } = useContext(GlobalState);
  return [user, setUser] as const;
}

export function useToken() {
  const { token } = useContext(GlobalState);
  return token;
}
export function useSetToken() {
  const { setToken } = useContext(GlobalState);
  return setToken;
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
  const [user, setUser] = useState<CurrentUser>();
  const [isGetVerifiedModalOpen, setIsGetVerifiedModalOpen] =
    useState<boolean>(false);

  return (
    <GlobalState.Provider
      value={{
        user,
        setUser,
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
      const res = await fetch(`/api/email`, {
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
  const { setToken } = useContext(GlobalState);
  return useCallback(async () => {
    const res = await fetch(`/api/email`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      setToken(undefined);
    }
  }, [setToken]);
}
