"use client";
import React, { useState } from "react";
import Form from "ui/form";
import { Rating } from "react-simple-star-rating";
import { Input, Variants } from "ui/input";
import { Button } from "ui/button";
import { useForm } from "react-hook-form";
import { Star } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Modal from "../../../../../components/modal";
import { SEND_REVIEW_BY_USER } from "../../../../../lib/mutations";
import {
  handleGQLErrors,
  useAuthMutation,
} from "../../../../../lib/apollo-client";
import type { GetUserApplicationsQuery } from "../../../../../__generated__/graphql";

export default function SendReview({
  posting,
}: {
  posting: GetUserApplicationsQuery["getUserApplications"][number]["posting"];
}) {
  const [sendReview, { loading }] = useAuthMutation(SEND_REVIEW_BY_USER);
  const [openRating, setOpenRating] = useState(false);
  const router = useRouter();
  const form = useForm<{ agencyFeedback: string }>();
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
          onSubmit={form.handleSubmit((data) => {
            sendReview({
              args: {
                agencyFeedback: data.agencyFeedback || undefined,
                agencyRating: rating,
                posting: posting.id,
              },
            })
              .then(() => {
                router.refresh();
                toast.success("Successfully sent the review!");
                setOpenRating(false);
              })
              .catch(handleGQLErrors);
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
          <Button disabled={!rating} type="submit">
            Send review
          </Button>
        </Form>
      </Modal>
      <Button
        className="flex items-center gap-2 text-sm"
        loading={loading}
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
