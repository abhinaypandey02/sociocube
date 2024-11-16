import React from "react";
import dynamic from "next/dynamic";
import { queryGQL } from "../lib/apollo-server";
import { GET_FEATURED_SELLERS } from "../lib/queries";
import type { GetFeaturedSellersQuery } from "../__generated__/graphql";
import Hero from "./components/hero";
import TopCreators from "./components/top-creators";

const HowItWorks = dynamic(() => import("./components/how-it-works"));
const Cta = dynamic(() => import("./components/cta"));
const Features = dynamic(() => import("./components/features"));
const AboutUs = dynamic(() => import("./components/about-us"));
const FiltersList = dynamic(() => import("./components/filters-list"));
const Faqs = dynamic(() => import("./components/faqs"), { ssr: false });

async function HomePage() {
  const { sellers } = await queryGQL(
    GET_FEATURED_SELLERS,
    undefined,
    undefined,
    60,
  );
  const sellersToShow = sellers.filter(
    (seller) => seller.photo && seller.bio && seller.instagramStats,
  );
  const heroSellers: GetFeaturedSellersQuery["sellers"] = [];
  if (sellersToShow.length > 0)
    for (let i = 0; heroSellers.length < 5; i++) {
      const seller = sellersToShow[i % sellersToShow.length];
      if (seller) heroSellers.push(seller);
    }

  return (
    <main>
      <Hero images={heroSellers} />
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
