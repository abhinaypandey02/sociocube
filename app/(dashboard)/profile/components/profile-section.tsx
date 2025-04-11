import Image from "next/image";
import React, { type ChangeEvent, useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import categories from "@/constants/categories";
import genders from "@/constants/genders";
import { getMeURL } from "@/constants/routes";
import { ageValidation } from "@/constants/validations";
import {
  handleGQLErrors,
  useAuthMutation,
  useAuthQuery,
} from "@/lib/apollo-client";
import { UPDATE_USER } from "@/lib/mutations";
import { IS_USERNAME_AVAILABLE } from "@/lib/queries";
import { getUsernameInputRules } from "@/lib/utils";

import type { AccountSectionData } from "./account-view";
import ContentTemplate from "./content-template";

export default function ProfileSection({ data }: { data: AccountSectionData }) {
  const form = useForm({
    defaultValues: data,
  });
  const [localFile, setLocalFile] = useState<File | null>(null);
  const [saveUserMutation] = useAuthMutation(UPDATE_USER);
  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const handleSave = useCallback(
    (field: keyof AccountSectionData) => async () => {
      if (!(await form.trigger())) return false;
      await saveUserMutation({
        updatedUser: {
          [field]: form.getValues(field) || undefined,
        },
      }).catch(handleGQLErrors);
      return true;
    },
    [form.getValues, saveUserMutation],
  );
  const uploadPicture = () =>
    fetch(data.pictureUploadURL.uploadURL, {
      method: "PUT",
      body: localFile,
    }).then(() => {
      setLocalFile(null);
    });

  const [isUsernameAvailable] = useAuthQuery(IS_USERNAME_AVAILABLE);
  const photoValue = form.watch("photo");
  return (
    <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
      <input
        className="hidden"
        onChange={(e) => {
          const event = e as unknown as ChangeEvent<HTMLInputElement>;
          const file = event.target.files?.[0];
          if (file) {
            setLocalFile(file);
            form.setValue("photo", URL.createObjectURL(file));
          }
        }}
        ref={ref}
        type="file"
      />
      <Form
        className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none"
        form={form}
      >
        <ContentTemplate
          description="Fill the basic details about yourself!"
          items={[
            {
              label: "Picture",
              value: data.photo && (
                <img
                  alt={data.name || ""}
                  className="mt-6 rounded-md"
                  height={200}
                  src={`${data.photo}?${new Date().toISOString()}`}
                  width={200}
                />
              ),
              editComponent: (
                <div>
                  {photoValue ? (
                    <Image
                      alt={data.name || ""}
                      className="mt-6 rounded-md"
                      height={200}
                      src={photoValue}
                      width={200}
                    />
                  ) : null}
                  <div className="mt-3 flex w-full gap-3">
                    <Button
                      className="w-full"
                      onClick={() => {
                        ref.current?.click();
                      }}
                    >
                      {photoValue ? "Browse" : "Add photo"}
                    </Button>
                    {photoValue ? (
                      <Button
                        className=" w-full"
                        invert
                        onClick={() => {
                          form.setValue("photo", "");
                          setLocalFile(null);
                        }}
                      >
                        Delete
                      </Button>
                    ) : null}
                  </div>
                </div>
              ),
              onSubmit: async () => {
                if (localFile) {
                  await uploadPicture();
                  form.setValue("photo", data.pictureUploadURL.url);
                } else {
                  form.setValue("photo", "");
                }
                await handleSave("photo")();
                return true;
              },
            },
            {
              label: "Name",
              value: data.name || "",
              editComponent: <Input name="name" />,
              onSubmit: handleSave("name"),
            },
            {
              label: "Username",
              value: data.username ? getMeURL(data.username, true) : "",
              editComponent: (
                <Input
                  error={form.formState.errors.username?.message}
                  name="username"
                  onChange={() => {
                    form.clearErrors();
                  }}
                  rules={getUsernameInputRules(async (username: string) => {
                    const result = await isUsernameAvailable({ username });
                    return Boolean(result.data?.isUsernameAvailable);
                  })}
                  suffix=".sociocube.me"
                />
              ),
              onSubmit: handleSave("username"),
            },
            {
              label: "Contact number",
              value: data.phone || "",
              editComponent: <Input name="phone" type="tel" />,
              onSubmit: handleSave("phone"),
            },
            {
              label: "Bio",
              value: data.bio || "",
              editComponent: <Input name="bio" textarea />,
              onSubmit: handleSave("bio"),
            },
            {
              label: "Category",
              value: data.category || "",
              editComponent: (
                <Input
                  name="category"
                  options={categories.map(({ title }) => ({
                    label: title,
                    value: title,
                  }))}
                />
              ),
              onSubmit: handleSave("category"),
            },
            {
              label: "Gender",
              value: data.gender || "",
              editComponent: (
                <Input
                  name="gender"
                  options={genders.map((gender) => ({
                    label: gender,
                    value: gender,
                  }))}
                />
              ),
              onSubmit: handleSave("gender"),
            },
            {
              label: "Date of birth",
              value: data.dob || "",
              editComponent: (
                <Input
                  name="dob"
                  rules={{
                    validate: ageValidation,
                  }}
                  type="date"
                />
              ),
              onSubmit: handleSave("dob"),
            },
          ]}
          title="Basic Info"
        />
      </Form>
    </main>
  );
}
