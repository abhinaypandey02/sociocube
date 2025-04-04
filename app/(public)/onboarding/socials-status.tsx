"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import Form from "@/components/form";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { UPDATE_INSTAGRAM_USERNAME } from "@/lib/mutations";
import type { UpdateInstagramUsernameMutation } from "@/__generated__/graphql";

interface FormFields {
  instagram?: string;
}

export default function SocialsStatus({
  defaultValues,
  nextStep,
  setBasicDetails,
  isActive,
}: {
  defaultValues: FormFields;
  nextStep: () => void;
  redirectURL: string | null;
  isActive: boolean;
  setBasicDetails: (
    details: UpdateInstagramUsernameMutation["updateInstagramUsername"],
  ) => void;
}) {
  const form = useForm({ defaultValues });
  const [updateInstagramUsername, { loading }] = useAuthMutation(
    UPDATE_INSTAGRAM_USERNAME,
  );
  const handleManualConnection = (data: FormFields) => {
    if (data.instagram) {
      if (data.instagram !== defaultValues.instagram)
        updateInstagramUsername({
          username: data.instagram.trim().toLowerCase(),
        })
          .then((res) => {
            if (res.data?.updateInstagramUsername) {
              setBasicDetails(res.data.updateInstagramUsername);
              nextStep();
            }
          })
          .catch(handleGQLErrors);
      else nextStep();
    }
  };
  useEffect(() => {
    form.setFocus("instagram");
  }, [isActive]);
  return (
    <>
      <Image
        alt="instagram"
        className="mx-auto "
        height={103}
        src="/instagram-logo.png"
        width={173}
      />
      <Form
        className="flex items-end gap-3"
        form={form}
        onSubmit={form.handleSubmit(handleManualConnection)}
      >
        <Input
          className="grow"
          label="Username"
          name="instagram"
          placeholder="Instagram Username"
        />
        <Button loading={loading} type="submit">
          Connect
        </Button>
      </Form>
    </>
  );
}
