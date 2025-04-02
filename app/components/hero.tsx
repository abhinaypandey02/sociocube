import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/button";
import { Variants } from "@/components/constants";
import { getRoute } from "@/constants/routes";

export default function Hero() {
  return (
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
      <div className="mx-auto -mt-20 max-w-7xl overflow-hidden px-6 pb-32 pt-4 text-center sm:mb-16 sm:pt-48 lg:px-8">
        <Image
          alt="girl on a sofa"
          className="absolute inset-x-0 top-0 -z-10 size-full object-cover"
          height={821}
          src="/hero-bg.jpg"
          width={1232}
        />
        <p className="mb-3 font-medium tracking-wide text-gray-200">
          BIGGEST INFLUENCER MARKETING PLATFORM
        </p>
        <h2 className="font-poppins text-5xl font-semibold text-white sm:text-7xl">
          Connect. Collaborate. Create.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-200">
          Sociocube bridges the gap between brands and influencers, providing a
          seamless platform for authentic partnerships.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-4">
          <Link href={getRoute("Postings")}>
            <Button
              className="flex items-center gap-1"
              variant={Variants.PRIMARY}
            >
              Join as a creator <ArrowRight />
            </Button>
          </Link>
          <Link href={getRoute("Postings")}>
            <Button
              className="flex items-center gap-1 !bg-white/90"
              invert
              variant={Variants.PRIMARY}
            >
              Start a campaign
              <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
