import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  MagnifyingGlass,
  SealCheck,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { getRoute } from "../../constants/routes";
import type { GetFeaturedSellersQuery } from "../../__generated__/graphql";
import SectionWrapper from "./section-wrapper";

export default function TopAgencies({
  agencies,
}: {
  agencies: GetFeaturedSellersQuery["agencies"];
}) {
  return (
    <SectionWrapper
      description="Explore the brands and agencies setting the standard for impactful collaborations. Discover their campaigns and see how they connect with top influencers to create meaningful partnerships!"
      headerElements={
        <Link
          className="flex items-center gap-2 pt-2 text-lg font-medium text-accent max-md:hidden"
          href={getRoute("Postings")}
        >
          Search all <ArrowRight />
        </Link>
      }
      id="sellers"
      title="Top brands and agencies"
    >
      <ul className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
        {agencies.map((person, i) => (
          <li
            className={i >= 8 ? "hidden lg:block xl:hidden" : ""}
            key={person.name || ""}
          >
            <Link href={`${getRoute("Profile")}/${person.username}`} prefetch>
              <Image
                alt={person.name || ""}
                className=" w-full rounded-full object-cover"
                height={240}
                src={person.photo || ""}
                width={240}
              />
              <div className="mt-2">
                <div className="flex items-center justify-center gap-2 overflow-hidden text-xl">
                  <h3 className=" truncate font-poppins  font-semibold  ">
                    {person.name || ""}{" "}
                  </h3>
                  {person.instagramStats?.isVerified ? (
                    <SealCheck
                      className="shrink-0 text-primary"
                      weight="fill"
                    />
                  ) : null}
                </div>
                <p className="mt-1  text-center text-xs font-medium text-gray-500">
                  {person.category}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm md:hidden">
        <MagnifyingGlass weight="bold" /> Need something specific?
        <Link
          className="flex items-center gap-2  font-medium text-accent "
          href={getRoute("Postings")}
        >
          Find more <ArrowRight />
        </Link>
      </div>
    </SectionWrapper>
  );
}
