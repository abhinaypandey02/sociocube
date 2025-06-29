"use client";

import { Trash } from "@phosphor-icons/react";
import { SignOut } from "@phosphor-icons/react/dist/ssr";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import DashboardWrapper from "@/app/(dashboard)/components/dashboard-wrapper";
import { Button } from "@/components/button";
import Modal from "@/components/modal";
import { Route } from "@/constants/routes";
import { useAuthMutation } from "@/lib/apollo-client";
import { useLogout } from "@/lib/auth-client";
import { DELETE_USER } from "@/lib/mutations";
import { cn } from "@/lib/utils";
export default function SettingsPage() {
  const logout = useLogout();
  const [deleteUser, { loading }] = useAuthMutation(DELETE_USER, {
    onCompleted: () => {
      logout();
      setConfirmDeleteUser(false);
      toast.success("Account deleted successfully.");
    },
  });
  const [confirmDeleteUser, setConfirmDeleteUser] = useState(false);

  const options = useMemo(
    () => [
      {
        icon: SignOut,
        title: "Logout",
        onClick: logout,
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
      <Modal
        open={confirmDeleteUser}
        close={() => setConfirmDeleteUser(false)}
        title={"Delete your account?"}
      >
        <Button loading={loading} onClick={() => deleteUser()}>
          Confirm
        </Button>
      </Modal>
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
