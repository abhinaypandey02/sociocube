"use client";
import React, { useRef, useState } from "react";
import { Button } from "ui/button";
import { ImageSquare, Plus } from "@phosphor-icons/react";
import { Input } from "ui/input";
import { useForm } from "react-hook-form";
import Form from "ui/form";
import { useRouter } from "next/navigation";
import { PORTFOLIO_CAPTION_MAX_LENGTH } from "commons/constraints";
import { isURL } from "class-validator";
import Modal from "../../../../components/modal";
import type { StorageFile } from "../../../../__generated__/graphql";
import {
  handleGQLErrors,
  useAuthMutation,
} from "../../../../lib/apollo-client";
import { ADD_PORTFOLIO } from "../../../../lib/mutations";
import { revalidateProfilePage } from "../../../../lib/revalidate";

interface FormValues {
  caption: string;
  link: string;
}

export default function AddPortfolioButton({
  imageUploadURL,
  username,
}: {
  imageUploadURL: StorageFile;
  username: string;
}) {
  const form = useForm<FormValues>({
    defaultValues: {
      caption: "",
      link: "",
    },
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addPortfolio, { data }] = useAuthMutation(ADD_PORTFOLIO);
  const [image, setImage] = useState<File>();
  const fileRef = useRef<HTMLInputElement>(null);
  const imageURL = image && URL.createObjectURL(image);
  const router = useRouter();
  const onSubmit = async (values: FormValues) => {
    if (!image) return;

    setLoading(true);
    try {
      await fetch(imageUploadURL.uploadURL, {
        method: "PUT",
        body: image,
      });
    } catch (e) {
      setImage(undefined);
      setLoading(false);
      return;
    }
    await addPortfolio({
      portfolio: {
        caption: values.caption,
        imageURL: imageUploadURL.url,
        link: values.link,
      },
    })
      .catch(handleGQLErrors)
      .then(async () => {
        await revalidateProfilePage(username);
        router.refresh();
      });
    form.reset();
    setOpen(false);
    setLoading(false);
  };
  return (
    <>
      <input
        className="hidden"
        onChange={(e) => {
          setImage(e.target.files?.[0]);
        }}
        ref={fileRef}
        type="file"
      />
      <Modal
        close={() => {
          setOpen(false);
        }}
        open={open}
      >
        <h3 className="mb-8 font-poppins text-xl font-medium text-gray-800">
          Add new portfolio
        </h3>
        <Form
          className="space-y-5"
          form={form}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <button
            className="flex w-full items-center justify-center rounded-md border border-dashed border-gray-500 text-gray-500"
            onClick={() => fileRef.current?.click()}
            type="button"
          >
            {imageURL ? (
              <img
                alt="new portfolio"
                className="object-cover"
                src={imageURL}
              />
            ) : null}
            {!imageURL && <ImageSquare className="my-40" size="30" />}
          </button>
          <Input
            label="Caption"
            maxLength={PORTFOLIO_CAPTION_MAX_LENGTH}
            name="caption"
          />
          <Input
            label="Link to this work"
            name="link"
            rules={{
              validate: {
                isURL: (val: string) => isURL(val) || "Invalid URL",
              },
            }}
            type="url"
          />
          <Button
            className="w-full"
            disabled={!image}
            loading={loading}
            success={data?.addPortfolio}
            type="submit"
          >
            Add portfolio
          </Button>
        </Form>
      </Modal>
      <Button
        className="flex items-center gap-1 !px-3 !text-xs"
        onClick={() => {
          setImage(undefined);
          form.reset();
          setOpen(true);
        }}
        outline
      >
        Add <Plus />
      </Button>
    </>
  );
}
