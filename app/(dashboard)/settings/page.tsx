"use client";

import { SignOut } from "@phosphor-icons/react/dist/ssr";

import { useLogout } from "@/lib/auth-client";
export default function SettingsPage() {
  const logout = useLogout();
  return (
    <div className="divide-y">
      <button
        className="py-3 px-4 text-start text-xl hover:bg-gray-100 w-full rounded-xl flex items-center gap-2"
        onClick={logout}
      >
        <SignOut size={24} />
        Logout
      </button>
    </div>
  );
}
