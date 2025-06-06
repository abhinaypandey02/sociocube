import { cookies } from "next/headers";

import DashboardWrapper from "@/app/(dashboard)/components/dashboard-wrapper";
import { Route } from "@/constants/routes";
import { getSEO } from "@/constants/seo";
import { Injector, queryGQL } from "@/lib/apollo-server";
import { GET_AI_SEARCH_USAGE, SEARCH_SELLERS } from "@/lib/queries";

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
          const {
            getSubscription: {
              usages: { AiSearch },
            },
          } = await queryGQL(
            GET_AI_SEARCH_USAGE,
            undefined,
            await cookies(),
            0,
          );
          if (!AiSearch && params.query)
            return {
              response: null,
              filters,
              count: 0,
              error:
                "You have used all your remaining usages, please try again in 24 hours.",
            };
          try {
            return {
              response: await queryGQL(
                SEARCH_SELLERS,
                { filters },
                params.query ? await cookies() : undefined,
                3600 * 24,
              ),
              filters,
              count: AiSearch,
            };
          } catch (error) {
            return {
              response: null,
              filters,
              count: AiSearch,
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
