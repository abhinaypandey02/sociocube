"use client";
import React from "react";
import { Rating } from "react-simple-star-rating";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import type {
  GetCurrentUserQuery,
  GetSellerQuery,
} from "../../../../__generated__/graphql";
import { getRoute } from "../../../../constants/routes";
import LinkWrapper from "../../../../components/link-wrapper";
import DeletePortfolioButton from "./delete-portfolio-button";

export default function Review({
  data,
  review,
  username,
}: {
  data?: GetCurrentUserQuery;
  review: NonNullable<
    NonNullable<GetSellerQuery["getSeller"]>
  >["reviews"][number];
  username: string;
}) {
  const photo = review.portfolio?.imageURL || review.photo;
  return (
    <div>
      <div className="flex items-start gap-3">
        {photo ? (
          <LinkWrapper
            className="relative shrink-0"
            href={
              review.portfolio?.link ||
              `${getRoute("Profile")}/${review.username}`
            }
          >
            <Image
              alt={review.name}
              className={classNames(
                review.portfolio?.imageURL
                  ? "rounded-md size-14"
                  : "rounded-full size-12",
                "object-cover  translate-y-1 ",
              )}
              height={44}
              src={photo}
              width={44}
            />

            {review.portfolio && data?.user?.username === username ? (
              <DeletePortfolioButton
                isLink={false}
                username={username}
                work={review.portfolio}
              />
            ) : null}
          </LinkWrapper>
        ) : null}
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
      </div>
    </div>
  );
}
