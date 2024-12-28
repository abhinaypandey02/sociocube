import React from "react";
import Image from "next/image";
import Link from "next/link";
import { queryGQL } from "../../lib/apollo-server";
import { GET_ALL_POSTINGS } from "../../lib/queries";
import { convertToAbbreviation } from "../../lib/utils";
import { getRoute } from "../../constants/routes";

export default async function PostingsPage() {
  const { postings } = await queryGQL(GET_ALL_POSTINGS);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="my-16 font-poppins text-4xl font-semibold text-gray-800 ">
          Collaboration opportunities
        </h1>
        {/*<Injector Component={AddPostingButton} fetch={getCurrentUser} />*/}
      </div>
      <ul className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
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
                <dt className="text-gray-500">Payment</dt>
                <dd className="text-gray-700">
                  {posting.barter
                    ? "Barter"
                    : `${posting.currency} ${posting.price}`}
                </dd>
              </div>
              {posting.minimumInstagramFollower ? (
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-500">Minimum followers</dt>
                  <dd className="text-gray-700">
                    {convertToAbbreviation(posting.minimumInstagramFollower)}
                  </dd>
                </div>
              ) : null}
              <div className="flex justify-between gap-x-4 py-3">
                <dt className="text-gray-500">Updated at</dt>
                <dd className="flex items-start gap-x-2">
                  {new Date(posting.updatedAt).toDateString()}
                </dd>
              </div>
            </dl>
          </Link>
        ))}
      </ul>
    </div>
  );
}
