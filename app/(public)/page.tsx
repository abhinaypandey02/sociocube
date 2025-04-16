import type { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";

import Faqs from "@/app/(public)/components/faqs";
import Hero from "@/app/(public)/components/hero";
import JobPostings from "@/app/(public)/components/job-postings";
import Schema from "@/app/(public)/components/schema";
import TopCreators from "@/app/(public)/components/top-creators";
import { getSEO, SEO } from "@/constants/seo";
import { queryGQL } from "@/lib/apollo-server";
import { GET_FEATURED_SELLERS_AND_POSTS } from "@/lib/queries";

const HowItWorks = dynamic(
  () => import("@/app/(public)/components/how-it-works"),
);
const Cta = dynamic(() => import("@/app/(public)/components/cta"));
const Features = dynamic(() => import("@/app/(public)/components/features"));
const AboutUs = dynamic(() => import("@/app/(public)/components/about-us"));
const FiltersList = dynamic(
  () => import("@/app/(public)/components/filters-list"),
);

export function generateMetadata(): Metadata {
  return getSEO();
}

async function HomePage() {
  const { sellers, postings } = await queryGQL(GET_FEATURED_SELLERS_AND_POSTS);
  return (
    <>
      <Schema
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          image: `${process.env.NEXT_PUBLIC_BASE_URL}/opengraph-image.png`,
          url: process.env.NEXT_PUBLIC_BASE_URL,
          sameAs: ["https://instagram.com/thesociocube"],
          logo: `${process.env.NEXT_PUBLIC_BASE_URL}/icon.png`,
          name: SEO.companyName,
          description: SEO.description,
          email: "abhinaypandey02@gmail.com",
        }}
        id="org"
      />
      <Hero />
      <TopCreators sellers={sellers} />
      <JobPostings postings={postings} />
      <HowItWorks />
      <FiltersList />
      <Features />
      <AboutUs />
      <Faqs />
      <Cta />
    </>
  );
}

export default HomePage;
