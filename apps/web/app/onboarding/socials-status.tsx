"use client";
import React from "react";
import { Button } from "ui/button";
import Image from "next/image";
import { Input } from "ui/input";
import { useForm } from "react-hook-form";
import Form from "ui/form";
import { handleGQLErrors, useAuthMutation } from "../../lib/apollo-client";
import { UPDATE_INSTAGRAM_USERNAME } from "../../lib/mutations";

export default function SocialsStatus({
  connections,
  nextStep,
}: {
  connections: { instagram: boolean };
  nextStep: () => void;
  redirectURL: string | null;
}) {
  const form = useForm<{ username: string }>();
  const connected = connections.instagram;
  const [updateInstagramUsername, { loading }] = useAuthMutation(
    UPDATE_INSTAGRAM_USERNAME,
  );
  const handleManualConnection = (data: { username: null | string }) => {
    if (data.username) {
      updateInstagramUsername({ username: data.username.trim().toLowerCase() })
        .then((res) => {
          if (res.data?.updateInstagramUsername) {
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
    </>
  );
}
