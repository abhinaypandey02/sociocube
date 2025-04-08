import type { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";

import BrandsSlider from "@/app/components/brands-slider";
import { getSEO, SEO } from "@/constants/seo";
import { queryGQL } from "@/lib/apollo-server";
import { GET_FEATURED_SELLERS_AND_POSTS } from "@/lib/queries";

import Faqs from "../components/faqs";
import Hero from "../components/hero";
import JobPostings from "../components/job-postings";
import Schema from "../components/schema";
import TopCreators from "../components/top-creators";

const HowItWorks = dynamic(() => import("../components/how-it-works"));
const Cta = dynamic(() => import("../components/cta"));
const Features = dynamic(() => import("../components/features"));
const AboutUs = dynamic(() => import("../components/about-us"));
const FiltersList = dynamic(() => import("../components/filters-list"));

export function generateMetadata(): Metadata {
  return getSEO();
}

async function HomePage() {
  const { sellers, postings } = await queryGQL(
    GET_FEATURED_SELLERS_AND_POSTS,
    undefined,
    undefined,
    60,
  );
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
      <BrandsSlider />
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
