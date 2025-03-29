import type { ComponentType } from "react";
import type { SearchPostingsFilters } from "../../../__generated__/graphql";
import PlatformsFilter from "./platforms-filter";
import FollowersFilter from "./followers-filter";
import AgeFilter from "./age-filter";

export const SEARCH_POSTINGS_FILTERS: {
  name: string;
  keys: (keyof SearchPostingsFilters)[];
  component: ComponentType<{
    onChange: (data: SearchPostingsFilters) => void;
    variables: SearchPostingsFilters;
  }>;
}[] = [
  {
    name: "Platforms",
    component: PlatformsFilter,
    keys: ["platforms"],
  },
  {
    name: "Followers",
    component: FollowersFilter,
    keys: ["followers"],
  },
  {
    name: "Age",
    component: AgeFilter,
    keys: ["age"],
  },
];
