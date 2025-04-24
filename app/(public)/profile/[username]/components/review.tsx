"use client";
import Link from "next/link";
import React from "react";
import { Rating } from "react-simple-star-rating";

import type { GetSellerQuery } from "@/__generated__/graphql";
import { getRoute } from "@/constants/routes";

export default function Review({
  review,
}: {
  review: NonNullable<
    NonNullable<GetSellerQuery["getSeller"]>
  >["reviews"][number];
}) {
  return (
    <Link
      className="group w-full"
      href={`${getRoute("Profile")}/${review.username}`}
    >
      <div className="flex w-full flex-wrap items-end justify-between gap-x-1 ">
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
      <div className="ml-0.5 mt-1 text-xs italic text-gray-600 sm:mt-1.5 sm:text-[13px]">
        "{review.feedback}"
      </div>
    </Link>
  );
}
