import { getOgImage } from "../../lib/util-components";
import { parseParams } from "../search/constants";
import type {
  PostingPlatforms,
  SearchPostingsSorting,
} from "../../__generated__/graphql";
import { queryGQL } from "../../lib/apollo-server";
import { GET_ALL_POSTINGS } from "../../lib/queries";

export default async function Image({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;

  if (!params.agency || !parseParams(params.agency))
    return getOgImage("Find influencer campaigns");
  const filters = {
    age: parseParams(params.age, "NUMBER") as number,
    platforms: parseParams(params.platforms, "ARRAY") as PostingPlatforms[],
    followers: parseParams(params.followers, "NUMBER") as number,
    query: parseParams(params.query) as string,
    sortBy: parseParams(params.sortBy) as SearchPostingsSorting,
    agency: parseParams(params.agency) as string,
  };
  const data = await queryGQL(GET_ALL_POSTINGS, { filters }, undefined, 120);
  const agency = data.postings[0]?.agency;
  if (!agency) return getOgImage("Find influencer campaigns");
  return getOgImage(
    `Campaigns by ${agency.name}`,
    `Apply now.`,
    data.postings[0]?.title,
    agency.photo,
  );
}
