import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

import BrandsSlider from "@/app/(public)/components/brands-slider";
import { Button } from "@/components/button";
import { Variants } from "@/components/constants";
import { getRoute } from "@/constants/routes";

export default function Hero() {
  return (
    <div className="relative isolate bg-linear-to-b to-transparent from-0% to-100% via-60% via-accent-bg/80 from-accent-bg">
      <div className="mx-auto -mt-20 max-w-7xl overflow-hidden px-6 pb-5 pt-4 text-center sm:mb-16 pt-24 sm:pt-48 lg:px-8">
        <p className="mb-3 max-sm:text-sm font-medium tracking-wide text-gray-800">
          BIGGEST INFLUENCER MARKETING PLATFORM
        </p>
        <h2 className="font-poppins text-6xl font-semibold  sm:text-7xl">
          Connect. Collaborate. Create.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-800">
          Sociocube bridges the gap between brands and influencers, providing a
          seamless platform for authentic partnerships.
        </p>
        <div className="mt-10 mb-16 sm:mb-28 flex items-center justify-center items-stretch gap-4 max-sm:flex-col">
          <Link href={getRoute("Campaigns")}>
            <Button
              className="flex items-center gap-2 w-full"
              variant={Variants.PRIMARY}
            >
              Find campaigns <MagnifyingGlass />
            </Button>
          </Link>
          <Link href={getRoute("Onboarding")}>
            <Button
              className="flex items-center gap-1 w-full"
              variant={Variants.DARK}
              invert
            >
              Start a campaign
              <ArrowRight />
            </Button>
          </Link>
        </div>
        <BrandsSlider />
      </div>
    </div>
  );
}
