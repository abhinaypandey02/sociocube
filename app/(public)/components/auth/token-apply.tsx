"use client";
import { useEffect } from "react";

import { useToken } from "@/state/hooks";

export default function TokenApply({ data: token }: { data?: string | null }) {
  const [, setToken] = useToken();
  useEffect(() => {
    if (token !== undefined) setToken(token);
  }, [token, setToken]);
  return null;
}
