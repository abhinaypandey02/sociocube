"use client";
import React, { useEffect } from "react";
import { Input } from "ui/input";
import { Button } from "ui/button";
import Form from "ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { POSTING_PLATFORMS } from "../../../postings/constants";
import type {
  GetPostingQuery,
  PostingPlatforms,
} from "../../../../__generated__/graphql";
import {
  handleGQLErrors,
  useAuthMutation,
  useAuthQuery,
} from "../../../../lib/apollo-client";
import { GET_COUNTRIES } from "../../../../lib/queries";
import { CREATE_POSTING, UPDATE_POSTING } from "../../../../lib/mutations";
import {
  revalidateAllPostings,
  revalidateOnlyPostingsPage,
} from "../../../../lib/revalidate";
import { getRoute } from "../../../../constants/routes";

interface FormFields {
  title: string;
  description: string;
  deliverables: string;
  extraDetails?: string;
  externalLink?: string;
  barter: boolean;
  maximumAge: number;
  minimumAge: number;
  minimumFollowers: number;
  currencyCountry: number;
  price: number;
  platforms: PostingPlatforms;
}

export default function CreateNewPostingForm({
  existingPosting,
}: {
  existingPosting?: GetPostingQuery["posting"];
}) {
  const router = useRouter();

  const form = useForm<FormFields>({
    defaultValues: {
      deliverables: existingPosting?.deliverables?.join(","),
      barter: existingPosting?.barter,
      description: existingPosting?.description,
      platforms: existingPosting?.platforms[0],
      maximumAge: existingPosting?.maximumAge || undefined,
      minimumAge: existingPosting?.minimumAge || undefined,
      minimumFollowers: existingPosting?.minimumFollowers || undefined,
      price: existingPosting?.price || undefined,
      title: existingPosting?.title,
      currencyCountry: existingPosting?.currencyCountry || undefined,
      externalLink: existingPosting?.externalLink || undefined,
      extraDetails: existingPosting?.extraDetails || undefined,
    },
  });
  const [fetchCountries, { data: countriesData, loading: loadingCountries }] =
    useAuthQuery(GET_COUNTRIES);
  const [createPosting, { loading: creatingPost }] =
    useAuthMutation(CREATE_POSTING);
  const [updatePosting, { loading: updatingPost }] =
    useAuthMutation(UPDATE_POSTING);

  useEffect(() => {
    void fetchCountries();
  }, [fetchCountries]);
  const onSubmit = (formData: FormFields) => {
    if (existingPosting) {
      // @ts-expect-error -- required to delete
      delete formData.title;
      updatePosting({
        id: existingPosting.id,
        newPosting: {
          ...formData,
          deliverables:
            formData.deliverables.trim() !== ""
              ? formData.deliverables.trim().split(",")
              : undefined,
          platforms: [formData.platforms],
        },
      })
        .then((res) => {
          if (res.data?.updatePosting) {
            void revalidateAllPostings();
          }
        })
        .catch(handleGQLErrors);
    } else {
      createPosting({
        newPosting: {
          ...formData,
          deliverables:
            formData.deliverables.trim() !== ""
              ? formData.deliverables.trim().split(",")
              : undefined,
          platforms: [formData.platforms],
        },
      })
        .then((res) => {
          if (res.data?.createPosting) {
            void revalidateOnlyPostingsPage();
            router.push(`${getRoute("Postings")}/${res.data.createPosting}`);
          }
        })
        .catch(handleGQLErrors);
    }
  };
  return (
    <Form
      className="space-y-6"
      form={form}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Input
        disabled={Boolean(existingPosting)}
        label="Title"
        name="title"
        placeholder="Posting title"
      />
      <Input
        label="Description"
        name="description"
        placeholder="Posting description"
        rows={8}
        textarea
      />
      <Input
        label="Deliverables (Optional)"
        name="deliverables"
        placeholder="Comma separated deliverables"
      />
      <Input
        label="Platform"
        name="platforms"
        options={POSTING_PLATFORMS}
        placeholder="Select platform"
      />
      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Minumum Age"
          min={18}
          name="minimumAge"
          placeholder="(Optional)"
          rules={{ valueAsNumber: true, min: 18 }}
          type="number"
        />
        <Input
          label="Maximum Age"
          name="maximumAge"
          placeholder="(Optional)"
          rules={{ valueAsNumber: true }}
          type="number"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Currency (Optional)"
          name="currencyCountry"
          options={countriesData?.countries}
          placeholder="Currency country"
          rules={{ valueAsNumber: true }}
          type="number"
        />
        <Input
          label="Price (Optional)"
          name="price"
          placeholder="Price of posting"
          rules={{ valueAsNumber: true }}
          type="number"
        />
      </div>
      <Input
        label="Minumum Followers (Optional)"
        name="minimumFollowers"
        placeholder="Required instagram followers"
        rules={{ valueAsNumber: true }}
        type="number"
      />
      <Input
        label="External link (Optional)"
        name="externalLink"
        placeholder="Link to an external application form"
        type="url"
      />
      <Input
        label="Extra required details (Optional)"
        name="extraDetails"
        placeholder="Any extra details to request from user?"
      />
      <Input
        className="m-1.5 scale-125"
        label="Barter collab?"
        name="barter"
        type="checkbox"
      />
      <Button
        loading={creatingPost || loadingCountries || updatingPost}
        type="submit"
      >
        {existingPosting ? "Update" : "Create"} Posting
      </Button>
    </Form>
  );
}
