"use client";
import { useEffect } from "react";

import { useSetToken } from "@/lib/auth-client";

export default function TokenApply({ token }: { token: string }) {
  const setToken = useSetToken();
  useEffect(() => {
    setToken(token);
  }, [token, setToken]);
  return null;
}
