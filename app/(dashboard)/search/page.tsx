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
            undefined,
            params.query ? 0 : 3600 * 24 * 7,
          ),
          filters,
        };
      }}
    />
  );
}
export const metadata = getSEO("Find influencers");
