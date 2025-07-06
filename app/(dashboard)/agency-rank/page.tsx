import { cookies } from "next/headers";

import DashboardWrapper from "@/app/(dashboard)/components/dashboard-wrapper";
import { Route } from "@/constants/routes";
import { getSEO } from "@/constants/seo";
import { Injector, queryGQL } from "@/lib/apollo-server";
import { GET_AGENCY_RANK } from "@/lib/queries";

import AgencyRankData from "./components/agency-rank-data";

export default async function AgencyRankPage() {
  return (
    <DashboardWrapper
      title={"Top Performing Agencies"}
      activeKey={Route.AgencyRank}
    >
      <Injector
        fetch={async () => {
          const Cookie = await cookies();
          const token = Cookie.get("refresh")?.value;
          return queryGQL(
            GET_AGENCY_RANK,
            { page: 1 },
            Cookie,
            token ? 0 : 3600,
          );
        }}
        Component={AgencyRankData}
      />
    </DashboardWrapper>
  );
}

export const metadata = getSEO(
  "Top Performing Agencies | Agency Rankings",
  "Discover the most successful agencies on our platform. Connect with top-performing agencies for your brand campaigns.",
);
