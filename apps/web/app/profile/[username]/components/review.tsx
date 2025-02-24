"use client";
import React from "react";
import { Rating } from "react-simple-star-rating";
import Image from "next/image";
import Link from "next/link";
import type { GetSellerQuery } from "../../../../__generated__/graphql";
import { getRoute } from "../../../../constants/routes";

export default function Review({
  review,
}: {
  review: NonNullable<
    NonNullable<GetSellerQuery["getSeller"]>["user"]
  >["reviews"][number];
}) {
  return (
    <Link
      className="group flex items-center gap-3"
      href={`${getRoute("Profile")}/${review.username}`}
    >
      {review.photo ? (
        <Image
          alt={review.name}
          className="rounded-full"
          height={44}
          src={review.photo}
          width={44}
        />
      ) : null}
      <div className="w-full">
        <div className="flex w-full items-end justify-between gap-2">
          <div className="text-sm font-semibold text-gray-800 group-hover:underline">
            {review.name}
          </div>

          <Rating
            SVGclassName="inline-block"
            initialValue={review.rating}
            readonly
            size={20}
          />
        </div>
        <div className="ml-0.5 mt-1 text-sm  text-gray-600">
          {review.feedback}
        </div>
      </div>
    </Link>
  );
}
