import { cookies } from "next/headers";

import DashboardWrapper from "@/app/(dashboard)/components/dashboard-wrapper";
import { Route } from "@/constants/routes";
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
    <DashboardWrapper title={"Find Creators with AI"} activeKey={Route.Search}>
      <Injector
        Component={SearchWindow}
        fetch={async () => {
          const params = await searchParams;
          const filters = {
            query: params.query,
          };
          try {
            return {
              response: await queryGQL(
                SEARCH_SELLERS,
                { filters },
                params.query ? await cookies() : undefined,
                params.query ? 3600 * 24 : 3600 * 24 * 7,
              ),
              filters,
            };
          } catch (error) {
            return {
              response: null,
              filters,
              error:
                error instanceof Error
                  ? error.message
                  : "An error occurred with your search. Please try again.",
            };
          }
        }}
      />
    </DashboardWrapper>
  );
}
export const metadata = getSEO(
  "Find UGC & Content Creators for Your Campaign",
  "Search and filter thousands of verified UGC and content creators by location, followers, engagement, and more. Launch influencer campaigns in minutes with Sociocube.",
);
