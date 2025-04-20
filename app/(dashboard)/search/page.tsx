import { cookies } from "next/headers";

import { getSEO } from "@/constants/seo";
import { Injector, queryGQL } from "@/lib/apollo-server";
import { SEARCH_SELLERS } from "@/lib/queries";

import SearchWindow from "./components/search-window";

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  return (
    <Injector
      Component={SearchWindow}
      fetch={async () => {
        const params = await searchParams;
        const filters = {
          query: params.query,
        };
        return {
          response: await queryGQL(
            SEARCH_SELLERS,
            { filters },
            params.query ? await cookies() : undefined,
            params.query ? 3600 * 24 : 3600 * 24 * 7,
          ),
          filters,
        };
      }}
    />
  );
}
export const metadata = getSEO("Find influencers");
