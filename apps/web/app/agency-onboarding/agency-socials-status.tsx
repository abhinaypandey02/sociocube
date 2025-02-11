"use client";
import React from "react";
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { Button } from "ui/button";
import Image from "next/image";
import { SealCheck } from "@phosphor-icons/react";
import { Input } from "ui/input";
import { useForm } from "react-hook-form";
import Form from "ui/form";
import { handleGQLErrors, useAuthMutation } from "../../lib/apollo-client";
import { UPDATE_AGENCY_ONBOARDING_INSTAGRAM_USERNAME } from "../../lib/mutations";
import { Route } from "../../constants/routes";

export default function AgencySocialsStatus({
  connections,
  nextStep,
  redirectURL,
}: {
  connections: { instagram: boolean };
  nextStep: () => void;
  redirectURL: string | null;
}) {
  const form = useForm<{ username: string }>();
  const connected = connections.instagram;
  const [updateInstagramUsername, { loading }] = useAuthMutation(
    UPDATE_AGENCY_ONBOARDING_INSTAGRAM_USERNAME,
  );
  const handleManualConnection = (data: { username: null | string }) => {
    if (data.username) {
      updateInstagramUsername({ username: data.username.trim().toLowerCase() })
        .then((res) => {
          if (res.data?.addAgencyInstagramUsername) {
            nextStep();
          }
        })
        .catch(handleGQLErrors);
    }
  };
  return (
    <>
      <Image
        alt="instagram"
        className="mx-auto "
        height={103}
        src="/instagram-logo.png"
        width={173}
      />
      {connected ? (
        <Button className=" mx-auto" onClick={nextStep}>
          Next
        </Button>
      ) : (
        <a
          href={`/_auth/instagram-agency?redirectURL=${Route.Onboarding}${
            redirectURL ? `%3FredirectURL%3D${redirectURL}` : ""
          }`}
        >
          <Button className="mx-auto flex items-center gap-2">
            Verify Account <ArrowSquareOut weight="bold" />
          </Button>
        </a>
      )}
      <div className="mt-3 flex items-center justify-center gap-2 text-center text-xs font-light italic leading-none">
        {!connected && (
          <SealCheck className="text-accent" size={16} weight="fill" />
        )}
        {connected
          ? "You have already linked Instagram"
          : "Get a verification badge on your profile."}
      </div>

      {!connected && (
        <div className="relative my-10">
          <hr />
          <small className="absolute -top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-bg px-3">
            or
          </small>
        </div>
      )}
      {!connected && (
        <Form
          className="flex items-end gap-3"
          form={form}
          onSubmit={form.handleSubmit(handleManualConnection)}
        >
          <Input
            className="grow"
            label="Username connection"
            name="username"
            placeholder="Instagram Username"
          />
          <Button loading={loading} type="submit">
            Connect
          </Button>
        </Form>
      )}
      {!connected && (
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
      )}
    </>
  );
}
