import React from "react";
import { queryGQL } from "../lib/apollo-server";
import { GET_FEATURED_SELLERS } from "../lib/queries";
import type { GetFeaturedSellersQuery } from "../__generated__/graphql";
import Faqs from "./components/faqs";
import HowItWorks from "./components/how-it-works";
import Cta from "./components/cta";
import Features from "./components/features";
import AboutUs from "./components/about-us";
import Hero from "./components/hero";
import TopCreators from "./components/top-creators";
import FiltersList from "./components/filters-list";

export const revalidate = 120;
async function Page() {
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
      <TopCreators sellers={heroSellers} />
      <HowItWorks />
      <FiltersList />
      <Features />
      <AboutUs />
      <Faqs />
      <Cta />
    </main>
  );
}

export default Page;
