"use client";
import { User } from "@phosphor-icons/react";
import { GraphQLError } from "graphql/error";
import type { ChangeEvent } from "react";
import React, { useRef, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import type { StorageFile } from "@/__generated__/graphql";
import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import categories from "@/constants/categories";
import { BIO_MAX_LENGTH, NAME_MAX_LENGTH } from "@/constants/constraints";
import { ALLOWED_IMAGE_TYPES, MAXIMUM_FILE_SIZE } from "@/constants/file";
import genders from "@/constants/genders";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { useUser } from "@/lib/auth-client";
import { UPDATE_USER } from "@/lib/mutations";

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
  fallbackToStep,
  photoUpload,
  showCreatorSteps,
}: {
  defaultValues: FormFields;
  nextStep: () => void;
  fallbackToStep: () => void;
  photoUpload: StorageFile;
  showCreatorSteps: boolean;
}) {
  const [, setUser] = useUser();
  const form = useForm<FormFields>({ defaultValues });
  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const [profilePicture, setProfilePicture] = useState<File>();
  const [uploadingPicture, setUploadingPicture] = useState(false);
  const [missingPhoto, setMissingPhoto] = useState(false);
  const [updateBasicDetails, { loading }] = useAuthMutation(UPDATE_USER);
  const displayURL = profilePicture
    ? URL.createObjectURL(profilePicture)
    : defaultValues.photo;

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (showCreatorSteps && (!data.gender || !data.category)) return;
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
    nextStep();
    setUser(
      (prev) =>
        prev && {
          ...prev,
          name: data.name,
          photo: profilePicture ? photoUpload.url : defaultValues.photo,
        },
    );
    updateBasicDetails({
      updatedUser: {
        name: data.name,
        photo: profilePicture ? photoUpload.url : undefined,
        bio: data.bio,
        category: data.category || undefined,
        gender: data.gender,
      },
    }).catch((e) => {
      fallbackToStep();
      handleGQLErrors(e as GraphQLError);
    });
  };
  return (
    <Form
      className=" space-y-3"
      form={form}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <button
        className="mx-auto mb-3 flex size-28 items-center justify-center overflow-hidden rounded-full border object-cover "
        onClick={() => ref.current?.click()}
        type="button"
      >
        {displayURL ? (
          <img
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
        rules={{ required: true, maxLength: NAME_MAX_LENGTH }}
        maxLength={NAME_MAX_LENGTH}
      />
      <Input
        className="block"
        label={`About you${!showCreatorSteps ? "r brand" : ""}`}
        name="bio"
        placeholder="Write a brief about you"
        rows={showCreatorSteps ? 2 : 4}
        textarea
        maxLength={BIO_MAX_LENGTH}
        rules={{
          maxLength: BIO_MAX_LENGTH,
        }}
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
        rules={{ required: showCreatorSteps }}
      />
      {showCreatorSteps ? (
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
      ) : null}
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
        className="mb-5! mt-8! ml-auto block"
        loading={loading || uploadingPicture}
        type="submit"
      >
        Next
      </Button>
    </Form>
  );
}
