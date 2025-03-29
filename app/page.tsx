import React from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { queryGQL } from "@/lib/apollo-server";
import { GET_FEATURED_SELLERS_AND_POSTS } from "@/lib/queries";
import { getSEO, SEO } from "@/constants/seo";
import Hero from "./components/hero";
import TopCreators from "./components/top-creators";
import Schema from "./components/schema";
import Faqs from "./components/faqs";
import JobPostings from "./components/job-postings";

const HowItWorks = dynamic(() => import("./components/how-it-works"));
const Cta = dynamic(() => import("./components/cta"));
const Features = dynamic(() => import("./components/features"));
const AboutUs = dynamic(() => import("./components/about-us"));
const FiltersList = dynamic(() => import("./components/filters-list"));

export function generateMetadata(): Metadata {
  return getSEO();
}

async function HomePage() {
  const { sellers, posts, postings } = await queryGQL(
    GET_FEATURED_SELLERS_AND_POSTS,
    undefined,
    undefined,
    60,
  );
  return (
    <main>
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
      <Hero posts={posts} />
      <TopCreators sellers={sellers} />
      <JobPostings postings={postings} />
      <HowItWorks />
      <FiltersList />
      <Features />
      <AboutUs />
      <Faqs />
      <Cta />
    </main>
  );
}

export default HomePage;
