import { Star, X } from "@phosphor-icons/react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";

import {
  ApplicationStatus,
  type GetPostingApplicationsQuery,
} from "@/__generated__/graphql";
import { Button } from "@/components/button";
import Form from "@/components/form";
import { Input } from "@/components/input";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { REJECT_APPLICATION, SEND_REVIEW_BY_AGENCY } from "@/lib/mutations";

import Modal from "../../../../../../components/modal";

export default function SelectedActions({
  status,
  id,
  user,
  hasReview,
}: {
  status: ApplicationStatus;
  id: number;
  user: GetPostingApplicationsQuery["applications"][number]["user"];
  hasReview: boolean;
}) {
  const [reject] = useAuthMutation(REJECT_APPLICATION);
  const [sendReview, { loading }] = useAuthMutation(SEND_REVIEW_BY_AGENCY);
  const form = useForm<{ userFeedback: string }>();
  const [rating, setRating] = useState(0);
  const [openRating, setOpenRating] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(hasReview);
  const isRejected = status === ApplicationStatus.Rejected;
  return (
    <div className="flex items-center gap-1" key={id}>
      {!isRejected && (
        <button
          disabled={hasReviewed}
          onClick={() => {
            setOpenRating(true);
          }}
          type="button"
        >
          <Star
            className="text-primary"
            size={18}
            weight={hasReviewed ? "fill" : "regular"}
          />
        </button>
      )}

      {!hasReviewed ? (
        <button
          disabled={isRejected}
          onClick={() => {
            void reject({
              id,
            });
          }}
          type="button"
        >
          <X
            className={"text-red-800"}
            size={18}
            weight={isRejected ? "fill" : "regular"}
          />
        </button>
      ) : null}
      {user ? (
        <Modal
          close={() => {
            setOpenRating(false);
          }}
          open={openRating}
        >
          <h2 className="mb-8 font-poppins text-xl font-semibold text-gray-700">
            Send a review for
          </h2>
          <div className="mb-5 flex items-center justify-center gap-2">
            {user.photo ? (
              <Image
                alt={user.name || ""}
                className="size-10 rounded-full object-cover"
                height={40}
                src={user.photo}
                width={40}
              />
            ) : null}
            <span>{user.name}</span>
          </div>
          <Form
            className="space-y-5"
            form={form}
            onSubmit={(data) => {
              sendReview({
                args: {
                  userFeedback: data.userFeedback || undefined,
                  userRating: rating,
                  application: id,
                },
              })
                .then(() => {
                  setOpenRating(false);
                  setHasReviewed(true);
                })
                .catch(handleGQLErrors);
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
              name="userFeedback"
              placeholder="Add a review about your work together"
              rows={4}
              textarea
            />
            <Button disabled={!rating} loading={loading} type="submit">
              Send review
            </Button>
          </Form>
        </Modal>
      ) : null}
    </div>
  );
}
