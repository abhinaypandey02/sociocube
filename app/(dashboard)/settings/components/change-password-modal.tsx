import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import Modal from "@/components/modal";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { CHANGE_PASSWORD } from "@/lib/mutations";

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [changePassword, { loading }] = useAuthMutation(CHANGE_PASSWORD, {
    onCompleted: () => {
      setIsOpen(false);
      form.reset();
      toast.success("Password updated successfully.");
    },
  });

  const form = useForm<FormValues>();

  function handleSubmit(data: FormValues) {
    changePassword({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    }).catch(handleGQLErrors);
  }

  return (
    <Modal
      open={isOpen}
      close={() => setIsOpen(false)}
      title={"Change your password"}
    >
      <Form className={"space-y-4 mt-4"} form={form} onSubmit={handleSubmit}>
        <Input
          type={"password"}
          placeholder={"Enter your old password"}
          label={"Old password"}
          name={"oldPassword"}
        />
        <Input
          type={"password"}
          placeholder={"Enter your new password"}
          label={"New password"}
          name={"newPassword"}
        />
        <Input
          type={"password"}
          rules={{
            validate: (value, formValues) => value === formValues.newPassword,
          }}
          placeholder={"Confirm your new password"}
          label={"Confirm password"}
          name={"confirmPassword"}
        />
        <Button type={"submit"} className={"mt-4"} loading={loading}>
          Confirm
        </Button>
      </Form>
    </Modal>
  );
}
