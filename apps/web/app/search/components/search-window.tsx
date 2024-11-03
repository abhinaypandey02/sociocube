"use client";
import type { FC, FormEvent } from "react";
import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Funnel, MagnifyingGlass, Minus, Plus, X } from "@phosphor-icons/react";
import { useLazyQuery } from "@apollo/client";
import { Button } from "ui/button";
import Link from "next/link";
import Image from "next/image";
import { Input } from "ui/input";
import type { SearchSellers } from "../../../__generated__/graphql";
import { SEARCH_SELLERS } from "../../../lib/queries";
import { Route } from "../../../constants/routes";
import CountryFilter from "./country-filter";
import StartSearch from "./start-search";
import SearchLoading from "./search-loading";
import NoResults from "./no-results";
import GenderFilter from "./gender-filter";
import CategoryFilter from "./category-filter";
import PriceFilter from "./price-filter";
import FollowersFilter from "./followers-filter";
import AgeFilter from "./age-filter";

const filters: {
  name: string;
  component: FC<{
    onChange: (data: SearchSellers) => void;
  }>;
}[] = [
  {
    name: "Location",
    component: CountryFilter,
  },
  {
    name: "Genders",
    component: GenderFilter,
  },
  {
    name: "Categories",
    component: CategoryFilter,
  },
  {
    name: "Price",
    component: PriceFilter,
  },
  {
    name: "Followers",
    component: FollowersFilter,
  },
  {
    name: "Age",
    component: AgeFilter,
  },
];

export default function SearchWindow() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchSellers, { data, loading }] = useLazyQuery(SEARCH_SELLERS);
  const [variables, setVariables] = useState<SearchSellers>({});

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
      <Dialog
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
        open={mobileFiltersOpen}
      >
        <DialogBackdrop
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          transition
        />

        <div className=" fixed inset-0 z-40 flex">
          <DialogPanel
            className="relative ml-auto flex size-full max-w-xs flex-col overflow-y-auto bg-primary-bg py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            transition
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                className="-mr-2 flex size-10 items-center justify-center rounded-md p-2 text-gray-400"
                onClick={() => {
                  setMobileFiltersOpen(false);
                }}
                type="button"
              >
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4 border-t border-gray-200">
              {filters.map((section) => (
                <Disclosure
                  as="div"
                  className="border-t border-gray-200 px-4 py-6"
                  key={section.name}
                >
                  <h3 className=" flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between text-gray-400 hover:text-gray-500">
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
                  </h3>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              className=" ml-2  p-2 text-gray-400 hover:text-gray-500 lg:hidden"
              onClick={startSearch}
              type="button"
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
            <form className="hidden lg:block" onSubmit={handleSubmit}>
              <Button className="mb-4 w-full" type="submit">
                Search
              </Button>
              {filters.map((section) => (
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
            </form>

            {/* Product grid */}
            <div className=" lg:col-span-3">
              {!data && !loading && <StartSearch />}
              {loading ? <SearchLoading /> : null}
              {data?.sellers?.length === 0 && !loading && <NoResults />}
              <ul className=" grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data?.sellers?.map((person) => (
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
                        <p className="text-sm leading-9 text-gray-600">
                          Travel
                        </p>
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
      </main>
    </>
  );
}
