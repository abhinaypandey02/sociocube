"use client";
import React from "react";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";
import type { GetPostingReviewsQuery } from "@/__generated__/graphql";
import { getRoute } from "@/constants/routes";
import LinkWrapper from "../../../components/link-wrapper";

export default function PostingReviews({
  data,
}: {
  data?: GetPostingReviewsQuery;
}) {
  if (!data?.posting?.reviews.length) return null;
  return (
    <div className="mt-10 px-4 sm:px-0">
      <h3 className="text-sm font-medium leading-6 text-gray-900">
        Submissions
      </h3>
      <div className="mt-2 flex w-full gap-4 overflow-auto">
        {data.posting.reviews.map(
          (review) =>
            review.portfolio?.imageURL && (
              <div
                className="relative shrink-0"
                key={review.portfolio.imageURL}
              >
                <LinkWrapper href={review.portfolio.link}>
                  <Image
                    alt=""
                    className=" w-32 rounded-md"
                    height={130}
                    src={review.portfolio.imageURL}
                    width={130}
                  />
                </LinkWrapper>
                <Link
                  className="absolute bottom-0 flex w-full items-center justify-center gap-2 rounded-b-md bg-[rgba(0,0,0,0.15)] py-1 text-xs text-white backdrop-blur-sm"
                  href={`${getRoute("Profile")}/${review.username}`}
                >
                  {review.photo ? (
                    <Image
                      alt={review.username}
                      className="rounded-full border border-white"
                      height={24}
                      src={review.photo}
                      width={24}
                    />
                  ) : null}
                  <Rating
                    SVGclassName="inline-block"
                    className="-translate-y-0.5"
                    initialValue={review.rating || 5}
                    readonly
                    size={14}
                  />
                </Link>
              </div>
            ),
        )}
      </div>
    </div>
  );
}
