import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCurrentUser, Injector, queryGQL } from "../../lib/apollo-server";
import { GET_ALL_POSTINGS } from "../../lib/queries";
import { convertToAbbreviation } from "../../lib/utils";
import { getRoute } from "../../constants/routes";
import { getSEO } from "../../constants/seo";
import AddPostingButton from "./components/add-posting-button";
import { getAgeGroup, getCurrency, getPlatforms } from "./utils";

export default async function PostingsPage() {
  const { postings } = await queryGQL(
    GET_ALL_POSTINGS,
    undefined,
    undefined,
    120,
    ["posting", "all-postings"],
  );
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8">
      <div className="flex  items-center justify-between gap-2">
        <h1 className="font-poppins text-3xl font-semibold text-gray-800 sm:text-4xl sm:font-bold ">
          Collaborations
        </h1>
        <Injector
          Component={AddPostingButton}
          fetch={getCurrentUser}
          props={{}}
        />
      </div>
      <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:mt-16 lg:grid-cols-3 xl:gap-x-8">
        {postings.map((posting) => (
          <Link
            className="overflow-hidden rounded-xl border border-gray-200 shadow-lg transition-transform duration-300 hover:scale-105"
            href={`${getRoute("Postings")}/${posting.id}`}
            key={posting.id}
          >
            <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
              {posting.user?.photo ? (
                <Image
                  alt={posting.user.companyName || posting.user.name || ""}
                  className="size-12 flex-none rounded-full bg-white object-cover ring-1 ring-gray-900/10"
                  height={48}
                  src={posting.user.photo}
                  width={48}
                />
              ) : null}
              <div>
                <div className="text-sm font-medium leading-6 text-gray-900">
                  {posting.title}
                </div>
                <small className="text-xs text-gray-600">
                  by{" "}
                  <em className="font-medium">
                    {posting.user?.companyName || posting.user?.name}
                  </em>
                </small>
              </div>
            </div>
            <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Platforms</dt>
                <dd className="text-gray-700">
                  {getPlatforms(posting.platforms)}
                </dd>
              </div>
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Payment</dt>
                <dd className="text-gray-700">
                  {getCurrency(posting.barter, posting.currency, posting.price)}
                </dd>
              </div>
              {posting.minimumFollowers ? (
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Minimum followers</dt>
                  <dd className="text-gray-700">
                    {convertToAbbreviation(posting.minimumFollowers)}
                  </dd>
                </div>
              ) : null}
              {posting.minimumAge || posting.maximumAge ? (
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Age group</dt>
                  <dd className="flex items-start gap-x-2">
                    {getAgeGroup(posting.minimumAge, posting.maximumAge)}
                  </dd>
                </div>
              ) : null}
            </dl>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export const metadata = getSEO("Find collaboration opportunities");
