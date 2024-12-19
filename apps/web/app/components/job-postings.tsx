import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import type { GetFeaturedSellersQuery } from "../../__generated__/graphql";
import { getRoute } from "../../constants/routes";
import { convertToAbbreviation } from "../../lib/utils";

export default function JobPostings({
  postings,
}: {
  postings: GetFeaturedSellersQuery["postings"];
}) {
  return (
    <div className=" py-16 sm:my-16" id="how-it-works">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 lg:mx-0">
          <h2 className="font-poppins text-3xl font-bold  sm:text-4xl">
            Exciting Opportunities
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-800">
            Discover gigs and freelance jobs tailored for influencers. Apply now
            and start collaborating with top brands today!
          </p>
        </div>
        <ul className="mx-auto max-w-6xl divide-y divide-gray-100 ">
          {postings.map((posting) => (
            <li
              className="relative flex justify-between gap-x-6 rounded-xl px-5 py-7 transition-all duration-300 hover:bg-white hover:shadow"
              key={posting.id}
            >
              <div className="flex min-w-0 gap-x-4">
                {posting.user?.photo ? (
                  <Image
                    alt={posting.user.companyName || ""}
                    className="size-12 flex-none rounded-full bg-gray-50"
                    height={48}
                    src={posting.user.photo}
                    width={48}
                  />
                ) : null}
                <div className="min-w-0 flex-auto">
                  <p className="text-lg font-semibold leading-6 text-gray-900">
                    <Link href={`${getRoute("Postings")}/${posting.id}`}>
                      <span className="absolute inset-x-0 -top-px bottom-0" />
                      {posting.title}
                    </Link>
                  </p>
                  <p className="mt-1 line-clamp-1 flex text-xs leading-5 text-gray-500">
                    {posting.user?.companyName} • Age group:{" "}
                    {posting.minimumAge} - {posting.maximumAge} • Min followers:{" "}
                    {convertToAbbreviation(posting.minimumInstagramFollower)}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-x-4">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    {posting.barter
                      ? "Barter"
                      : `${posting.currency} ${posting.price}`}
                  </p>
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                      <div className="size-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="text-xs leading-5 text-gray-500">
                      {`${posting.applicationsCount}+ applications`}
                    </p>
                  </div>
                </div>
                <ArrowRight
                  aria-hidden="true"
                  className="size-5 flex-none text-gray-400"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
