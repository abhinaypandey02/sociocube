"use client";
import { ArrowSquareOut } from "@phosphor-icons/react";
import { Pencil, Wallet, X } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { GetPostingQuery } from "@/__generated__/graphql";
import { renderRichText } from "@/app/(dashboard)/campaigns/components/posting-card";
import { POSTING_PLATFORMS } from "@/app/(dashboard)/campaigns/constants";
import { getCurrency, getPlatforms } from "@/app/(dashboard)/campaigns/utils";
import AccountCard from "@/app/(dashboard)/profile/components/account-card";
import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import {
  BIO_MAX_LENGTH,
  POSTING_BIO_MAX_LENGTH,
} from "@/constants/constraints";
import countries from "@/constants/countries";
import { useAuthMutation } from "@/lib/apollo-client";
import { UPDATE_POSTING } from "@/lib/mutations";

export default function DetailsSections({
  posting: postingData,
}: {
  posting: NonNullable<GetPostingQuery["posting"]>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => setIsEditing(!isEditing);

  const [posting, setPosting] = useState(postingData);

  const price = getCurrency(posting.barter, posting.currency, posting.price);

  return (
    <AccountCard
      title={posting.title}
      cta={
        <Button square borderless invert onClick={handleEditClick}>
          {isEditing ? <X /> : <Pencil />}
        </Button>
      }
    >
      {!isEditing && (
        <>
          <div className={"flex flex-wrap items-center gap-3 my-2 text-sm "}>
            <div>{getPlatforms(posting.platforms)}</div>
            {price ? (
              <>
                <span className={"text-[10px] text-gray-500"}>•</span>
                <div className={"flex items-center gap-1"}>
                  <Wallet />
                  {price}
                </div>
              </>
            ) : null}
            {posting.externalLink ? (
              <>
                <span className={"text-[10px] text-gray-500"}>•</span>
                <ArrowSquareOut />
              </>
            ) : null}
          </div>
          <dd
            className="text-sm leading-6 mt-3 text-gray-600 "
            dangerouslySetInnerHTML={{
              __html: renderRichText(posting.description),
            }}
          />
          {posting.deliverables ? (
            <div className="pt-2 sm:col-span-2 ">
              <dt className=" font-semibold leading-6  text-sm text-gray-900">
                Deliverables
              </dt>
              <dd className="text-sm  leading-6 text-gray-600 ">
                {posting.deliverables.join(", ")}
              </dd>
            </div>
          ) : null}
        </>
      )}
      <PostingDetailsForm
        onClose={() => setIsEditing(false)}
        posting={posting}
        isEditing={isEditing}
        setPosting={setPosting}
      />
    </AccountCard>
  );
}

function PostingDetailsForm({
  posting,
  onClose,
  setPosting,
  isEditing,
}: {
  posting: NonNullable<GetPostingQuery["posting"]>;
  onClose: () => void;
  setPosting: (posting: NonNullable<GetPostingQuery["posting"]>) => void;
  isEditing: boolean;
}) {
  const form = useForm({
    defaultValues: {
      ...posting,
      deliverables: posting.deliverables?.join(", "),
    },
  });

  const [updatePosting] = useAuthMutation(UPDATE_POSTING);
  if (!isEditing) return null;

  return (
    <Form
      onSubmit={form.handleSubmit((data) => {
        const deliverables = data.deliverables?.trim()
          ? data.deliverables
              .split(",")
              .map((deliverable) => deliverable.trim())
          : [];
        setPosting({ ...data, deliverables });
        void updatePosting({
          id: posting.id,
          newPosting: {
            description: data.description,
            deliverables,
            platforms: data.platforms,
            currencyCountry: data.currencyCountry,
            price: data.price,
            barter: data.barter,
            externalLink: data.externalLink,
            extraDetails: data.extraDetails,
          },
        });
        onClose();
      })}
      className={"space-y-4 pt-4"}
      form={form}
    >
      <Input
        label="Description"
        maxLength={POSTING_BIO_MAX_LENGTH}
        name="description"
        placeholder="Posting description"
        rows={8}
        textarea
      />
      <Input
        label="Deliverables"
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
          label="Currency"
          name="currencyCountry"
          options={countries}
          placeholder="Currency country"
          rules={{ valueAsNumber: true }}
          type="number"
        />
        <Input
          label="Price"
          name="price"
          placeholder="Price of posting"
          rules={{ valueAsNumber: true }}
          type="number"
        />
      </div>
      <div className={"flex items-center gap-2"}>
        <label className={"font-medium font-poppins shrink-0"}>
          Barter collab?
        </label>
        <Input className="m-1.5 scale-125" name="barter" type="checkbox" />
      </div>
      <Input
        label="External link"
        name="externalLink"
        placeholder="Link to an external application form"
        type="url"
      />
      <Input
        label="Extra required details"
        name="extraDetails"
        placeholder="Any extra details to request from the applicant? Ex- Past experience, niche, etc."
      />
      <div className="flex mt-4 justify-end gap-2">
        <Button invert onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Update Campaign</Button>
      </div>
    </Form>
  );
}
