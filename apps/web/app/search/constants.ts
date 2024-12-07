import type { ComponentType } from "react";
import dynamic from "next/dynamic";
import type { SearchSellersFilters } from "../../__generated__/graphql";

const CountryFilter = dynamic(() => import("./components/country-filter"));
const GenderFilter = dynamic(() => import("./components/gender-filter"));
const CategoryFilter = dynamic(() => import("./components/category-filter"));
const PriceFilter = dynamic(() => import("./components/price-filter"));
const FollowersFilter = dynamic(() => import("./components/followers-filter"));
const AgeFilter = dynamic(() => import("./components/age-filter"));

export const SEARCH_FILTERS: {
  name: string;
  component: ComponentType<{
    onChange: (data: SearchSellersFilters) => void;
  }>;
}[] = [
  {
    name: "Location",
    component: CountryFilter,
  },
  {
    name: "Genders",
    component: GenderFilter,
  },
  {
    name: "Categories",
    component: CategoryFilter,
  },
  {
    name: "Price",
    component: PriceFilter,
  },
  {
    name: "Followers",
    component: FollowersFilter,
  },
  {
    name: "Age",
    component: AgeFilter,
  },
];
