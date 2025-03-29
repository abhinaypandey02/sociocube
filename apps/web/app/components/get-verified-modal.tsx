"use client";
import React from "react";
import { ArrowSquareOut, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { Button } from "ui/button";
import Modal from "../../components/modal";
import { INSTAGRAM_AUTHORIZATION_URL } from "../api/auth/instagram/utils";

export default function GetVerifiedModal({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) {
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
        <a className="mt-5" href={INSTAGRAM_AUTHORIZATION_URL}>
          <Button className="mx-auto flex items-center gap-2">
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
