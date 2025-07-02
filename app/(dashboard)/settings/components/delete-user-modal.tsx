import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import Modal from "@/components/modal";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { useLogout } from "@/lib/auth";
import { DELETE_USER } from "@/lib/mutations";

interface FormValues {
  password: string;
  prompt: string;
}

export default function DeleteUserModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const logout = useLogout();
  const form = useForm<FormValues>();

  const [deleteUser, { loading }] = useAuthMutation(DELETE_USER, {
    onCompleted: () => {
      logout();
      setIsOpen(false);
      toast.success("Account deleted successfully.");
    },
  });

  function handleSubmit(data: FormValues) {
    deleteUser({
      password: data.password,
    }).catch(handleGQLErrors);
  }

  return (
    <Modal
      open={isOpen}
      close={() => setIsOpen(false)}
      title={"Delete your account?"}
    >
      <Form className={"space-y-4 mt-4"} form={form} onSubmit={handleSubmit}>
        <Input
          type={"password"}
          placeholder={"Enter your password"}
          label={"Your password (Skip if not set)"}
          name={"password"}
        />
        <Input
          rules={{
            validate: (value) => value === "delete my account",
          }}
          placeholder={"delete my account"}
          label={'Type "delete my account" to confirm'}
          name={"prompt"}
        />
        <Button type={"submit"} className={"mt-4"} loading={loading}>
          Confirm
        </Button>
      </Form>
    </Modal>
  );
}
