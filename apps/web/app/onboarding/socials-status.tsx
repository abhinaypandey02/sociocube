"use client";
import React from "react";
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { Button } from "ui/button";
import Image from "next/image";
import { ShieldCheck } from "@phosphor-icons/react";
import type { AuthScopes } from "../../__generated__/graphql";
import { completedOnboardingScopes } from "./utils";

export default function SocialsStatus({
  scopes,
  nextStep,
}: {
  scopes: AuthScopes[];
  nextStep: () => void;
}) {
  const connected = completedOnboardingScopes(scopes).length > 0;
  return (
    <>
      <Image
        alt="instagram"
        className="mx-auto"
        height={150}
        src="/instagram-logo.png"
        width={266}
      />
      {connected ? (
        <Button className=" mx-auto" onClick={nextStep}>
          Next
        </Button>
      ) : (
        <a href="/_auth/instagram">
          <Button className="mx-auto flex items-center gap-2">
            Connect now <ArrowSquareOut weight="bold" />
          </Button>
        </a>
      )}
      <div className="mt-3 flex items-center justify-center gap-2 text-center text-xs font-light italic leading-none">
        <ShieldCheck size={16} weight="bold" />{" "}
        {connected
          ? "You have already linked Instagram"
          : "100 % secure and safe."}
      </div>

      {!connected && (
        <ul className="mt-36 space-y-2 text-justify text-xs text-gray-600">
          <li>
            <strong>Secure and Trusted:</strong>{" "}
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
          <li>
            <strong>Official Instagram Integration:</strong>{" "}
            <em>
              This process is powered by Instagram’s official API, ensuring your
              data is handled securely and transparently.
            </em>
          </li>
        </ul>
      )}
    </>
  );
}
