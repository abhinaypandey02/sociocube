"use client";
import type { ChangeEvent } from "react";
import React, { useRef, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Input } from "ui/input";
import { Button } from "ui/button";
import categories from "commons/categories";
import genders from "commons/genders";
import Form from "ui/form";
import { User } from "@phosphor-icons/react";
import Image from "next/image";
import { ALLOWED_IMAGE_TYPES, MAXIMUM_FILE_SIZE } from "commons/file";
import { toast } from "react-hot-toast";
import { handleGQLErrors, useAuthMutation } from "../../lib/apollo-client";
import { UPDATE_ONBOARDING_BASIC_DETAILS } from "../../lib/mutations";
import type { StorageFile } from "../../__generated__/graphql";

interface FormFields {
  name: string;
  photo: string;
  bio: string;
  gender?: string;
  category?: string;
}

export default function OnboardingBasicDetailsForm({
  defaultValues,
  nextStep,
  photoUpload,
}: {
  defaultValues: {
    name: string;
    photo: string;
    bio: string;
  };
  nextStep: () => void;
  photoUpload: StorageFile;
}) {
  const form = useForm<FormFields>({ defaultValues });
  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const [profilePicture, setProfilePicture] = useState<File>();
  const [uploadingPicture, setUploadingPicture] = useState(false);
  const [missingPhoto, setMissingPhoto] = useState(false);
  const [updateBasicDetails, { loading }] = useAuthMutation(
    UPDATE_ONBOARDING_BASIC_DETAILS,
  );

  const displayURL = profilePicture
    ? URL.createObjectURL(profilePicture)
    : defaultValues.photo;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!data.gender || !data.category) return;
    if (!data.photo && !profilePicture) {
      setMissingPhoto(true);
      return;
    }
    if (profilePicture) {
      setUploadingPicture(true);
      const res = await fetch(photoUpload.uploadURL, {
        method: "PUT",
        body: profilePicture,
      });
      if (!res.ok) return;
    }
    updateBasicDetails({
      basicDetails: {
        name: data.name,
        imageURL: profilePicture ? photoUpload.url : data.photo,
        bio: data.bio,
        category: data.category,
        gender: data.gender,
      },
    })
      .then((res) => {
        if (res.data?.updateOnboardingBasicDetails) {
          nextStep();
        }
      })
      .catch(handleGQLErrors);
  };
  return (
    <Form
      className=" space-y-3"
      form={form}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <button
        className="mx-auto mb-3 flex size-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border object-cover "
        onClick={() => ref.current?.click()}
        type="button"
      >
        {displayURL ? (
          <Image
            alt={defaultValues.name}
            className="size-full object-cover"
            height={300}
            src={displayURL}
            width={300}
          />
        ) : (
          <User size={40} />
        )}
      </button>
      {missingPhoto ? (
        <div className="text-center text-xs text-red-500">
          Image is required to continue
        </div>
      ) : null}
      <Input
        className="block"
        label="Full name"
        name="name"
        placeholder="Enter your name"
        rules={{ required: true }}
      />
      <Input
        className="block"
        label="About you"
        name="bio"
        placeholder="Write a brief about you"
        textarea
      />
      <Input
        className="block"
        label="Category"
        name="category"
        options={categories.map(({ title }) => ({
          label: title,
          value: title,
        }))}
        placeholder="Select the category that best suits you"
        rules={{ required: true }}
      />
      <Input
        className="block"
        label="Gender"
        name="gender"
        options={genders.map((gender) => ({
          label: gender,
          value: gender,
        }))}
        placeholder="Select your gender"
        rules={{ required: true }}
      />
      <input
        accept={ALLOWED_IMAGE_TYPES.join(", ")}
        className="hidden"
        onChange={(e) => {
          const event = e as unknown as ChangeEvent<HTMLInputElement>;
          const file = event.target.files?.[0];
          if (file) {
            if (file.size > MAXIMUM_FILE_SIZE) {
              toast.error(
                `Maximum file size is ${MAXIMUM_FILE_SIZE / 1024 / 1024}mb`,
              );
            } else if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
              toast.error(`Only png and jpeg image types are allowed`);
            } else {
              setProfilePicture(file);
              setMissingPhoto(false);
            }
          }
        }}
        ref={ref}
        type="file"
      />
      <Button
        className="!mb-5 !mt-8 ml-auto block"
        loading={loading || uploadingPicture}
        type="submit"
      >
        Next
      </Button>
    </Form>
  );
}
