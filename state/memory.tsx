"use client";

import { ProgressLoader } from "nextjs-progressloader";
import { PropsWithChildren, useContext, useReducer } from "react";
import React, { createContext, Suspense } from "react";

import {
  GetCurrentUserQuery,
  GetSubscriptionQuery,
} from "@/__generated__/graphql";
import { GlobalModals, OpenModalParams } from "@/state/modals";

export interface MemoryState {
  user?: CurrentUser;
  token?: string | null;
  subscription?: Subscription;
  globalModal?: OpenModalParams;
}

export enum MemoryActionType {
  SET_USER,
  SET_ABSOLUTE_USER,
  SET_TOKEN,
  SET_SUBSCRIPTION,
  SET_GLOBAL_MODAL,
}

type Action =
  | {
      type: MemoryActionType.SET_USER;
      payload: Partial<MemoryState["user"]>;
    }
  | {
      type: MemoryActionType.SET_ABSOLUTE_USER;
      payload: MemoryState["user"];
    }
  | {
      type: MemoryActionType.SET_TOKEN;
      payload: MemoryState["token"];
    }
  | {
      type: MemoryActionType.SET_SUBSCRIPTION;
      payload: MemoryState["subscription"];
    }
  | {
      type: MemoryActionType.SET_GLOBAL_MODAL;
      payload: MemoryState["globalModal"];
    };

const reducer = (state: MemoryState, action: Action): MemoryState => {
  switch (action.type) {
    case MemoryActionType.SET_USER:
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : state.user,
      };
    case MemoryActionType.SET_ABSOLUTE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case MemoryActionType.SET_SUBSCRIPTION:
      return {
        ...state,
        subscription: action.payload,
      };
    case MemoryActionType.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case MemoryActionType.SET_GLOBAL_MODAL:
      return {
        ...state,
        globalModal: action.payload,
      };
  }
};

const initialState: MemoryState = {};

const State = createContext({
  state: initialState,
  dispatch: (action: Action) => {},
});

export function MemoryStateWrapper({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <State.Provider value={{ state, dispatch }}>
      <GlobalModals />
      <Suspense>
        <ProgressLoader color="#5b9364" showSpinner={false} />
      </Suspense>
      {children}
    </State.Provider>
  );
}

export function useMemoryState() {
  return useContext(State);
}

type CurrentUser = GetCurrentUserQuery["user"];
type Subscription =
  | {
      existing: GetSubscriptionQuery["getSubscription"];
      link?: string | null;
    }
  | undefined;
