"use client";
import { useEffect } from "react";

import { GetCurrentUserQuery } from "@/__generated__/graphql";
import { MemoryActionType, useMemoryState } from "@/state/memory";

export default function AuthApply({ data }: { data?: GetCurrentUserQuery }) {
  const { dispatch } = useMemoryState();
  useEffect(() => {
    if (data !== undefined)
      dispatch({
        type: MemoryActionType.SET_ABSOLUTE_USER,
        payload: data.user || null,
      });
  }, [data]);
  return null;
}
