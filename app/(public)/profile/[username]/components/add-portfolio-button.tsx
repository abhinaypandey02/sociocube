"use client";
import React, { useRef, useState } from "react";
import { ImageSquare, Plus } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { isURL } from "class-validator";
import { Spinner } from "@phosphor-icons/react/dist/ssr";
import { PORTFOLIO_CAPTION_MAX_LENGTH } from "@/constants/constraints";
import Form from "@/components/form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Variants } from "@/components/constants";
import type { StorageFile } from "@/__generated__/graphql";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { ADD_PORTFOLIO, ADD_PORTFOLIO_LINK } from "@/lib/mutations";
import { revalidateProfilePage } from "@/lib/revalidate";
import Modal from "../../../../../components/modal";
import PortfolioImageHandler from "./portfolio-image-handler";

interface FormValues {
  caption: string;
  link: string;
  imageURL: string;
}
export default function AddPortfolioButton({
  imageUploadURL,
  username,
  isLink,
  isAgency,
}: {
  imageUploadURL: StorageFile;
  username: string;
  isLink: boolean;
  isAgency: boolean;
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
      if (!image && !values.imageURL) return;
      setLoading(true);
      if (image) {
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
      }
      await addPortfolio({
        portfolio: {
          caption: values.caption || null,
          imageURL: values.imageURL || imageUploadURL.url,
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

  const manualURL = form.watch("imageURL");
  return (
    <>
      <PortfolioImageHandler
        onChange={(val) => {
          setLoading(false);
          if (val) setImage(val);
        }}
        onGifLoadStart={() => {
          setLoading(true);
        }}
        ref={fileRef}
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
            <>
              {!manualURL && (
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

              {!imageURL && (
                <Input
                  disabled={loading}
                  label="Instagram url of work"
                  name="imageURL"
                  type="url"
                />
              )}
            </>
          )}
          <Input
            label={isLink ? "Title" : "Caption"}
            maxLength={PORTFOLIO_CAPTION_MAX_LENGTH}
            name="caption"
            required={isLink}
          />
          {isLink || imageURL ? (
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
          ) : null}
          <Button
            className="w-full"
            disabled={!isLink && !image && !manualURL}
            loading={loading}
            success={
              dataPortfolio?.addPortfolio || dataPortfolioLink?.addPortfolioLink
            }
            type="submit"
            variant={isAgency ? Variants.PRIMARY : Variants.ACCENT}
          >
            Add {isLink ? "link" : "portfolio"}
          </Button>
        </Form>
      </Modal>
      <Button
        className="flex items-center gap-1 !px-3 !text-xs"
        invert
        onClick={() => {
          setImage(undefined);
          form.reset();
          setOpen(true);
        }}
        variant={isAgency ? Variants.PRIMARY : Variants.ACCENT}
      >
        Add <Plus />
      </Button>
    </>
  );
}
