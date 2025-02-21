"use client";
import type { FormEvent } from "react";
import React, { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  SlidersHorizontal,
  MagnifyingGlass,
  Minus,
  Plus,
  Funnel,
  X,
} from "@phosphor-icons/react";
import Link from "next/link";
import { Input } from "ui/input";
import dynamic from "next/dynamic";
import Image from "next/image";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import type {
  SearchSellersFilters,
  SearchSellersQuery,
} from "../../../__generated__/graphql";
import { SearchFilterSorting } from "../../../__generated__/graphql";
import { getRoute } from "../../../constants/routes";
import { SEARCH_FILTERS } from "../constants";

const SearchLoading = dynamic(() => import("./search-loading"));
const NoResults = dynamic(() => import("./no-results"));
const MobileFilterPanel = dynamic(() => import("./mobile-filter-panel"));

const SORT_OPTIONS = [
  {
    id: SearchFilterSorting.FollowersAsc,
    label: "Followers (low to High)",
  },
  {
    id: SearchFilterSorting.FollowersDesc,
    label: "Followers (High to low)",
  },
  {
    id: SearchFilterSorting.PriceAsc,
    label: "Price (low to High)",
  },
  {
    id: SearchFilterSorting.PriceDesc,
    label: "Price (High to low)",
  },
];

export default function SearchWindow({
  data,
  filters,
}: {
  data: SearchSellersQuery | null;
  filters: SearchSellersFilters;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [variables, setVariables] = useState<SearchSellersFilters>(filters);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();

  useEffect(() => {
    setLoading(false);
  }, [data]);

  function handleUpdateParams(vars: SearchSellersFilters) {
    setLoading(true);
    const params = new URLSearchParams(vars as Record<string, string>);
    router.push(`${getRoute("Search")}?${params.toString()}`);
  }

  function handleChange(changesData: SearchSellersFilters) {
    setLoading(true);
    if (searchTimeout) clearTimeout(searchTimeout);
    const newVars = { ...variables, ...changesData };
    setVariables(newVars);
    setSearchTimeout(
      setTimeout(() => {
        handleUpdateParams(newVars);
      }, 1000),
    );
  }

  function handleSort(sortBy?: SearchFilterSorting) {
    const newVariables = { ...variables, sortBy };
    setVariables(newVariables);
    handleUpdateParams(newVariables);
  }

  function startSearch() {
    handleUpdateParams(variables);
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
        <div className="flex flex-wrap items-baseline justify-between gap-5 border-b border-gray-200 pb-6 pt-4 sm:pt-16">
          <h2 className="font-poppins text-3xl font-semibold text-gray-900 sm:text-4xl sm:font-bold">
            Find influencers
          </h2>

          <div className="flex w-72 items-center max-md:w-full">
            <Input
              className="grow"
              name="query"
              onChange={(e) => {
                setVariables((prev) => ({ ...prev, query: e.target.value }));
              }}
              placeholder="Search"
              value={variables.query || ""}
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
              <SlidersHorizontal aria-hidden="true" size={22} />
            </button>
            <Menu>
              <MenuButton>
                <button
                  className=" p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => {
                    setMobileFiltersOpen(true);
                  }}
                  type="button"
                >
                  <span className="sr-only">Filters</span>
                  <Funnel aria-hidden="true" size={22} />
                </button>
              </MenuButton>
              <Transition
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems
                  anchor="bottom end"
                  className=" mt-2 flex flex-col rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  {variables.sortBy ? (
                    <MenuItem>
                      <button
                        className="flex items-center justify-center gap-1 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          handleSort();
                        }}
                        type="button"
                      >
                        Clear filters <X />
                      </button>
                    </MenuItem>
                  ) : null}
                  {SORT_OPTIONS.map((option) => (
                    <MenuItem key={option.id}>
                      <button
                        className={classNames(
                          variables.sortBy === option.id ? "font-bold" : "",
                          " px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                        )}
                        onClick={() => {
                          handleSort(option.id);
                        }}
                        type="button"
                      >
                        {option.label}
                      </button>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Transition>
            </Menu>
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
                  <DisclosureButton
                    className="group flex w-full items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                    type="button"
                  >
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
              {data?.sellers?.length === 0 && !loading && <NoResults />}
              <ul className=" grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {!loading &&
                  data?.sellers?.map((person) => (
                    <li key={person.name || "jj"}>
                      <Link href={`${getRoute("Profile")}/${person.username}`}>
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
