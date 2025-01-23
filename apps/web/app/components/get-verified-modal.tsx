"use client";
import React, { useState } from "react";
import { ArrowSquareOut, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { Button } from "ui/button";
import Modal from "../../components/modal";
import { Route } from "../../constants/routes";

export default function GetVerifiedModal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal
        close={() => {
          setIsOpen(false);
        }}
        open={isOpen}
      >
        <div className="flex flex-col items-center gap-2 py-9">
          <SealCheck className="text-2xl text-accent" weight="fill" />
          <h3 className="font-poppins text-xl font-semibold">Get verified</h3>
          <p className="text-center text-xs">
            Complete your verification process to get a verification badge on
            your profile. This lets brands know that you are a verified
            instagram account and builds trust.
          </p>
          <a
            className="mt-5"
            href={`/_auth/instagram?redirectURL=${Route.Onboarding}`}
          >
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
                We never see or store your Instagram password. All
                authentication happens directly through Instagram’s servers.
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
      <button
        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 max-lg:hidden"
        onClick={() => {
          setIsOpen(true);
        }}
        type="button"
      >
        Get verified <SealCheck className="text-accent" />
      </button>
      <button
        className="-mx-3 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-gray-900 hover:bg-gray-50 hover:underline hover:underline-offset-8  lg:hidden "
        onClick={() => {
          setIsOpen(true);
        }}
        type="button"
      >
        Get verified <SealCheck className="text-accent" />
      </button>
    </>
  );
}
