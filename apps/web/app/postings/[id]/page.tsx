import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { getCurrentUser, Injector, queryGQL } from "../../../lib/apollo-server";
import {
  GET_CURRENT_USER_APPLICATION_STATUS,
  GET_POSTING,
} from "../../../lib/queries";
import { convertToAbbreviation } from "../../../lib/utils";
import { getAgeGroup, getCurrency, getPlatforms } from "../utils";
import { renderRichText } from "../../../lib/rich-text";
import { getSEO } from "../../../constants/seo";
import AddPostingButton from "../components/add-posting-button";
import ApplyNowButton from "./apply-now-button";
import ManagePostingButton from "./manage-posting-button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = parseInt((await params).id);
  const { posting } = await queryGQL(
    GET_POSTING,
    {
      id,
    },
    undefined,
    120,
    ["posting"],
  );
  return getSEO(`Apply for ${posting?.title || ""}`, posting?.description);
}

export default async function JobPostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = parseInt((await params).id);
  const { posting } = await queryGQL(
    GET_POSTING,
    {
      id,
    },
    undefined,
    120,
    ["posting"],
  );
  if (!posting) return notFound();
  return (
    <div className="mx-auto mt-8 max-w-5xl px-4 sm:mt-16 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h3 className="text-2xl font-bold leading-7 text-gray-800 sm:text-3xl">
              {posting.title}
            </h3>
            <div className="mt-5 flex items-center gap-2">
              {posting.user?.photo ? (
                <Image
                  alt={posting.user.companyName || ""}
                  className="size-8 rounded-full"
                  height={40}
                  src={posting.user.photo}
                  width={40}
                />
              ) : null}
              <div>
                <p className="text-sm font-medium text-gray-600 sm:text-base">
                  {posting.user?.companyName || posting.user?.name}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 max-sm:w-full max-sm:flex-col-reverse max-sm:gap-5">
            <div className="flex items-center justify-end gap-1">
              <Injector
                Component={AddPostingButton}
                fetch={getCurrentUser}
                props={{ existingPosting: posting }}
              />
              <Injector
                Component={ManagePostingButton}
                fetch={async () =>
                  queryGQL(
                    GET_CURRENT_USER_APPLICATION_STATUS,
                    { postingID: id },
                    await cookies(),
                    0,
                  )
                }
                props={{ posting }}
              />
              <Injector
                Component={ApplyNowButton}
                fetch={async () =>
                  queryGQL(
                    GET_CURRENT_USER_APPLICATION_STATUS,
                    { postingID: id },
                    await cookies(),
                    0,
                  )
                }
                props={{ posting }}
              />
            </div>
            {!posting.externalLink && posting.applicationsCount ? (
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
      <div>
        <dl className="grid grid-cols-1 sm:grid-cols-2">
          <div className="px-4 py-6 sm:col-span-2 sm:px-0 sm:pt-10">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              About
            </dt>
            <dd className="mt-1 max-w-4xl text-sm leading-6 text-gray-700 sm:mt-2">
              {renderRichText(posting.description)}
            </dd>
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
              {getCurrency(posting.barter, posting.currency, posting.price)}
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
  );
}
