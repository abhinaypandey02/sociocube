import type { ComponentType } from "react";
import type { SearchSellersFilters } from "../../__generated__/graphql";
import CountryFilter from "./components/country-filter";
import GenderFilter from "./components/gender-filter";
import CategoryFilter from "./components/category-filter";
import PriceFilter from "./components/price-filter";
import FollowersFilter from "./components/followers-filter";
import AgeFilter from "./components/age-filter";

export const SEARCH_FILTERS: {
  name: string;
  keys: (keyof SearchSellersFilters)[];
  component: ComponentType<{
    onChange: (data: SearchSellersFilters) => void;
    variables: SearchSellersFilters;
  }>;
}[] = [
  {
    name: "Location",
    component: CountryFilter,
    keys: ["countries", "states", "cities"],
  },
  {
    name: "Genders",
    component: GenderFilter,
    keys: ["genders"],
  },
  {
    name: "Categories",
    component: CategoryFilter,
    keys: ["categories"],
  },
  {
    name: "Price",
    component: PriceFilter,
    keys: ["generalPriceFrom", "generalPriceTo"],
  },
  {
    name: "Followers",
    component: FollowersFilter,
    keys: ["followersTo", "followersFrom"],
  },
  {
    name: "Age",
    component: AgeFilter,
    keys: ["ageRange"],
  },
];

export function parseParams(
  val: string | undefined,
  type?: "NUMBER" | "ARRAY" | "NUMERIC_ARRAY",
) {
  if (!val || val === "undefined" || val === "null") return undefined;
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
