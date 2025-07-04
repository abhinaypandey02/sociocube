"use client";
import type { GraphQLError } from "graphql/error";
import React from "react";

import { Button } from "@/components/button";
import { useAuthMutation } from "@/lib/apollo-client";
import { handleGQLErrors } from "@/lib/apollo-client";
import { SEND_VERIFICATION_EMAIL } from "@/lib/mutations";
import { useUser } from "@/state/hooks";
import { GlobalModalProps } from "@/state/modals";

import Modal from "../../../components/modal";

const GetEmailVerificationModal = ({
  isOpen,
  onClose,
  message,
}: GlobalModalProps) => {
  const [user] = useUser();
  const [sendEmail, { data: success, loading }] = useAuthMutation(
    SEND_VERIFICATION_EMAIL,
  );

  return (
    <Modal title={"Verify Your Email"} close={onClose} open={isOpen}>
      {success ? (
        <p className="text-center italic text-green-600 mt-4 font-medium">
          A verification email has been sent to{" "}
          <span className="font-semibold">{user?.email}</span>. Please follow
          the steps to verify the email.
        </p>
      ) : (
        <p className="text-center italic text-primary mt-4 font-medium">
          {message}
        </p>
      )}

      <Button
        className="mx-auto mt-6"
        onClick={() => {
          try {
            if (!user) return;
            sendEmail();
          } catch (error) {
            handleGQLErrors(error as GraphQLError);
          }
        }}
        loading={loading}
        disabled={success ? true : false}
      >
        {success ? "Email Sent!" : "Send Verification Email"}
      </Button>
    </Modal>
  );
};

export default GetEmailVerificationModal;
