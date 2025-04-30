"use client";
import { getInstagramAuthorizationURL } from "@backend/(auth)/instagram/utils";
import { ArrowSquareOut, SealCheck } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";

import { Button } from "@/components/button";
import { useToken } from "@/lib/auth-client";

import Modal from "../../../components/modal";

export default function GetVerifiedModal({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const token = useToken();
  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          Get verified
          <SealCheck className="text-2xl text-primary" weight="fill" />
        </div>
      }
      close={close}
      open={isOpen}
    >
      <div className="space-y-2 py-9">
        <p className="text-center">
          Login with your instagram account to get verified.
        </p>
        <Button
          disabled={!token}
          onClick={() => {
            if (!token) return;
            setLoading(true);
            setTimeout(() => {
              window.location.href = getInstagramAuthorizationURL(token);
              setLoading(false);
            }, 1000);
          }}
          loading={loading}
          className="mx-auto flex items-center gap-2"
        >
          Verify Account <ArrowSquareOut weight="bold" />
        </Button>
        <ul className="mt-16 space-y-2 text-justify text-sm text-gray-600">
          <li>
            <strong>Official Instagram Integration:</strong>{" "}
            <em>
              The URL will have "https://instagram.com" ensuring a secure
              end-to-end encrypted connection.
            </em>
          </li>
          <li>
            <strong>No Passwords Shared:</strong>{" "}
            <em>
              We never see or store your Instagram password. All authentication
              happens directly through Instagram’s servers.
            </em>
          </li>
          <li>
            <strong>Basic Public Information Only:</strong>
            <em>
              {" "}
              We only request basic public information like your profile name,
              username, and follower count. Nothing private.
            </em>
          </li>
        </ul>
      </div>
    </Modal>
  );
}
