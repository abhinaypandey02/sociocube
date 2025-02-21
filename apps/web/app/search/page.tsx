import { getSEO } from "../../constants/seo";
import { Injector, queryGQL } from "../../lib/apollo-server";
import { SEARCH_SELLERS } from "../../lib/queries";
import type { SearchFilterSorting } from "../../__generated__/graphql";
import SearchWindow from "./components/search-window";

function parseParams(
  val: string | undefined,
  type?: "NUMBER" | "ARRAY" | "NUMERIC_ARRAY",
) {
  if (!val) return undefined;
  switch (type) {
    case "NUMBER": {
      const num = parseInt(val);
      if (isNaN(num)) return undefined;
      return parseInt(val);
    }
    case "ARRAY":
      return val.split(",").map(decodeURIComponent);
    case "NUMERIC_ARRAY": {
      const arr = val
        .split(",")
        .map(parseInt)
        .filter((num) => !isNaN(num));
      if (arr.length === 0) return undefined;
      return arr;
    }
    default:
      return decodeURIComponent(val);
  }
}

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
