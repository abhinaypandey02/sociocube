"use client";

import { ProgressLoader } from "nextjs-progressloader";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import React, { createContext, Suspense, useState } from "react";

import {
  GetCurrentUserQuery,
  GetSubscriptionQuery,
} from "@/__generated__/graphql";
import { GlobalModals, OpenModalParams } from "@/state/modals";

const initialState = {
  userState: getDefaultState<CurrentUser>(),
  tokenState: getDefaultState<string | null | undefined>(),
  subscriptionState: getDefaultState<Subscription>(),
  setGlobalModal: (_: OpenModalParams) => {},
};

export const GlobalState = createContext<typeof initialState>(initialState);

export function GlobalStateWrapper({ children }: PropsWithChildren) {
  const tokenState = useState<string | null>();
  const userState = useState<CurrentUser>();
  const [globalModal, setGlobalModal] = useState<OpenModalParams>();
  const subscriptionState = useState<Subscription>();

  return (
    <GlobalState.Provider
      value={{
        userState,
        subscriptionState,
        tokenState,
        setGlobalModal,
      }}
    >
      <GlobalModals globalModal={globalModal} setGlobalModal={setGlobalModal} />
      <Suspense>
        <ProgressLoader color="#5b9364" showSpinner={false} />
      </Suspense>
      {children}
    </GlobalState.Provider>
  );
}

type CurrentUser = GetCurrentUserQuery["user"];
type Subscription =
  | {
      existing: GetSubscriptionQuery["getSubscription"];
      link?: string | null;
    }
  | undefined;

type ReactState<T> = [T, Dispatch<SetStateAction<T>>];
function getDefaultState<T>(v?: T) {
  return [v, () => null] as ReactState<T>;
}
