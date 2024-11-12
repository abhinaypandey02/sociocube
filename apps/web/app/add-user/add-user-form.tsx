"use client";
import React, { type ChangeEvent, useEffect, useRef, useState } from "react";
import { Input } from "ui/input";
import categories from "commons/categories";
import genders from "commons/genders";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Form from "ui/form";
import { Button } from "ui/button";
import Image from "next/image";
import { User } from "@phosphor-icons/react";
import { useAuthQuery } from "../../lib/apollo-client";
import {
  GET_CITIES,
  GET_SPIRIT_UPLOAD_URL,
  GET_STATES,
} from "../../lib/queries";
import type { GetCountriesQuery } from "../../__generated__/graphql";
import { Route } from "../../constants/routes";

export default function AddUserForm({
  countries,
}: {
  countries: GetCountriesQuery["countries"];
}) {
  const form = useForm();

  const router = useRouter();
  const [fetchUploadURL] = useAuthQuery(GET_SPIRIT_UPLOAD_URL);
  const [profilePicture, setProfilePicture] = useState<File>();
  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const [fetchStates, { data: statesData }] = useAuthQuery(GET_STATES);
  const [fetchCities, { data: citiesData }] = useAuthQuery(GET_CITIES);

  useEffect(() => {
    const sub = form.watch((value, { name }) => {
      if (name === "country" && value[name])
        void fetchStates({
          country: value[name] as number,
        });
      if (name === "state" && value[name])
        void fetchCities({
          state: value[name] as number,
        });
    });
    return sub.unsubscribe;
  }, [form.watch, fetchCities, form, fetchStates]);
  const displayURL = profilePicture && URL.createObjectURL(profilePicture);
  async function onSubmit(values: FieldValues) {
    const { data } = await fetchUploadURL({
      data: values.username as string,
    });
    if (data?.spiritPhotoURL.url) {
      const uploadRes = await fetch(data.spiritPhotoURL.uploadURL, {
        method: "PUT",
        body: profilePicture,
      });
      if (!uploadRes.ok) return;
      const id = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/add-spirits`,
        {
          method: "POST",
          body: JSON.stringify({
            ...values,
            photo: data.spiritPhotoURL.url,
          }),
        },
      ).then((res) => res.text());
      router.push(`${Route.Profile}/${id}`);
    }
  }
  return (
    <Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <button
        className="mx-auto mb-3 flex size-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border "
        onClick={() => ref.current?.click()}
        type="button"
      >
        {displayURL ? (
          <Image
            alt="user"
            className="size-full object-cover"
            height={300}
            src={displayURL}
            width={300}
          />
        ) : (
          <User size={40} />
        )}
      </button>
      <input
        className="hidden"
        onChange={(e) => {
          const event = e as unknown as ChangeEvent<HTMLInputElement>;
          const file = event.target.files?.[0];
          if (file) {
            setProfilePicture(file);
          }
        }}
        ref={ref}
        type="file"
      />
      <Input
        className="block"
        label="Full name"
        name="full_name"
        placeholder="Enter your name"
        rules={{ required: true }}
      />
      <Input
        className="block"
        label="Username"
        name="username"
        placeholder="Enter username"
        rules={{ required: true }}
      />
      <Input
        className="block"
        label="BIO"
        name="biography"
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
        label="Country"
        name="country"
        options={countries}
        placeholder="Select your country"
        rules={{ required: true }}
      />

      {statesData?.states ? (
        <Input
          className="block"
          label="State"
          name="state"
          options={statesData.states}
          placeholder="Select your state"
        />
      ) : null}
      {citiesData?.cities ? (
        <Input
          className="block"
          label="City"
          name="city"
          options={citiesData.cities}
          placeholder="Select your city"
        />
      ) : null}
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

      <Input
        className="block"
        label="Followers"
        name="followers"
        placeholder="Followers count"
        rules={{ valueAsNumber: true }}
        type="number"
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
