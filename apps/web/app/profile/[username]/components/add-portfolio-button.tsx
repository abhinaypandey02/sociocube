"use client";
import React, { type ChangeEvent, useRef, useState } from "react";
import { Button } from "ui/button";
import { ImageSquare, Plus } from "@phosphor-icons/react";
import { Input } from "ui/input";
import { useForm } from "react-hook-form";
import Form from "ui/form";
import { useRouter } from "next/navigation";
import { PORTFOLIO_CAPTION_MAX_LENGTH } from "commons/constraints";
import { isURL } from "class-validator";
import { ALLOWED_IMAGE_TYPES, MAXIMUM_FILE_SIZE } from "commons/file";
import { toast } from "react-hot-toast";
import { Spinner } from "@phosphor-icons/react/dist/ssr";
import Modal from "../../../../components/modal";
import type { StorageFile } from "../../../../__generated__/graphql";
import {
  handleGQLErrors,
  useAuthMutation,
} from "../../../../lib/apollo-client";
import { ADD_PORTFOLIO, ADD_PORTFOLIO_LINK } from "../../../../lib/mutations";
import { revalidateProfilePage } from "../../../../lib/revalidate";
import { getProperSizedGif } from "./utils";

interface FormValues {
  caption: string;
  link: string;
}
export default function AddPortfolioButton({
  imageUploadURL,
  username,
  isLink,
}: {
  imageUploadURL: StorageFile;
  username: string;
  isLink: boolean;
}) {
  const form = useForm<FormValues>({
    defaultValues: {
      caption: "",
      link: "",
    },
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addPortfolio, { data: dataPortfolio, reset: resetPortfolio }] =
    useAuthMutation(ADD_PORTFOLIO);
  const [
    addPortfolioLink,
    { data: dataPortfolioLink, reset: resetPortfolioLink },
  ] = useAuthMutation(ADD_PORTFOLIO_LINK);
  const [image, setImage] = useState<File | Blob>();
  const fileRef = useRef<HTMLInputElement>(null);
  const imageURL = image && URL.createObjectURL(image);
  const router = useRouter();
  const onSubmit = async (values: FormValues) => {
    if (!isLink) {
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
          caption: values.caption || null,
          imageURL: imageUploadURL.url,
          link: values.link || null,
        },
      }).catch(handleGQLErrors);
    } else {
      setLoading(true);
      await addPortfolioLink({
        portfolio: {
          caption: values.caption,
          link: values.link,
        },
      }).catch(handleGQLErrors);
    }
    setLoading(false);
    revalidateProfilePage(username)
      .then(() => {
        router.refresh();
      })
      .catch(handleGQLErrors);
    setOpen(false);
    resetPortfolio();
    resetPortfolioLink();
    form.reset();
  };
  return (
    <>
      <input
        accept={[...ALLOWED_IMAGE_TYPES, "image/gif", "video/*"].join(", ")}
        className="hidden"
        onChange={async (e) => {
          const event = e as unknown as ChangeEvent<HTMLInputElement>;
          const file = event.target.files?.[0];
          if (file) {
            if (file.type.startsWith("video/")) {
              setLoading(true);
              const blob = await getProperSizedGif(file);
              setLoading(false);
              if (blob) {
                setImage(blob);
              } else {
                toast.error(
                  `Cannot process video file, Please use a shorter video.`,
                );
              }
            } else if (file.size > MAXIMUM_FILE_SIZE) {
              toast.error(
                `Maximum file size is ${MAXIMUM_FILE_SIZE / 1024 / 1024}mb`,
              );
            } else if (
              ![...ALLOWED_IMAGE_TYPES, "image/gif"].includes(file.type)
            ) {
              toast.error(`Only png and jpeg image types are allowed`);
            } else {
              setImage(file);
            }
          }
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
          Add new {isLink ? "link" : "portfolio"}
        </h3>
        <Form
          className="space-y-5"
          form={form}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {!isLink && (
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
              {!imageURL &&
                (loading ? (
                  <Spinner
                    className="my-20 animate-spin text-primary md:my-40"
                    size={30}
                  />
                ) : (
                  <ImageSquare
                    className="my-20 text-primary md:my-40"
                    size={30}
                  />
                ))}
            </button>
          )}
          <Input
            label={isLink ? "Title" : "Caption"}
            maxLength={PORTFOLIO_CAPTION_MAX_LENGTH}
            name="caption"
            required={isLink}
          />
          <Input
            label={isLink ? "URL" : "Link to this work"}
            name="link"
            required={isLink}
            rules={{
              validate: {
                isURL: (val: string) => !val || isURL(val) || "Invalid URL",
              },
            }}
            type="url"
          />
          <Button
            className="w-full"
            disabled={!isLink && !image}
            loading={loading}
            success={
              dataPortfolio?.addPortfolio || dataPortfolioLink?.addPortfolioLink
            }
            type="submit"
          >
            Add {isLink ? "link" : "portfolio"}
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
