import React, { Dispatch, SetStateAction } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/button";
import Modal from "@/components/modal";
import { useAuthMutation } from "@/lib/apollo-client";
import { useLogout } from "@/lib/auth-client";
import { DELETE_USER } from "@/lib/mutations";

export default function DeleteUserModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const logout = useLogout();

  const [deleteUser, { loading }] = useAuthMutation(DELETE_USER, {
    onCompleted: () => {
      logout();
      setIsOpen(false);
      toast.success("Account deleted successfully.");
    },
  });
  return (
    <Modal
      open={isOpen}
      close={() => setIsOpen(false)}
      title={"Delete your account?"}
    >
      <Button loading={loading} onClick={() => deleteUser()}>
        Confirm
      </Button>
    </Modal>
  );
}
