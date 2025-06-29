"use client";

import { ArrowsClockwise, Trash } from "@phosphor-icons/react";
import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { useMemo, useState } from "react";

import DashboardWrapper from "@/app/(dashboard)/components/dashboard-wrapper";
import ChangePasswordModal from "@/app/(dashboard)/settings/components/change-password-modal";
import DeleteUserModal from "@/app/(dashboard)/settings/components/delete-user-modal";
import { Route } from "@/constants/routes";
import { useLogout } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const logout = useLogout();

  const [confirmDeleteUser, setConfirmDeleteUser] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const options = useMemo(
    () => [
      {
        icon: SignOut,
        title: "Logout",
        onClick: logout,
      },
      {
        icon: ArrowsClockwise,
        title: "Change Password",
        onClick: () => setShowChangePassword(true),
      },
      {
        icon: Trash,
        title: "Delete account",
        onClick: () => setConfirmDeleteUser(true),
        className: "text-red-400",
      },
    ],
    [logout],
  );
  return (
    <DashboardWrapper
      backRoute={Route.Profile}
      title={"Settings"}
      activeKey={Route.Settings}
    >
      <DeleteUserModal
        isOpen={confirmDeleteUser}
        setIsOpen={setConfirmDeleteUser}
      />
      <ChangePasswordModal
        isOpen={showChangePassword}
        setIsOpen={setShowChangePassword}
      />
      <div className="">
        {options.map((option) => (
          <button
            key={option.title}
            className={cn(
              "py-3 px-4 text-start text-xl hover:bg-gray-100 w-full rounded-xl flex items-center gap-2",
              option.className,
            )}
            onClick={option.onClick}
          >
            <option.icon size={24} />
            {option.title}
          </button>
        ))}
      </div>
    </DashboardWrapper>
  );
}
