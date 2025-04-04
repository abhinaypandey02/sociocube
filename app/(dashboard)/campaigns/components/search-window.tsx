import React from "react";
import { SealCheck } from "@phosphor-icons/react/dist/ssr";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import type { GetAllPostingsQuery } from "@/__generated__/graphql";
import { convertToAbbreviation } from "@/lib/utils";
import { getRoute } from "@/constants/routes";
import { Injector, queryGQL } from "@/lib/apollo-server";
import ApplyNowButton from "@/app/(dashboard)/campaigns/[id]/apply-now-button";
import {
  GET_CURRENT_USER_APPLICATION_STATUS,
  GET_POSTING_REVIEWS,
} from "@/lib/queries";
import PostingReviews from "@/app/(dashboard)/campaigns/[id]/posting-reviews";
import { renderRichText } from "@/lib/util-components";
import { getAgeGroup, getCurrency, getPlatforms } from "../utils";
import SearchLoading from "./search-loading";

const NoResults = dynamic(() => import("./no-results"));

export default function SearchWindow({
  data,
  loading,
}: {
  data: GetAllPostingsQuery | null;
  loading: boolean;
}) {
  return (
    <ul
      aria-labelledby="products-heading"
      className="h-full snap-y snap-mandatory snap-always overflow-auto"
    >
      {loading ? <SearchLoading /> : null}
      {data?.postings.length === 0 && !loading && <NoResults />}
      {!loading &&
        data?.postings.map((posting) => (
          <div className="h-full snap-start py-5" key={posting.id}>
            <div className="h-full border-gray-200 bg-primary-bg px-4 lg:rounded-xl lg:border lg:p-8 lg:shadow-md">
              <div className="px-4 sm:px-0">
                <div className="flex items-start justify-between gap-5 max-lg:flex-wrap">
                  <div>
                    <h3 className="text-2xl font-semibold leading-7 text-gray-800 sm:text-3xl">
                      {posting.title}
                    </h3>
                    <Link
                      className="group mt-5 flex items-center gap-3"
                      href={`${getRoute("Profile")}/${posting.agency.username}`}
                    >
                      {posting.agency.photo ? (
                        <Image
                          alt={posting.agency.name || ""}
                          className="size-8 rounded-full object-cover"
                          height={40}
                          src={posting.agency.photo}
                          width={40}
                        />
                      ) : null}
                      <div>
                        <p className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-600 underline-offset-2 group-hover:underline sm:text-base">
                            {posting.agency.name}
                          </span>
                          {posting.agency.instagramStats?.isVerified ? (
                            <SealCheck className="text-primary" weight="fill" />
                          ) : null}
                        </p>
                      </div>
                    </Link>
                  </div>
                  <div className="flex shrink-0 flex-col gap-3 max-sm:w-full max-sm:flex-col-reverse max-sm:gap-5">
                    <div className="flex items-center lg:flex-row-reverse lg:gap-4">
                      <Injector
                        Component={ApplyNowButton}
                        fetch={async () =>
                          queryGQL(
                            GET_CURRENT_USER_APPLICATION_STATUS,
                            { postingID: posting.id },
                            await cookies(),
                            0,
                          )
                        }
                        props={{ posting }}
                      />
                    </div>
                    {posting.applicationsCount ? (
                      <div className="flex items-center gap-2 sm:justify-end">
                        {posting.open ? (
                          <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div className="size-1.5 rounded-full bg-emerald-500" />
                          </div>
                        ) : null}
                        <p className="text-sm text-gray-500">
                          {posting.applicationsCount}+ applications
                        </p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <Injector
                Component={PostingReviews}
                fetch={() =>
                  queryGQL(
                    GET_POSTING_REVIEWS,
                    { id: posting.id },
                    undefined,
                    120,
                  )
                }
              />
              <div>
                <dl className="grid grid-cols-1 sm:grid-cols-2">
                  <div className="px-4 py-6 sm:col-span-2 sm:px-0 sm:pt-10">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      About
                    </dt>
                    <dd
                      className="mt-1 max-w-4xl text-sm leading-6 text-gray-700 sm:mt-2"
                      dangerouslySetInnerHTML={{
                        __html: renderRichText(posting.description),
                      }}
                    />
                  </div>
                  {posting.deliverables ? (
                    <div className="px-4 pb-6 sm:col-span-2 sm:px-0 ">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Deliverables
                      </dt>
                      <dd className="mt-1 max-w-4xl text-sm leading-6 text-gray-700 sm:mt-2">
                        <ul className="list-disc pl-3">
                          {posting.deliverables.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  ) : null}
                  <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Platforms
                    </dt>
                    <dd className="mt-1 flex gap-2 text-sm leading-6 text-gray-700 sm:mt-2">
                      {getPlatforms(posting.platforms)}
                    </dd>
                  </div>
                  <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Payment
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                      {getCurrency(
                        posting.barter,
                        posting.currency,
                        posting.price,
                      )}
                    </dd>
                  </div>
                  {posting.minimumFollowers ? (
                    <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Minimum followers
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                        {posting.minimumFollowers
                          ? convertToAbbreviation(posting.minimumFollowers)
                          : "No limit"}
                      </dd>
                    </div>
                  ) : null}
                  {posting.minimumAge || posting.maximumAge ? (
                    <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        Age group
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                        {getAgeGroup(posting.minimumAge, posting.maximumAge)}
                      </dd>
                    </div>
                  ) : null}
                  <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">
                      Updated at
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                      {new Date(posting.updatedAt).toLocaleDateString()}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        ))}
    </ul>
  );
}
