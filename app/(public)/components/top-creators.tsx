import {
  ArrowRight,
  Dot,
  InstagramLogo,
  MagnifyingGlass,
  SealCheck,
  TrendUp,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import type { GetFeaturedSellersQuery } from "@/__generated__/graphql";
import { getRoute } from "@/constants/routes";
import { convertToAbbreviation } from "@/lib/utils";

import SectionWrapper from "./section-wrapper";

export default function TopCreators({
  sellers,
}: {
  sellers: GetFeaturedSellersQuery["sellers"];
}) {
  return (
    <SectionWrapper
      description="Discover the influencers leading the way in engagement and  creativity. Explore their profiles and see how they can elevate your brand through authentic collaborations!"
      headerElements={
        <Link
          className="flex items-center gap-2 pt-2 text-lg font-medium text-accent max-md:hidden"
          href={getRoute("Search")}
        >
          Search all <ArrowRight />
        </Link>
      }
      id="sellers"
      title="Our Top Creators"
    >
      <ul className="mx-auto grid max-w-2xl gap-y-10 sm:gap-y-16 max-sm:gap-x-10 grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
        {sellers.map(
          (person, i) =>
            person.instagramStats && (
              <li
                className={i >= 8 ? "hidden lg:block xl:hidden" : ""}
                key={person.name || ""}
              >
                <Link
                  href={`${getRoute("Profile")}/${person.username}`}
                  prefetch
                >
                  <Image
                    alt={person.name || ""}
                    className="mx-auto aspect-square w-32 sm:w-48 rounded-full object-cover"
                    height={150}
                    src={person.photo || ""}
                    width={150}
                  />
                  <div className="mt-2">
                    <div className="flex items-center justify-center gap-2 overflow-hidden text-lg sm:text-2xl">
                      <h3 className=" truncate font-poppins  font-semibold  ">
                        {person.name?.split(" ")[0] || ""}{" "}
                      </h3>
                      {person.instagramStats.isVerified ? (
                        <SealCheck
                          className="shrink-0 text-accent"
                          weight="fill"
                        />
                      ) : null}
                    </div>
                    <div className="font-medium text-gray-500 text-sm text-center">
                      {person.category}
                    </div>

                    <div className="mt-1 items-center justify-center text-xs text-gray-600 flex">
                      <span className="flex items-center gap-1">
                        <InstagramLogo size={16} />
                        {convertToAbbreviation(
                          person.instagramStats.followers || 0,
                        )}
                      </span>
                      <Dot weight="bold" />
                      <span className="flex items-center gap-1">
                        <TrendUp size={16} />
                        {Math.max(person.instagramStats.er, 1.1)}%
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ),
        )}
      </ul>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm md:hidden">
        <MagnifyingGlass weight="bold" /> Need something specific?
        <Link
          className="flex items-center gap-2  font-medium text-accent "
          href={getRoute("Search")}
        >
          Find more <ArrowRight />
        </Link>
      </div>
    </SectionWrapper>
  );
}
