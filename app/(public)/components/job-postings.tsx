import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

import type { GetFeaturedSellersQuery } from "@/__generated__/graphql";
import { getRoute } from "@/constants/routes";

import JobPostingCard from "./posting-card-compact";
import SectionWrapper from "./section-wrapper";

export default function JobPostings({
  postings,
}: {
  postings: GetFeaturedSellersQuery["postings"];
}) {
  return (
    <SectionWrapper
      description="Explore trending Influencer and UGC campaigns from brands looking to collaborate with creators. Apply instantly, get paid for content, and grow your portfolio — all from one dashboard on Sociocube."
      headerElements={
        <Link
          className="flex items-center gap-2 pt-2 text-lg font-medium text-accent max-md:hidden"
          href={getRoute("Campaigns")}
        >
          See all active campaigns
          <ArrowRight />
        </Link>
      }
      id="collabs"
      title="Top Active Campaigns"
      prefixTitle={"Live Collabs You Can Join Right Now"}
    >
      <ul className="mx-auto max-w-6xl divide-y divide-gray-100 grid lg:grid-cols-2 gap-5">
        {postings.map((posting, i) => (
          <JobPostingCard
            key={posting.id}
            posting={posting}
            index={i}
            maxVisibleOnMobile={5}
          />
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm md:hidden">
        <MagnifyingGlass weight="bold" /> Looking for more?
        <Link
          className="flex items-center gap-2  font-medium text-accent "
          href={getRoute("Campaigns")}
        >
          See all active campaigns <ArrowRight />
        </Link>
      </div>
    </SectionWrapper>
  );
}
