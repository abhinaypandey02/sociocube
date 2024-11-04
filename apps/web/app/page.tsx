import Image from "next/image";
import { Button, Variants } from "ui/button";
import Link from "next/link";
import React from "react";
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
  for (let i = 0; heroSellers.length < 5; i++)
    heroSellers.push(sellersToShow[i % sellersToShow.length]);

  return (
    <main>
      <div className="relative isolate">
        <svg
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
        >
          <defs>
            <pattern
              height={200}
              id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
              patternUnits="userSpaceOnUse"
              width={200}
              x="50%"
              y={-1}
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg className="overflow-visible fill-gray-50" x="50%" y={-1}>
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
            height="100%"
            strokeWidth={0}
            width="100%"
          />
        </svg>
        <div
          aria-hidden="true"
          className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
        >
          <div
            className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
            }}
          />
        </div>
        <div className="overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-32 pt-16 sm:pt-60 lg:px-8 lg:pt-32">
            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
              <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Connecting Brands with Influencers, Seamlessly!
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                  Discover influencers, build collaborations, and grow your
                  brand effortlessly.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link href={Route.Search}>
                    <Button variant={Variants.ACCENT}>Find Influencers</Button>
                  </Link>
                  <Link
                    className="text-sm font-semibold leading-6 text-gray-900"
                    href={Route.SignUp}
                  >
                    Join us <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                  <div className="relative">
                    <Image
                      alt={heroSellers[0]?.name || ""}
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      height={264}
                      src={heroSellers[0]?.photo || ""}
                      width={176}
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
                <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                  <div className="relative">
                    <Image
                      alt={heroSellers[1]?.name || ""}
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      height={264}
                      src={heroSellers[1]?.photo || ""}
                      width={176}
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="relative">
                    <Image
                      alt={heroSellers[2]?.name || ""}
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      height={264}
                      src={heroSellers[2]?.photo || ""}
                      width={176}
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
                <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                  <div className="relative">
                    <Image
                      alt={heroSellers[3]?.name || ""}
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      height={264}
                      src={heroSellers[3]?.photo || ""}
                      width={176}
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="relative">
                    <Image
                      alt={heroSellers[4]?.name || ""}
                      className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      height={264}
                      src={heroSellers[4]?.photo || ""}
                      width={176}
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8" id="sellers">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight  sm:text-4xl">
            Our Top Creators
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-800">
            Discover the influencers leading the way in engagement and
            creativity. Explore their profiles and see how they can elevate your
            brand through authentic collaborations!
          </p>
        </div>
        <ul className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
          {heroSellers.map(
            (person) =>
              person && (
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
              ),
          )}
        </ul>
      </div>
      <Faqs />
    </main>
  );
}

export default Page;
