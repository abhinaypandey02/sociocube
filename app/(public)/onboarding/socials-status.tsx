"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { UpdateInstagramUsernameMutation } from "@/__generated__/graphql";
import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { UPDATE_INSTAGRAM_USERNAME } from "@/lib/mutations";

interface FormFields {
  instagram?: string;
}

export default function SocialsStatus({
  defaultValues,
  nextStep,
  setBasicDetails,
  isActive,
  isCreator,
}: {
  defaultValues: FormFields;
  nextStep: () => void;
  isActive: boolean;
  setBasicDetails: (
    details: UpdateInstagramUsernameMutation["updateInstagramUsername"],
  ) => void;
  isCreator: boolean;
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
      {!isCreator && (
        <Button className="mt-6" invert onClick={nextStep}>
          Skip
        </Button>
      )}
    </>
  );
}
