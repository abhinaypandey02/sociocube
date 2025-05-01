"use client";
import { User } from "@phosphor-icons/react";
import { GraphQLError } from "graphql/error";
import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { Button } from "@/components/button";
import Form from "@/components/form";
import ImageUploader from "@/components/image-uploader";
import { Input } from "@/components/input";
import categories from "@/constants/categories";
import { BIO_MAX_LENGTH, NAME_MAX_LENGTH } from "@/constants/constraints";
import genders from "@/constants/genders";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { useUser } from "@/lib/auth-client";
import { UPDATE_USER } from "@/lib/mutations";
import { getProxiedForInstagramURL } from "@/lib/utils";

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
  showCreatorSteps,
}: {
  defaultValues: FormFields;
  nextStep: () => void;
  fallbackToStep: () => void;
  showCreatorSteps: boolean;
}) {
  const [user, setUser] = useUser();
  const form = useForm<FormFields>({ defaultValues });
  const [missingPhoto, setMissingPhoto] = useState(false);
  const [updateBasicDetails, { loading }] = useAuthMutation(UPDATE_USER);
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (showCreatorSteps && (!data.gender || !data.category)) return;
    if (!user?.photo) {
      setMissingPhoto(true);
      return;
    }
    nextStep();
    setUser(
      (prev) =>
        prev && {
          ...prev,
          name: data.name,
        },
    );
    updateBasicDetails({
      updatedUser: {
        name: data.name,
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
      <ImageUploader
        className="mx-auto flex size-28 items-center justify-center overflow-hidden rounded-full border"
        onNewURL={(url) => {
          setUser((prev) => (!prev ? prev : { ...prev, photo: url }));
        }}
        defaultPhoto={getProxiedForInstagramURL(user?.photo)}
      >
        <User size={40} />
      </ImageUploader>
      {missingPhoto ? (
        <div className="text-center text-xs text-red-500">
          Image is required to continue
        </div>
      ) : null}
      <Input
        className="block mt-3"
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
      <Button
        className="mb-5! mt-8! ml-auto block"
        loading={loading}
        type="submit"
      >
        Next
      </Button>
    </Form>
  );
}
