import React from "react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";
import { queryGQL } from "../lib/apollo-server";
import { GET_FEATURED_SELLERS_AND_POSTS } from "../lib/queries";
import type { GetFeaturedSellersQuery } from "../__generated__/graphql";
import { getSEO, SEO } from "../constants/seo";
import { getOrganizationDomain } from "../lib/utils-server";
import { getRoute } from "../constants/routes";
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
  const domain = await getOrganizationDomain();
  if (domain) {
    const username = domain.split(".")[0];
    if (username)
      redirect(`${getRoute("Profile")}/${username}`, RedirectType.replace);
  }
  const { sellers, posts, postings } = await queryGQL(
    GET_FEATURED_SELLERS_AND_POSTS,
    undefined,
    undefined,
    60,
  );
  const sellersToShow = Array.from(sellers).sort(
    (a, b) => (b.instagramStats?.er || 0) - (a.instagramStats?.er || 0),
  );
  const heroSellers: GetFeaturedSellersQuery["sellers"] = [];
  if (sellersToShow.length > 0)
    for (let i = 0; heroSellers.length < 5; i++) {
      const seller = sellersToShow[i % sellersToShow.length];
      if (seller) heroSellers.push(seller);
    }

  return (
    <main>
      <Schema
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          image: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/opengraph-image.png`,
          url: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL,
          sameAs: ["https://instagram.com/freeluencers"],
          logo: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/icon.png`,
          name: SEO.companyName,
          description: SEO.description,
          email: "abhinaypandey02@gmail.com",
        }}
        id="org"
      />
      <Hero posts={posts} />
      <JobPostings postings={postings} />
      <TopCreators sellers={sellersToShow} />
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
