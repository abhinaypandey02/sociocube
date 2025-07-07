"use client";

import React, {
  PropsWithChildren,
  useReducer,
  createContext,
  Dispatch,
  useEffect,
  useContext,
} from "react";

// --- Types ---
interface State {
  _?: boolean;
}

export enum PersistedActionType {
  SET_STATE,
}

type Action = {
  type: PersistedActionType.SET_STATE;
  payload?: State;
};

interface GlobalContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

// --- Initial State ---
const initialState: State = {};

// --- Reducer ---
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case PersistedActionType.SET_STATE:
      return { ...action.payload };
    default:
      return state;
  }
};

// --- Wrapper Reducer with Persistence ---
const reducerWrapper = (state: State, action: Action): State => {
  const updatedState = reducer(state, action);

  // Avoid persisting on SET_STATE to prevent duplicate writes
  if (action.type !== PersistedActionType.SET_STATE) {
    try {
      localStorage.setItem("state", JSON.stringify(updatedState));
    } catch (error) {
      console.error("Failed to save state:", error);
    }
  }

  return updatedState;
};

// --- Context ---
const State = createContext<GlobalContextType>({
  state: initialState,
  dispatch: () => {
    throw new Error("Dispatch called outside of GlobalState provider");
  },
});

// --- Provider Component ---
export function PersistedStateWrapper({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducerWrapper, initialState);

  useEffect(() => {
    try {
      const stateJSON = localStorage.getItem("state");
      if (!stateJSON) return;

      const parsed = JSON.parse(stateJSON);
      if (typeof parsed === "object" && parsed !== null) {
        dispatch({ type: PersistedActionType.SET_STATE, payload: parsed });
      }
    } catch (err) {
      console.error("Failed to load state from localStorage:", err);
    }
  }, []);

  return (
    <State.Provider value={{ state, dispatch }}>{children}</State.Provider>
  );
}

// --- Optional: Helper Hook ---
export const usePersistedState = () => {
  const context = useContext(State);
  if (!context) {
    throw new Error(
      "usePersistedState must be used within PersistedStateWrapper",
    );
  }
  return context;
};
