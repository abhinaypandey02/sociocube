"use client";
import { Star } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Rating } from "react-simple-star-rating";

import type { GetUserApplicationsQuery } from "@/__generated__/graphql";
import { Button } from "@/components/button";
import { Variants } from "@/components/constants";
import Form from "@/components/form";
import { Input } from "@/components/input";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { SEND_REVIEW_BY_USER } from "@/lib/mutations";

import Modal from "../../../../../../components/modal";

export default function SendReview({
  posting,
}: {
  posting: GetUserApplicationsQuery["getUserApplications"][number]["posting"];
}) {
  const [sendReview] = useAuthMutation(SEND_REVIEW_BY_USER);
  const [loading, setLoading] = useState(false);

  const [openRating, setOpenRating] = useState(false);

  const router = useRouter();
  const form = useForm<{
    agencyFeedback: string;
    link?: string;
  }>();
  const [rating, setRating] = useState(0);
  if (!posting) return null;

  return (
    <>
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
          onSubmit={async (data) => {
            setLoading(true);
            sendReview({
              args: {
                agencyFeedback: data.agencyFeedback || undefined,
                agencyRating: rating,
                posting: posting.id,
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
          }}
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
          <Button
            className="mt-10!"
            disabled={!rating}
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
