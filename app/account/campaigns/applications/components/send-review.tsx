"use client";
import React, { useRef, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useForm } from "react-hook-form";
import { ImageSquare, Star } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { isURL } from "class-validator";
import { Spinner } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import Form from "@/components/form";
import { Variants } from "@/components/constants";
import { SEND_REVIEW_BY_USER } from "@/lib/mutations";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import type {
  GetUserApplicationsQuery,
  StorageFile,
} from "@/__generated__/graphql";
import Modal from "../../../../../components/modal";
import PortfolioImageHandler from "../../../../profile/[username]/components/portfolio-image-handler";

export default function SendReview({
  posting,
  imageUploadURL,
}: {
  posting: GetUserApplicationsQuery["getUserApplications"][number]["posting"];
  imageUploadURL: StorageFile;
}) {
  const [sendReview] = useAuthMutation(SEND_REVIEW_BY_USER);
  const [loading, setLoading] = useState(false);

  const [openRating, setOpenRating] = useState(false);
  const [image, setImage] = useState<File | Blob>();

  const fileRef = useRef<HTMLInputElement>(null);
  const imageURL = image && URL.createObjectURL(image);
  const router = useRouter();
  const form = useForm<{
    agencyFeedback: string;
    imageURL: string;
    link?: string;
  }>();
  const [rating, setRating] = useState(0);
  if (!posting) return null;
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
          setOpenRating(false);
        }}
        open={openRating}
      >
        <h2 className="mb-8 font-poppins text-xl font-semibold text-gray-700">
          Send a review for
        </h2>
        <h3 className="mb-5 text-center font-medium">{posting.title}</h3>
        <Form
          className="space-y-5"
          form={form}
          onSubmit={form.handleSubmit(async (data) => {
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
            sendReview({
              args: {
                agencyFeedback: data.agencyFeedback || undefined,
                agencyRating: rating,
                posting: posting.id,
                imageURL: data.imageURL || imageUploadURL.url,
                link: data.link || undefined,
              },
            })
              .then(() => {
                router.refresh();
                toast.success("Successfully sent the review!");
                setOpenRating(false);
              })
              .catch(handleGQLErrors)
              .finally(() => {
                setLoading(false);
              });
          })}
        >
          <div className="flex justify-center">
            <Rating
              SVGclassName="inline-block"
              allowFraction
              onClick={(val) => {
                setRating(val);
              }}
              transition
            />
          </div>

          <Input
            label="Feedback"
            name="agencyFeedback"
            placeholder="Add a review about your work together"
            rows={4}
            textarea
          />
          {image ? (
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
          ) : null}

          {!image && (
            <div>
              <Input label="Instagram url of work" name="imageURL" type="url" />
              <Button
                className="mt-4 w-full text-sm"
                invert
                loading={loading}
                onClick={() => {
                  fileRef.current?.click();
                }}
                variant={Variants.ACCENT}
              >
                or Upload manually
              </Button>
            </div>
          )}
          {image ? (
            <Input
              label="Link to this work"
              name="link"
              rules={{
                validate: {
                  isURL: (val: string) => !val || isURL(val) || "Invalid URL",
                },
              }}
              type="url"
            />
          ) : null}
          <Button
            className="!mt-10"
            disabled={!rating || (!imageURL && !manualURL)}
            loading={loading}
            type="submit"
          >
            Send review
          </Button>
        </Form>
      </Modal>
      <Button
        className="flex items-center gap-2 text-sm"
        onClick={() => {
          setOpenRating(true);
        }}
        variant={Variants.ACCENT}
      >
        Add Review <Star weight="duotone" />
      </Button>
    </>
  );
}
