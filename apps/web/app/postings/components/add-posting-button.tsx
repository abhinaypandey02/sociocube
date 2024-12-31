"use client";
import React, { useState } from "react";
import { Button, Variants } from "ui/button";
import Form from "ui/form";
import { useForm } from "react-hook-form";
import { Input } from "ui/input";
import { useRouter } from "next/navigation";
import { Pencil, Plus } from "@phosphor-icons/react";
import Modal from "../../../components/modal";
import type {
  GetCurrentUserQuery,
  GetPostingQuery,
  PostingPlatforms,
} from "../../../__generated__/graphql";
import {
  handleGQLErrors,
  useAuthMutation,
  useAuthQuery,
} from "../../../lib/apollo-client";
import { CREATE_POSTING, UPDATE_POSTING } from "../../../lib/mutations";
import { GET_COUNTRIES } from "../../../lib/queries";
import { getRoute } from "../../../constants/routes";
import {
  revalidateAllPostings,
  revalidateOnlyPostingsPage,
} from "../../../lib/revalidate";
import { POSTING_PLATFORMS } from "../constants";

interface FormFields {
  title: string;
  description: string;
  deliverables: string;
  barter: boolean;
  maximumAge: number;
  minimumAge: number;
  minimumFollowers: number;
  currencyCountry: number;
  price: number;
  platforms: PostingPlatforms;
}

export default function AddPostingButton({
  data,
  loading,
  existingPosting,
}: {
  data?: GetCurrentUserQuery;
  loading: boolean;
  existingPosting?: GetPostingQuery["posting"];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    },
  });
  const [fetchCountries, { data: countriesData, loading: loadingCountries }] =
    useAuthQuery(GET_COUNTRIES);
  const [createPosting, { loading: creatingPost }] =
    useAuthMutation(CREATE_POSTING);
  const [updatePosting, { loading: updatingPost }] =
    useAuthMutation(UPDATE_POSTING);
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
            router.refresh();
            setIsModalOpen(false);
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
            setIsModalOpen(false);
          }
        })
        .catch(handleGQLErrors);
    }
  };
  if (existingPosting && data?.user?.id !== existingPosting.user?.id)
    return null;
  return (
    <>
      <Modal
        close={() => {
          setIsModalOpen(false);
        }}
        open={isModalOpen}
      >
        <h3 className="mb-6 text-2xl font-bold text-gray-700">
          {existingPosting ? "Update posting" : "Add new posting"}
        </h3>
        <Form
          className="space-y-3"
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
            className="m-1.5 scale-125"
            label="Barter collab?"
            name="barter"
            type="checkbox"
          />
          <Button
            loading={
              loading || creatingPost || loadingCountries || updatingPost
            }
            type="submit"
          >
            {existingPosting ? "Update" : "Add"} Posting
          </Button>
        </Form>
      </Modal>
      {!existingPosting && !loading && (
        <Button
          className="!max-sm:p-0 max-sm:flex max-sm:size-10 max-sm:shrink-0 max-sm:items-center max-sm:justify-center"
          loading={creatingPost}
          onClick={() => {
            setIsModalOpen(true);
            void fetchCountries({});
          }}
          variant={Variants.ACCENT}
        >
          <span className="max-sm:hidden">
            {data?.user ? "+ Add posting" : "+ Login to add posting"}
          </span>
          <span className="sm:hidden">
            <Plus />
          </span>
        </Button>
      )}
      {existingPosting && !loading ? (
        <Button
          loading={loading}
          onClick={() => {
            setIsModalOpen(true);
            void fetchCountries({});
          }}
          outline
          variant={Variants.ACCENT}
        >
          <Pencil />
        </Button>
      ) : null}
    </>
  );
}
