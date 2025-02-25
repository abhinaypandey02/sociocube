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
  CurrencyCircleDollar,
  Funnel,
  MagnifyingGlass,
  Minus,
  Plus,
  SealCheck,
  SlidersHorizontal,
  X,
} from "@phosphor-icons/react";
import Link from "next/link";
import { Input } from "ui/input";
import dynamic from "next/dynamic";
import Image from "next/image";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import type {
  GetAllPostingsQuery,
  SearchPostingsFilters,
} from "../../../__generated__/graphql";
import { SearchPostingsSorting } from "../../../__generated__/graphql";
import { getRoute } from "../../../constants/routes";
import { getAgeGroup, getCurrency } from "../utils";
import { convertToAbbreviation } from "../../../lib/utils";
import SearchLoading from "./search-loading";
import { SEARCH_POSTINGS_FILTERS } from "./constants";

const NoResults = dynamic(() => import("./no-results"));
const MobileFilterPanel = dynamic(() => import("./mobile-filter-panel"));

const SORT_OPTIONS = [
  {
    id: SearchPostingsSorting.Trending,
    label: "Trending (High to low)",
  },
  {
    id: SearchPostingsSorting.PriceDesc,
    label: "Price (High to low)",
  },
];

export default function SearchWindow({
  data,
  filters,
}: {
  data: GetAllPostingsQuery | null;
  filters: SearchPostingsFilters;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [variables, setVariables] = useState<SearchPostingsFilters>(filters);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);

  function handleUpdateParams(vars: SearchPostingsFilters) {
    setLoading(true);
    const params = new URLSearchParams(vars as Record<string, string>);
    router.push(`${getRoute("Postings")}?${params.toString()}`);
  }

  function handleChange(changesData: SearchPostingsFilters) {
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

  function handleSort(sortBy?: SearchPostingsSorting) {
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
        variables={variables}
      />
      <form
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-5 border-b border-gray-200 pb-6 pt-4 sm:pt-16">
          <h2 className="font-poppins text-3xl font-semibold text-gray-900 sm:text-4xl sm:font-bold">
            Find campaigns
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
                        Clear <X />
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
              {SEARCH_POSTINGS_FILTERS.map((section) => (
                <Disclosure
                  as="div"
                  className="border-b border-gray-200 py-6"
                  key={section.name}
                >
                  <DisclosureButton
                    className="group flex w-full items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                    type="button"
                  >
                    <span className="flex items-center gap-2 font-medium text-gray-900">
                      {section.name}
                      {section.keys.some((key) => variables[key]) ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const newVariables = { ...variables };
                            section.keys.forEach(
                              // eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- i can do it
                              (key) => delete newVariables[key],
                            );
                            setVariables(newVariables);
                            handleUpdateParams(newVariables);
                          }}
                          type="button"
                        >
                          <X />
                        </button>
                      ) : null}
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
                      <section.component
                        onChange={handleChange}
                        variables={variables}
                      />
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </div>

            {/* Product grid */}
            <div className=" lg:col-span-3">
              {loading ? <SearchLoading /> : null}
              {data?.postings.length === 0 && !loading && <NoResults />}
              <ul className="space-y-5">
                {!loading &&
                  data?.postings.map((posting) => (
                    <li key={posting.id}>
                      <Link
                        className="flex items-center gap-3 rounded-md px-4 py-3 hover:shadow"
                        href={`${getRoute("Postings")}/${posting.id}`}
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
                                  <SealCheck
                                    className="text-primary"
                                    weight="fill"
                                  />
                                ) : null}
                              </div>
                              <p className="mt-1 flex flex-wrap items-center gap-1 truncate text-xs leading-6 text-gray-800">
                                {getAgeGroup(
                                  posting.minimumAge,
                                  posting.maximumAge,
                                )}
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
