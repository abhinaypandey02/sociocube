"use client";
import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import Form from "@/components/form";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { UPDATE_INSTAGRAM_USERNAME } from "@/lib/mutations";
import type { UpdateInstagramUsernameMutation } from "@/__generated__/graphql";

export default function SocialsStatus({
  connections,
  nextStep,
  setBasicDetails,
}: {
  connections: { instagram: boolean };
  nextStep: () => void;
  redirectURL: string | null;
  setBasicDetails: (
    details: UpdateInstagramUsernameMutation["updateInstagramUsername"],
  ) => void;
}) {
  const form = useForm<{ username: string }>();
  const router = useRouter();
  const connected = connections.instagram;
  const [updateInstagramUsername, { loading }] = useAuthMutation(
    UPDATE_INSTAGRAM_USERNAME,
  );
  const handleManualConnection = (data: { username: null | string }) => {
    if (data.username) {
      updateInstagramUsername({ username: data.username.trim().toLowerCase() })
        .then((res) => {
          if (res.data?.updateInstagramUsername) {
            setBasicDetails(res.data.updateInstagramUsername);
            nextStep();
            router.refresh();
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
            label="Username"
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
