"use client";

import { useRouter } from "next/navigation";
import { useLogout } from "../lib/auth-client";

export default function Logout() {
  const router = useRouter();
  const logout = useLogout();
  return (
    <button
      onClick={async () => {
        await logout().then(() => {
          router.refresh();
        });
      }}
    >
      Logout
    </button>
  );
}
