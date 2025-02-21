import { getSEO } from "../../constants/seo";
import { Injector, queryGQL } from "../../lib/apollo-server";
import { GET_ALL_POSTINGS } from "../../lib/queries";
import type {
  PostingPlatforms,
  SearchPostingsSorting,
} from "../../__generated__/graphql";
import { parseParams } from "../search/constants";
import SearchWindow from "./components/search-window";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;
  const filters = {
    age: parseParams(params.age, "NUMBER") as number,
    platforms: parseParams(params.platforms, "ARRAY") as PostingPlatforms[],
    followers: parseParams(params.followers, "NUMBER") as number,
    query: parseParams(params.query || params.agency) as string,
    sortBy: parseParams(params.sortBy) as SearchPostingsSorting,
  };
  return (
    <Injector
      Component={SearchWindow}
      fetch={() => queryGQL(GET_ALL_POSTINGS, { filters }, undefined, 120)}
      props={{ filters }}
    />
  );
}
export const metadata = getSEO("Find influencers");
