import { getSEO } from "../../constants/seo";
import { Injector, queryGQL } from "../../lib/apollo-server";
import { SEARCH_SELLERS } from "../../lib/queries";
import type { SearchFilterSorting } from "../../__generated__/graphql";
import SearchWindow from "./components/search-window";
import { parseParams } from "./constants";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const filters = {
    ageRange: parseParams(params.ageRange, "NUMBER") as number,
    categories: parseParams(params.categories, "ARRAY") as string[],
    cities: parseParams(params.cities, "NUMERIC_ARRAY") as number[],
    countries: parseParams(params.countries, "NUMERIC_ARRAY") as number[],
    states: parseParams(params.states, "NUMERIC_ARRAY") as number[],
    genders: parseParams(params.genders, "ARRAY") as string[],
    followersFrom: parseParams(params.followersFrom, "NUMBER") as number,
    followersTo: parseParams(params.followersTo, "NUMBER") as number,
    generalPriceFrom: parseParams(params.generalPriceFrom, "NUMBER") as number,
    generalPriceTo: parseParams(params.generalPriceTo, "NUMBER") as number,
    query: parseParams(params.query) as string,
    sortBy: parseParams(params.sortBy) as SearchFilterSorting,
  };
  return (
    <Injector
      Component={SearchWindow}
      fetch={() => queryGQL(SEARCH_SELLERS, { filters }, undefined, 120)}
      props={{ filters }}
    />
  );
}
export const metadata = getSEO("Find influencers");
