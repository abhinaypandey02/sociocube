"use client";

import { MagicWand, MapPin, SealCheck } from "@phosphor-icons/react";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import React, { useEffect, useState } from "react";

import type {
  SearchSellersFilters,
  SearchSellersQuery,
} from "@/__generated__/graphql";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import LinkWrapper from "@/components/link-wrapper";
import LoaderSkeleton from "@/components/loader-skeleton";
import { getRoute } from "@/constants/routes";
import { useToken } from "@/lib/auth-client";
import { convertToAbbreviation } from "@/lib/utils";

const NoResults = dynamic(() => import("./no-results"));
export default function SearchWindow({
  data,
}: {
  data?: {
    response: SearchSellersQuery | null;
    filters: SearchSellersFilters;
  };
}) {
  const token = useToken();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [variables, setVariables] = useState<SearchSellersFilters>(
    data?.filters || {},
  );

  const searchURL = `${getRoute("Search")}${
    variables?.query ? `?query=${variables.query}` : ""
  }`;

  useEffect(() => {
    if (data) {
      setLoading(false);
      setVariables(data.filters);
    }
  }, [data]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    router.push(searchURL);
  }

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <div className="flex items-stretch justify-between gap-2 border-b border-gray-200 pb-6 pt-4">
          <Input
            disabled={loading}
            className="grow"
            name="query"
            onChange={(e) => {
              setVariables((prev) => ({ ...prev, query: e.target.value }));
            }}
            placeholder="Describe your requirements to AI"
            value={variables.query || ""}
          />
          <LinkWrapper
            className="shrink-0 flex"
            href={token ? searchURL : getRoute("SignUp")}
          >
            <Button
              onClick={() => setLoading(true)}
              loading={loading}
              className="shrink-0 gap-1"
              type="submit"
            >
              <span className="max-sm:hidden">AI Search</span>
              <MagicWand className="shrink-0" />
            </Button>
          </LinkWrapper>
        </div>

        <section className="pt-6 pb-16 lg:col-span-3">
          {loading ? <LoaderSkeleton /> : null}
          {data?.response?.sellers?.length === 0 && !loading && <NoResults />}
          <ul className="space-y-5">
            {!loading && data?.filters.query && (
              <div className="text-sm text-center">
                Search is limited to <strong>5</strong> creators in the free
                plan.
              </div>
            )}
            {!loading &&
              data?.response?.sellers?.map((person) => (
                <li key={person.name || ""}>
                  <Link
                    className="flex items-center gap-3 rounded-md px-4 py-3 hover:shadow-sm"
                    href={`${getRoute("Profile")}/${person.username}`}
                  >
                    <Image
                      alt={person.name || ""}
                      className="size-16 shrink-0 rounded-full object-cover sm:size-20"
                      height={80}
                      src={person.photo || ""}
                      width={80}
                    />
                    <div className="min-w-0 grow">
                      <div className="flex flex-wrap items-stretch justify-between">
                        <div>
                          <h3 className=" flex items-center gap-1.5  text-lg font-semibold  ">
                            {person.name || ""}
                            {person.instagramStats?.isVerified ? (
                              <SealCheck
                                className="text-primary"
                                size={16}
                                weight="fill"
                              />
                            ) : null}
                          </h3>
                          <div className="mt-0.5  font-poppins text-xs font-medium text-primary max-sm:w-full">
                            {person.category}
                          </div>
                          <p className="mt-1 flex flex-wrap items-center gap-1 truncate text-sm leading-6 text-gray-800">
                            <InstagramLogo weight="bold" />
                            {convertToAbbreviation(
                              person.instagramStats?.followers || 0,
                            )}

                            {person.pricing ? (
                              <>
                                {" "}
                                •{" "}
                                <span className="">
                                  {person.location?.currency}
                                  {person.pricing.starting}
                                </span>
                              </>
                            ) : null}
                          </p>
                        </div>

                        <div className="mt-0.5 flex items-center gap-1 text-[13px] text-gray-700 sm:text-end">
                          <MapPin />
                          {person.location?.city}, {person.location?.country}
                        </div>
                      </div>

                      <p className="mt-1 truncate text-xs  text-gray-400 max-sm:hidden">
                        {person.bio}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </form>
    </>
  );
}
