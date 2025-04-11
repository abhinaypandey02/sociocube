import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

import BrandsSlider from "@/app/(public)/components/brands-slider";
import { Button } from "@/components/button";
import { getRoute } from "@/constants/routes";

export default function Hero() {
  return (
    <main className="flex bg-gradient-to-br from-black via-black to-green-900 py-12 md:py-20 text-center text-white px-4">
      <div className="max-w-7xl mx-auto justify-center space-y-8">
        <div className="inline-flex items-center justify-center px-4 mb-12 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
          Introducing The Future of Influencer Marketing
        </div>
          <h1 className="max-w-7xl text-6xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Apply to Brand Deals with{" "}
            <span className="relative inline-block text-white">
              AI
              <svg
                viewBox="0 0 120 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-0 bottom-0 w-full h-3"
              >
                <path
                  d="M2 15 C20 5, 40 25, 60 15 C80 5, 100 25, 118 15"
                  stroke="#34D399"  // Tailwind green-400
                  strokeWidth="6"
                  fill="none"
                />
              </svg>
            </span>{" "}
            <br />
            <span className="text-green-400">Just. Like. Jobs.</span>
          </h1>


        <p className="max-w-2xl mx-auto text-gray-200 text-lg sm:text-xl md:text-2xl font-extralight">
          Sociocube is the newest platform where creators apply to brand campaigns,
          and brands recruit top influencer talent—just like hiring.
        </p>

        <div className="flex flex-row justify-center gap-4">
          <Link href={getRoute("Onboarding")}>
            <Button className="hover:animate-in border-2 border-green-500 bg-green-500 hover:bg-green-600 text-white px-6 py-2 text-sm md:text-lg rounded-full ">
              Join as a Creator <ArrowRight className="ml-2 my-auto h-4 w-4" />
            </Button>
          </Link> 
          <Link href={getRoute("Onboarding")}>
            <Button
              className="border-2 hover:animate-in bg-transparent border-green-500 text-green-400 hover:bg-green-500/10 px-6 py-2 text-sm md:text-lg rounded-full "
            >
              I'm a Brand <ArrowRight className="ml-2 my-auto h-4 w-4" />
            </Button>
          </Link>
        </div>

      </div>
    </main>
  );
}
