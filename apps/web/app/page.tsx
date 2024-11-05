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

export const revalidate = 120;
async function Page() {
  const { sellers } = await queryGQL(
    GET_FEATURED_SELLERS,
    undefined,
    undefined,
    60,
  );
  const sellersToShow = sellers.filter((seller) => seller.photo && seller.bio);
  const heroSellers: GetFeaturedSellersQuery["sellers"] = [];
  for (let i = 0; heroSellers.length < 5; i++) {
    const seller = sellersToShow[i % sellersToShow.length];
    if (seller) heroSellers.push(seller);
  }

  return (
    <main className="scroll-smooth">
      <Hero images={heroSellers} />
      <TopCreators sellers={heroSellers} />
      <HowItWorks />
      <Features />
      <AboutUs />
      <Faqs />
      <Cta />
    </main>
  );
}

export default Page;
