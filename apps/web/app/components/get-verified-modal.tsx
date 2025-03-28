"use client";
import React, { useEffect, useState } from "react";
import { ArrowSquareOut, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { Button } from "ui/button";
import Modal from "../../components/modal";

export default function GetVerifiedModal({
  isOpen,
  close,
  token,
}: {
  isOpen: boolean;
  close: () => void;
  token: string | undefined;
}) {
  const [redirectURL, setRedirectURL] = useState<string | null>(null);
  useEffect(() => {
    if (token)
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/instagram`, {
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.text())
        .then(setRedirectURL)
        .catch(() => {
          setRedirectURL(null);
        });
  }, [token]);
  return (
    <Modal close={close} open={isOpen}>
      <div className="flex flex-col items-center gap-2 pt-9">
        <SealCheck className="text-2xl text-accent" weight="fill" />
        <h3 className="font-poppins text-xl font-semibold">Get verified</h3>
        <p className="text-center text-xs">
          Complete your verification process to get a verification badge on your
          profile. This lets brands know that you are a verified instagram
          account and builds trust.
        </p>
        <a className="mt-5" href={redirectURL || "#"}>
          <Button
            className="mx-auto flex items-center gap-2"
            disabled={!redirectURL}
          >
            Verify Account <ArrowSquareOut weight="bold" />
          </Button>
        </a>
        <ul className="mt-16 space-y-2 text-justify text-xs text-gray-600">
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
