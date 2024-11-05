import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Route } from "../../constants/routes";
import type { GetFeaturedSellersQuery } from "../../__generated__/graphql";

export default function TopCreators({
  sellers,
}: {
  sellers: GetFeaturedSellersQuery["sellers"];
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 sm:my-16 lg:px-8" id="sellers">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
          Our Top Creators
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-800">
          Discover the influencers leading the way in engagement and creativity.
          Explore their profiles and see how they can elevate your brand through
          authentic collaborations!
        </p>
      </div>
      <ul className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
        {sellers.map((person) => (
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
                <p className="text-sm leading-9 text-gray-600">Travel</p>
              </div>
              <p className="truncate text-sm leading-6 text-gray-800">
                {person.bio}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
