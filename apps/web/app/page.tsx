import Image from "next/image";
import { Button } from "ui/button";
import Link from "next/link";
import React from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { queryGQL } from "../lib/apollo-server";
import { GET_FEATURED_SELLERS } from "../lib/queries";
import { Route } from "../constants/routes";
import Faqs from "./components/faqs";

export const revalidate = 120;
async function Page() {
  const { sellers } = await queryGQL(
    GET_FEATURED_SELLERS,
    undefined,
    undefined,
    60,
  );
  const sellersToShow = sellers.filter((seller) => seller.photo && seller.bio);
  const heroSellers = [];
  for (let i = 0; heroSellers.length < 7; i++)
    heroSellers.push(sellersToShow[i % sellersToShow.length]);

  return (
    <main>
      <header className="relative overflow-hidden">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Influencers that freelance
              </h1>
              <p className="mt-4 text-xl text-gray-500">
                This year, our new summer collection will shelter you from the
                harsh elements of a world that doesn't care if you live or die.
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <Image
                            alt={heroSellers[0]?.name || ""}
                            className="size-full object-cover object-center"
                            height={256}
                            src={heroSellers[0]?.photo || ""}
                            width={176}
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            alt={heroSellers[1]?.name || ""}
                            className="size-full object-cover object-center"
                            height={256}
                            src={heroSellers[1]?.photo || ""}
                            width={176}
                          />
                        </div>
                      </div>
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            alt={heroSellers[2]?.name || ""}
                            className="size-full object-cover object-center"
                            height={256}
                            src={heroSellers[2]?.photo || ""}
                            width={176}
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            alt={heroSellers[3]?.name || ""}
                            className="size-full object-cover object-center"
                            height={256}
                            src={heroSellers[3]?.photo || ""}
                            width={176}
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            alt={heroSellers[4]?.name || ""}
                            className="size-full object-cover object-center"
                            height={256}
                            src={heroSellers[4]?.photo || ""}
                            width={176}
                          />
                        </div>
                      </div>
                      <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            alt={heroSellers[5]?.name || ""}
                            className="size-full object-cover object-center"
                            height={256}
                            src={heroSellers[5]?.photo || ""}
                            width={176}
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <Image
                            alt={heroSellers[6]?.name || ""}
                            className="size-full object-cover object-center"
                            height={256}
                            src={heroSellers[6]?.photo || ""}
                            width={176}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="#sellers">
                  <Button className="flex items-center gap-2">
                    Find Sellers <ArrowRight size={16} />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div
        className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8"
        id="sellers"
      >
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
            Our team
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-800">
            Excepturi repudiandae alias ut. Totam aut facilis. Praesentium in
            neque vel omnis. Eos error odio. Qui fugit voluptatibus eum culpa.
          </p>
        </div>
        <ul className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
          {heroSellers.map(
            (person) =>
              person && (
                <li key={person.name}>
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
                        {person.name}
                      </h3>
                      <p className="text-sm leading-9 text-gray-600">Travel</p>
                    </div>
                    <p className="truncate text-sm leading-6 text-gray-800">
                      {person.bio}
                    </p>
                  </Link>
                </li>
              ),
          )}
        </ul>
      </div>
      <Faqs />
    </main>
  );
}

export default Page;
