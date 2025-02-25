import { getSEO } from "../../constants/seo";
import { Injector, queryGQL } from "../../lib/apollo-server";
import { GET_ALL_POSTINGS } from "../../lib/queries";
import type {
  PostingPlatforms,
  SearchPostingsSorting,
} from "../../__generated__/graphql";
import { parseParams } from "../search/constants";
import SearchWindow from "./components/search-window";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;

  if (!parseParams(params.agency)) return getSEO("Find influencer campaigns");
  const filters = {
    age: parseParams(params.age, "NUMBER") as number,
    platforms: parseParams(params.platforms, "ARRAY") as PostingPlatforms[],
    followers: parseParams(params.followers, "NUMBER") as number,
    query: parseParams(params.query) as string,
    sortBy: parseParams(params.sortBy) as SearchPostingsSorting,
    agency: parseParams(params.agency) as string,
  };
  const data = await queryGQL(GET_ALL_POSTINGS, { filters }, undefined, 120);
  const agency = data.postings[0]?.agency.name;
  if (!agency) return getSEO("Find influencer campaigns");
  return getSEO(
    `Campaigns by ${agency}`,
    `Find campaigns posted by ${agency} on Sociocube. Apply now for great opportunities.`,
  );
}

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
    query: parseParams(params.query) as string,
    sortBy: parseParams(params.sortBy) as SearchPostingsSorting,
    agency: parseParams(params.agency) as string,
  };
  return (
    <Injector
      Component={SearchWindow}
      fetch={() => queryGQL(GET_ALL_POSTINGS, { filters }, undefined, 120)}
      props={{ filters }}
    />
  );
}
