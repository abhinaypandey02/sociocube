"use client";
import {
  ArrowRight,
  Cake,
  MagnifyingGlass,
  Users,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import type { GetFeaturedSellersQuery } from "@/__generated__/graphql";
import { renderRichText } from "@/app/(dashboard)/campaigns/components/posting-card";
import {
  getAgeGroup,
  getCurrency,
  getPlatforms,
} from "@/app/(dashboard)/campaigns/utils";
import { getRoute } from "@/constants/routes";
import { convertToAbbreviation } from "@/lib/utils";

import SectionWrapper from "./section-wrapper";

export default function JobPostings({
  postings,
}: {
  postings: GetFeaturedSellersQuery["postings"];
}) {
  return (
    <SectionWrapper
      description="Discover gigs and freelance jobs tailored for influencers. Apply now and start collaborating with top brands today!"
      headerElements={
        <Link
          className="flex items-center gap-2 pt-2 text-lg font-medium text-accent max-md:hidden"
          href={getRoute("Campaigns")}
        >
          See all active campaigns
          <ArrowRight />
        </Link>
      }
      id="collabs"
      title="Top Active Campaigns"
    >
      <ul className="mx-auto max-w-6xl divide-y divide-gray-100 grid lg:grid-cols-2 gap-5">
        {postings.map((posting) => (
          <Link
            href={`${getRoute("Campaigns")}/${posting.id}`}
            key={posting.id}
            className="flex hover:scale-[1.02] duration-500 transition-transform items-start shadow-md rounded-xl p-5 justify-between gap-3 max-lg:flex-wrap border border-gray-200"
          >
            <div>
              <h3 className="text-lg sm:text-xl flex items-center gap-2 font-medium leading-7 font-poppins text-gray-800 line-clamp-2">
                {posting.agency.photo && (
                  <Image
                    alt={posting.agency.name || ""}
                    className="size-8 rounded-full object-cover"
                    height={28}
                    src={posting.agency.photo}
                    width={28}
                  />
                )}
                {posting.title}
              </h3>

              <div
                className={
                  "flex flex-wrap items-center gap-3 mt-3 text-sm sm:text-base"
                }
              >
                <div>{getPlatforms(posting.platforms)}</div>

                {posting.price || posting.barter ? (
                  <>
                    <span className={"text-[10px] text-gray-500"}>•</span>
                    <div className={"flex items-center gap-1"}>
                      <Wallet />
                      {getCurrency(
                        posting.barter,
                        posting.currency,
                        posting.price,
                      )}
                    </div>
                  </>
                ) : null}
                {posting.minimumFollowers ? (
                  <>
                    <span className={"text-[10px] text-gray-500"}>•</span>
                    <div className={"flex items-center gap-1"}>
                      <Users />
                      {convertToAbbreviation(posting.minimumFollowers)}+
                    </div>
                  </>
                ) : null}
                {posting.minimumAge || posting.maximumAge ? (
                  <>
                    <span className={"text-[10px] text-gray-500"}>•</span>
                    <div className={"flex items-center gap-1"}>
                      <Cake />
                      {getAgeGroup(posting.minimumAge, posting.maximumAge)}
                    </div>
                  </>
                ) : null}

                {posting.applicationsCount ? (
                  <div className="flex items-center gap-1">
                    {posting.open ? (
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="size-1 rounded-full bg-emerald-500" />
                      </div>
                    ) : null}
                    <p className="text-xs text-gray-500">
                      {posting.applicationsCount}+ applications
                    </p>
                  </div>
                ) : null}
              </div>
              <dd
                className="text-sm leading-6 mt-3 text-gray-600 line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: renderRichText(posting.description),
                }}
              />
              {posting.deliverables ? (
                <div className="pt-2 sm:col-span-2 ">
                  <dt className=" font-semibold leading-6  text-sm text-gray-900">
                    Deliverables
                  </dt>
                  <dd className="text-sm  leading-6 text-gray-600 ">
                    {posting.deliverables.join(", ")}
                  </dd>
                </div>
              ) : null}
            </div>
          </Link>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm md:hidden">
        <MagnifyingGlass weight="bold" /> Looking for more?
        <Link
          className="flex items-center gap-2  font-medium text-accent "
          href={getRoute("Campaigns")}
        >
          See all active campaigns <ArrowRight />
        </Link>
      </div>
    </SectionWrapper>
  );
}
