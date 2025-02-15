"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input, Variants } from "ui/input";
import { Button } from "ui/button";
import Form from "ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { MagicWand } from "@phosphor-icons/react";
import { toast } from "react-hot-toast";
import type { GraphQLError } from "graphql/error";
import {
  BIO_MAX_LENGTH,
  NAME_MAX_LENGTH,
  POSTING_BIO_MAX_LENGTH,
} from "commons/constraints";
import { POSTING_PLATFORMS } from "../../../postings/constants";
import type {
  GetPostingQuery,
  GetUserCurrencyQuery,
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
import { getTransformedPostingData } from "../../../../lib/server-actions";

export interface CreatePostingFormFields {
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
  agencies,
}: {
  existingPosting?: GetPostingQuery["posting"];
  agencies?: NonNullable<GetUserCurrencyQuery["user"]>["agencies"];
}) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const form = useForm<CreatePostingFormFields>({
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
      currencyCountry:
        existingPosting?.currencyCountry ||
        agencies?.[0]?.agencyDetails.locationID?.country ||
        undefined,
      externalLink: existingPosting?.externalLink || undefined,
      extraDetails: existingPosting?.extraDetails || undefined,
    },
  });
  const aiForm = useForm<{ message: string }>();
  const [fetchCountries, { data: countriesData, loading: loadingCountries }] =
    useAuthQuery(GET_COUNTRIES);
  const [createPosting, { loading: creatingPost }] =
    useAuthMutation(CREATE_POSTING);
  const [updatePosting, { loading: updatingPost }] =
    useAuthMutation(UPDATE_POSTING);
  const [loading, setLoading] = useState(false);
  const isLoading = loadingCountries || creatingPost || updatingPost || loading;
  useEffect(() => {
    void fetchCountries();
  }, [fetchCountries]);
  const onSubmit = (formData: CreatePostingFormFields) => {
    setLoading(true);

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
            router.push(getRoute("AccountPostings"));
          } else setLoading(false);
        })
        .catch((e: GraphQLError) => {
          setLoading(false);
          handleGQLErrors(e);
        });
    } else {
      const agency = agencies?.[0]?.agencyDetails.id;
      if (!agency) return;
      createPosting({
        agency,
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
          } else setLoading(false);
        })
        .catch((e: GraphQLError) => {
          setLoading(false);
          handleGQLErrors(e);
        });
    }
  };

  const handleAiSubmit = async (data: { message: string }) => {
    setLoading(true);
    const res = await getTransformedPostingData(data.message);
    if (res) {
      form.reset({
        barter: res.barter,
        description: res.description.slice(0, POSTING_BIO_MAX_LENGTH),
        deliverables: res.deliverables.slice(0, BIO_MAX_LENGTH),
        externalLink: res.externalLink,
        extraDetails: res.extraDetails,
        maximumAge: res.maximumAge || undefined,
        title: res.title.slice(0, NAME_MAX_LENGTH * 2),
        platforms: res.platforms,
        minimumAge: res.minimumAge || undefined,
        minimumFollowers: res.minimumFollowers || undefined,
        price: res.price || undefined,
      });
      toast.success("Autofilled the form!");
      ref.current?.scrollIntoView();
    } else {
      toast.error("An error occurred with AI, please fill form manually!");
    }
    aiForm.resetField("message");
    setLoading(false);
  };
  return (
    <>
      {!existingPosting && (
        <Form
          className="space-y-6"
          form={aiForm}
          onSubmit={aiForm.handleSubmit(handleAiSubmit)}
        >
          <Input
            label="About the opening / Brand message (Optional)"
            name="message"
            placeholder="Paste the message from the brand, or describe the opportunity yourself and let AI handle the auto filling!"
            required
            rows={8}
            textarea
          />
          <Button
            className="flex items-center gap-2"
            loading={isLoading}
            type="submit"
            variant={Variants.ACCENT}
          >
            Autofill with AI <MagicWand />
          </Button>
        </Form>
      )}
      {!existingPosting && (
        <div className="relative my-12">
          <hr />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-bg px-2 font-poppins font-medium">
            or
          </span>
        </div>
      )}
      <Form
        className="space-y-6"
        form={form}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div ref={ref} />
        <Input
          disabled={Boolean(existingPosting)}
          label="Title"
          maxLength={NAME_MAX_LENGTH * 2}
          name="title"
          placeholder="Posting title"
        />
        <Input
          label="Description"
          maxLength={POSTING_BIO_MAX_LENGTH}
          name="description"
          placeholder="Posting description"
          rows={8}
          textarea
        />
        <Input
          label="Deliverables (Optional)"
          maxLength={BIO_MAX_LENGTH}
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
          placeholder="Any extra details to request from the applicant? Ex- Past experience, niche, etc."
        />
        <Input
          className="m-1.5 scale-125"
          label="Barter collab?"
          name="barter"
          type="checkbox"
        />
        <Button loading={isLoading} type="submit">
          {existingPosting ? "Update" : "Create"} Posting
        </Button>
      </Form>
    </>
  );
}
