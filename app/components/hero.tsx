import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Button } from "@/components/button";
import { Variants } from "@/components/constants";
import { getRoute } from "@/constants/routes";

export default function Hero() {
  return (
    <div className="relative isolate bg-gray-800">
      <div className="mx-auto -mt-20 max-w-7xl overflow-hidden px-6 pb-32 pt-4 text-center sm:mb-16 sm:pt-48 lg:px-8">
        <Image
          alt="girl on a sofa"
          className="absolute inset-x-0 top-0 -z-10 size-full object-cover"
          height={598}
          priority
          sizes={"100vw"}
          src="/hero-bg.webp"
          width={1000}
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
          <Link href={getRoute("Onboarding")}>
            <Button
              className="flex items-center gap-1 bg-primary/90! hover:bg-primary! hover:brightness-100!"
              variant={Variants.PRIMARY}
            >
              Join as a creator <ArrowRight />
            </Button>
          </Link>
          <Link href={getRoute("Onboarding")}>
            <Button
              className="flex items-center gap-1 bg-white/90! hover:bg-white! hover:brightness-100!"
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
