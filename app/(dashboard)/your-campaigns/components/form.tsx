"use client";
import { MagicWand, Pen } from "@phosphor-icons/react";
import type { GraphQLError } from "graphql/error";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import type {
  GetUserCurrencyQuery,
  PostingPlatforms,
} from "@/__generated__/graphql";
import { POSTING_PLATFORMS } from "@/app/(dashboard)/campaigns/constants";
import LocationSelector from "@/app/(dashboard)/your-campaigns/components/location-selector";
import { Button } from "@/components/button";
import { Variants } from "@/components/constants";
import Form from "@/components/form";
import { Input } from "@/components/input";
import {
  BIO_MAX_LENGTH,
  NAME_MAX_LENGTH,
  POSTING_BIO_MAX_LENGTH,
} from "@/constants/constraints";
import countries from "@/constants/countries";
import { getRoute } from "@/constants/routes";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { useUser } from "@/lib/auth-client";
import { CREATE_POSTING } from "@/lib/mutations";
import { getCreatePostingQuestions } from "@/lib/server-actions";

const DEFAULT_AI_QUESTIONS = ["Describe the campaign and the requirements"];

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
  gender?: string;
  platforms: PostingPlatforms;
}

export default function CreateNewPostingForm({
  data,
}: {
  data?: GetUserCurrencyQuery;
}) {
  const [user] = useUser();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const form = useForm<CreatePostingFormFields>();
  const [showManualForm, setShowManualForm] = useState(false);
  const aiForm = useForm<{ answers: string[] }>();
  const [aiQuestions, setAIQuestions] =
    useState<string[]>(DEFAULT_AI_QUESTIONS);
  const [createPosting, { loading: creatingPost }] =
    useAuthMutation(CREATE_POSTING);
  const [loading, setLoading] = useState(false);
  const isLoading = creatingPost || loading;
  const [locationValues, setLocationValues] = useState<{
    cities: number[];
    states: number[];
    countries: number[];
  }>();
  useEffect(() => {
    if (data?.user?.locationID?.country && !form.getValues("currencyCountry")) {
      form.setValue("currencyCountry", data.user.locationID.country);
    }
  }, [data]);
  const onSubmit = (formData: CreatePostingFormFields) => {
    setLoading(true);
    createPosting({
      newPosting: {
        ...formData,
        ...locationValues,
        deliverables:
          formData.deliverables.trim() !== ""
            ? formData.deliverables.trim().split(",")
            : undefined,
        platforms: [formData.platforms],
      },
    })
      .then((res) => {
        if (res.data?.createPosting) {
          router.push(`${getRoute("YourCampaigns")}/${res.data.createPosting}`);
        } else setLoading(false);
      })
      .catch((e: GraphQLError) => {
        setLoading(false);
        handleGQLErrors(e);
      });
  };

  useEffect(() => {
    if (showManualForm) ref.current?.scrollIntoView();
  }, [showManualForm]);

  const handleAiSubmit = async (data: { answers: string[] }) => {
    setLoading(true);
    const res = await getCreatePostingQuestions(
      aiQuestions.map((question, i) => ({
        question,
        answer: data.answers[i] || "",
      })),
      { name: user?.name, bio: user?.bio },
    );
    if (res?.additionalQuestion) {
      const additionalQuestion = res.additionalQuestion;
      setAIQuestions((prev) => [...prev, additionalQuestion]);
    } else if (res?.postingData) {
      setShowManualForm(true);
      const postingData = res.postingData;
      form.reset({
        barter: postingData.barter,
        description: postingData.description.slice(0, POSTING_BIO_MAX_LENGTH),
        deliverables: postingData.deliverables.slice(0, BIO_MAX_LENGTH),
        externalLink: postingData.externalLink,
        extraDetails: postingData.extraDetails,
        maximumAge: postingData.maximumAge || undefined,
        title: postingData.title.slice(0, NAME_MAX_LENGTH * 2),
        platforms: postingData.platforms,
        minimumAge: postingData.minimumAge || undefined,
        minimumFollowers: postingData.minimumFollowers || undefined,
        price: postingData.price || undefined,
      });
      toast.success("Autofilled the form!");
      aiForm.resetField("answers");
      setTimeout(() => {
        setAIQuestions(DEFAULT_AI_QUESTIONS);
      }, 1000);
    } else {
      toast.error("An error occurred with AI, please fill form manually!");
      aiForm.resetField("answers");
      setAIQuestions(DEFAULT_AI_QUESTIONS);
    }

    setLoading(false);
  };
  return (
    <>
      <Form className="space-y-6" form={aiForm} onSubmit={handleAiSubmit}>
        {aiQuestions.map((question, i) => (
          <Input
            key={question}
            label={question}
            name={"answers." + i}
            placeholder="Answer the question in detail to use AI to autofill your form."
            required
            rows={6}
            textarea={i === aiQuestions.length - 1}
          />
        ))}
        <Button
          className="flex items-center gap-2 ml-auto max-sm:w-full"
          loading={isLoading}
          type="submit"
          variant={Variants.ACCENT}
        >
          {aiQuestions.length > 1 ? "Submit answer" : "Autofill with AI"}{" "}
          <MagicWand />
        </Button>
      </Form>
      <div ref={ref} className="relative my-12 scroll-m-6">
        <hr />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 font-poppins font-medium">
          or
        </span>
      </div>
      {!showManualForm && (
        <Button
          invert
          className="flex items-center gap-2 w-full"
          onClick={() => setShowManualForm(true)}
        >
          Enter details manually <Pen />
        </Button>
      )}
      <Form
        className={"space-y-6 " + (showManualForm ? "" : "hidden")}
        form={form}
        onSubmit={onSubmit}
      >
        <Input
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
        <Input
          label="Currency (Optional)"
          name="currencyCountry"
          options={countries}
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
        <Input
          label="Minumum Followers (Optional)"
          name="minimumFollowers"
          placeholder="Required instagram followers"
          rules={{ valueAsNumber: true }}
          type="number"
        />
        <LocationSelector
          countries={[]}
          states={[]}
          cities={[]}
          locationNames={[]}
          onChange={setLocationValues}
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
          Start Campaigns
        </Button>
      </Form>
    </>
  );
}
