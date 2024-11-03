"use client";
import type { ChangeEvent } from "react";
import React, { useRef, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Input } from "ui/input";
import { Button } from "ui/button";
import Image from "next/image";
import categories from "commons/categories";
import genders from "commons/genders";
import Form from "ui/form";
import { User } from "@phosphor-icons/react";
import { useAuthMutation } from "../../lib/apollo-client";
import { UPDATE_ONBOARDING_BASIC_DETAILS } from "../../lib/mutations";
import type { StorageFile } from "../../__generated__/graphql";

export default function OnboardingBasicDetailsForm({
  defaultValues,
  nextStep,
  photoUpload,
}: {
  defaultValues: {
    name: string;
    photo: string;
    bio: string;
    gender: string;
    category: string;
    dob: string;
  };
  nextStep: () => void;
  photoUpload: StorageFile;
}) {
  const form = useForm({ defaultValues });
  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const [profilePicture, setProfilePicture] = useState<File>();
  const [uploadingPicture, setUploadingPicture] = useState(false);
  const [updateBasicDetails, { loading }] = useAuthMutation(
    UPDATE_ONBOARDING_BASIC_DETAILS,
  );

  const displayURL = profilePicture
    ? URL.createObjectURL(profilePicture)
    : defaultValues.photo;

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    if (profilePicture) {
      setUploadingPicture(true);
      const res = await fetch(photoUpload.uploadURL, {
        method: "PUT",
        body: profilePicture,
      });
      if (!res.ok) return;
    }
    const res = await updateBasicDetails({
      data: {
        name: data.name,
        imageURL: profilePicture ? photoUpload.url : data.photo,
        bio: data.bio,
        category: data.category,
        gender: data.gender,
        dob: data.dob,
      },
    });
    if (res.data?.updateOnboardingBasicDetails) {
      nextStep();
    }
  };
  return (
    <Form
      className=" space-y-3"
      form={form}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <button
        className="mx-auto mb-3 flex size-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border "
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
      <Input
        className="block"
        label="Full name"
        name="name"
        placeholder="Enter your name"
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
      />
      <Input
        className="block"
        label="Date of birth"
        name="dob"
        placeholder="Date of birth"
        type="date"
      />
      <input
        className="hidden"
        onChange={(e) => {
          const event = e as unknown as ChangeEvent<HTMLInputElement>;
          const file = event.target.files?.[0];
          if (file) setProfilePicture(file);
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
