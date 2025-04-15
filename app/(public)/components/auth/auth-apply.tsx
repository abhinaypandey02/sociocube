"use client";
import { useEffect } from "react";

import { GetCurrentUserQuery } from "@/__generated__/graphql";
import { useUser } from "@/lib/auth-client";

export default function AuthApply({
  user,
}: {
  user: GetCurrentUserQuery["user"];
}) {
  const [, setUser] = useUser();
  useEffect(() => {
    console.log("SETTING");
    setUser(user);
  }, [user, setUser]);
  return null;
}
