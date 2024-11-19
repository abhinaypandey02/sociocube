"use client";
import type { FormEvent } from "react";
import React, { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Funnel, MagnifyingGlass, Minus, Plus } from "@phosphor-icons/react";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import { Input } from "ui/input";
import dynamic from "next/dynamic";
import type {
  SearchSellers,
  SearchSellersQuery,
} from "../../../__generated__/graphql";
import { SEARCH_SELLERS } from "../../../lib/queries";
import { Route } from "../../../constants/routes";
import { SEARCH_FILTERS } from "../constants";

const SearchLoading = dynamic(() => import("./search-loading"));
const NoResults = dynamic(() => import("./no-results"));
const MobileFilterPanel = dynamic(() => import("./mobile-filter-panel"));

export default function SearchWindow({
  defaultData,
}: {
  defaultData: SearchSellersQuery;
}) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchSellers, { data: fetchedData, loading }] =
    useLazyQuery(SEARCH_SELLERS);
  const [variables, setVariables] = useState<SearchSellers>({});
  const data = fetchedData || defaultData;
  function handleChange(changesData: SearchSellers) {
    setVariables((prev) => ({ ...prev, ...changesData }));
  }

  function startSearch() {
    void searchSellers({
      variables: { data: variables },
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startSearch();
  }

  return (
    <>
      {/* Mobile filter dialog */}
      <MobileFilterPanel
        close={() => {
          setMobileFiltersOpen(false);
        }}
        handleChange={handleChange}
        isOpen={mobileFiltersOpen}
      />
      <form
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-5 border-b border-gray-200 pb-6 pt-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Find influencers
          </h1>

          <div className="flex w-72 items-center max-md:w-full">
            <Input
              className="grow"
              name="query"
              onChange={(e) => {
                setVariables((prev) => ({ ...prev, query: e.target.value }));
              }}
              placeholder="Search"
            />

            <button
              className=" ml-2  p-2 text-gray-400 hover:text-gray-500 "
              type="submit"
            >
              <span className="sr-only">Search</span>
              <MagnifyingGlass size={22} weight="bold" />
            </button>
            <button
              className=" p-2 text-gray-400 hover:text-gray-500 lg:hidden"
              onClick={() => {
                setMobileFiltersOpen(true);
              }}
              type="button"
            >
              <span className="sr-only">Filters</span>
              <Funnel aria-hidden="true" size={20} />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <div className="-mt-4 hidden lg:block">
              {SEARCH_FILTERS.map((section) => (
                <Disclosure
                  as="div"
                  className="border-b border-gray-200 py-6"
                  key={section.name}
                >
                  <DisclosureButton className="group flex w-full items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      <Plus
                        aria-hidden="true"
                        className="size-5 group-data-[open]:hidden"
                      />
                      <Minus
                        aria-hidden="true"
                        className="size-5 [.group:not([data-open])_&]:hidden"
                      />
                    </span>
                  </DisclosureButton>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-4">
                      <section.component onChange={handleChange} />
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </div>

            {/* Product grid */}
            <div className=" lg:col-span-3">
              {loading ? <SearchLoading /> : null}
              {data.sellers?.length === 0 && !loading && <NoResults />}
              <ul className=" grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data.sellers?.map((person) => (
                  <li key={person.name || ""}>
                    <Link href={`${Route.Profile}/${person.id}`}>
                      <Image
                        alt={person.name || ""}
                        className="aspect-[14/13] w-full rounded-2xl object-cover"
                        height={260}
                        src={person.photo || ""}
                        width={280}
                      />
                      <div className="mt-2 flex flex-wrap items-center justify-between">
                        <h3 className=" truncate text-xl font-semibold leading-9 tracking-tight ">
                          {person.name || ""}
                        </h3>
                      </div>
                      <p className="truncate text-sm leading-6 text-gray-800">
                        {person.bio}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
