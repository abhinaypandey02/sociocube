"use client";
import React, { useEffect, useState } from "react";
import { CurrencyCircleDollar, SealCheck } from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { GetAllPostingsQuery } from "@/__generated__/graphql";
import { convertToAbbreviation } from "@/lib/utils";
import { Button } from "@/components/button";
import { getAgeGroup, getCurrency } from "../utils";
import SearchLoading from "./search-loading";

const NoResults = dynamic(() => import("./no-results"));

export default function SearchWindow({
  data,
}: {
  data: GetAllPostingsQuery | null;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);

  return (
    <ul
      aria-labelledby="products-heading"
      className="h-full snap-y snap-mandatory snap-always overflow-auto"
    >
      {loading ? <SearchLoading /> : null}
      {data?.postings.length === 0 && !loading && <NoResults />}
      {!loading &&
        data?.postings.map((posting, i) => (
          <li
            className="flex h-full snap-start flex-col justify-between"
            id={posting.id.toString()}
            key={posting.id}
          >
            <Image
              alt={posting.agency.name || ""}
              className="size-16 shrink-0 rounded-full object-cover sm:size-20"
              height={80}
              src={posting.agency.photo || ""}
              width={80}
            />
            <div className="min-w-0 grow">
              <div className="flex flex-wrap items-start justify-between">
                <div>
                  <h3 className="  gap-1.5  text-lg font-semibold  ">
                    {posting.title}{" "}
                    {posting.barter ? null : (
                      <CurrencyCircleDollar
                        className="inline-block text-primary"
                        size={22}
                        weight="fill"
                      />
                    )}
                  </h3>
                  <div className="mt-0.5 flex items-center gap-1 font-poppins text-xs font-medium text-primary max-sm:w-full">
                    {posting.agency.name}{" "}
                    {posting.agency.instagramStats?.isVerified ? (
                      <SealCheck className="text-primary" weight="fill" />
                    ) : null}
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-1 truncate text-xs leading-6 text-gray-800">
                    {getAgeGroup(posting.minimumAge, posting.maximumAge)}
                    {(posting.minimumAge || posting.maximumAge) &&
                    posting.minimumFollowers
                      ? " • "
                      : ""}
                    {posting.minimumFollowers
                      ? `Min followers: ${convertToAbbreviation(posting.minimumFollowers)}`
                      : null}
                  </p>
                </div>
                <div className="items-center gap-2 max-sm:flex">
                  <div className="mt-0.5 gap-1 text-sm font-medium text-gray-700 sm:text-end">
                    {getCurrency(
                      posting.barter,
                      posting.currency,
                      posting.price,
                    )}
                  </div>
                  {posting.applicationsCount ? (
                    <div className="mt-1 flex items-center gap-x-1.5">
                      <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                        <div className="size-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-xs leading-5 text-gray-500">
                        {`${posting.applicationsCount}+ applications`}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Image
                  alt={posting.agency.name || ""}
                  className="size-9 shrink-0 rounded-full object-cover sm:size-20"
                  height={30}
                  src={posting.agency.photo || ""}
                  width={30}
                />
                <div className="flex items-center gap-2">
                  {posting.agency.name}{" "}
                  {posting.agency.instagramStats?.isVerified ? (
                    <SealCheck className="text-primary" weight="fill" />
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <a href={`#${data.postings[i + 1]?.id}`}>
                  <Button invert>Skip</Button>
                </a>
                <Button>Apply</Button>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}
