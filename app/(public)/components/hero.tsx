"use client";
import { Camera, DeviceMobileCamera, Lightning } from "@phosphor-icons/react";
import {
  ArrowRight,
  Handshake,
  MagnifyingGlass,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

import { Roles } from "@/__generated__/graphql";
import BrandsSlider from "@/app/(public)/components/brands-slider";
import { Button } from "@/components/button";
import { Variants } from "@/components/constants";
import { getRoute } from "@/constants/routes";
import { useUser } from "@/state/hooks";

export default function Hero() {
  const [user] = useUser();
  const isAgency = user?.role !== Roles.Creator;
  return (
    <div className="relative isolate bg-linear-to-b to-transparent from-0% to-100% via-60% via-accent-bg/80 from-accent-bg">
      <div className="mx-auto relative -mt-24 max-w-7xl overflow-hidden px-6 pb-5 text-center sm:mb-16 pt-24 sm:pt-48 lg:px-8">
        <p className="mb-3 max-sm:text-sm uppercase font-medium tracking-wide text-gray-800">
          Home of Influencer & UGC Campaigns
        </p>
        <h2 className="font-poppins text-5xl font-semibold relative sm:text-7xl">
          <Camera
            weight={"thin"}
            className={
              "vibrate-1 -rotate-12 absolute hidden sm:block text-4xl left-10 bottom-23"
            }
          />
          <DeviceMobileCamera
            weight={"thin"}
            className={
              "vibrate-2 rotate-12 absolute hidden sm:block text-4xl right-10 bottom-20"
            }
          />
          <Lightning
            weight={"thin"}
            className={
              "vibrate-3 rotate-12 top-40  hidden sm:block text-4xl absolute right-40"
            }
          />
          <Handshake
            weight={"thin"}
            className={
              "vibrate-2 rotate-12 top-32 hidden sm:block text-4xl absolute left-40"
            }
          />
          Find Creators. Find Collabs.
        </h2>
        <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-lg leading-8 text-gray-800">
          Sociocube connects brands with verified content creators for paid UGC
          and influencer collaborations. Post campaigns, explore creators, and
          grow — all in one platform.
        </p>
        <div className="mt-6 sm:mt-10 mb-10 sm:mb-28 flex items-center justify-center items-stretch gap-4 max-sm:flex-col">
          {!user ? (
            <>
              <Link href={getRoute("Campaigns")}>
                <Button
                  className="flex items-center gap-2 w-full"
                  variant={Variants.PRIMARY}
                >
                  Find campaigns <MagnifyingGlass />
                </Button>
              </Link>
              <Link href={getRoute("YourCampaigns")}>
                <Button
                  className="flex items-center gap-1 w-full"
                  variant={Variants.DARK}
                  invert
                >
                  Start a campaign
                  <ArrowRight />
                </Button>
              </Link>
            </>
          ) : isAgency ? (
            <>
              <Link href={getRoute("NewCampaign")}>
                <Button
                  className="flex items-center gap-2 w-full"
                  variant={Variants.PRIMARY}
                >
                  Start a campaign <ArrowRight />
                </Button>
              </Link>
              <Link href={getRoute("Search")}>
                <Button
                  className="flex items-center gap-1 w-full"
                  variant={Variants.DARK}
                  invert
                >
                  Find Creators with AI
                  <MagnifyingGlass />
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href={getRoute("Campaigns")}>
                <Button
                  className="flex items-center gap-2 w-full"
                  variant={Variants.PRIMARY}
                >
                  Find campaigns <MagnifyingGlass />
                </Button>
              </Link>
              {user.username && user.isOnboarded ? (
                <Link href={getRoute("Profile") + "/" + user.username}>
                  <Button
                    className="flex items-center gap-1 w-full"
                    variant={Variants.DARK}
                    invert
                  >
                    Your profile
                    <ArrowRight />
                  </Button>
                </Link>
              ) : (
                <Link href={getRoute("Onboarding")}>
                  <Button
                    className="flex items-center gap-1 w-full"
                    variant={Variants.DARK}
                    invert
                  >
                    Start onboarding
                    <ArrowRight />
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
        <BrandsSlider />
      </div>
    </div>
  );
}
