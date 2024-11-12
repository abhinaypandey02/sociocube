"use client";
import React from "react";
import { Input } from "ui/input";
import categories from "commons/categories";
import genders from "commons/genders";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Form from "ui/form";
import { Button } from "ui/button";
import { Route } from "../../constants/routes";

export default function AddUserForm() {
  const form = useForm();
  const router = useRouter();
  async function onSubmit(data: FieldValues) {
    const id = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/add-spirits`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    ).then((res) => res.text());
    router.push(`${Route.Profile}/${id}`);
  }
  return (
    <Form form={form} onSubmit={form.handleSubmit(onSubmit)}>
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
      <Input
        className="block"
        label="Photo URL"
        name="photo"
        placeholder="Photo URL"
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
