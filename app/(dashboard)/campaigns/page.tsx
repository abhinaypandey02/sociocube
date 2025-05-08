import { cookies } from "next/headers";

import DashboardWrapper from "@/app/(dashboard)/components/dashboard-wrapper";
import { Route } from "@/constants/routes";
import { getSEO } from "@/constants/seo";
import { Injector, queryGQL } from "@/lib/apollo-server";
import { GET_ALL_POSTINGS } from "@/lib/queries";

import PostingsData from "./components/postings-data";

export function generateMetadata() {
  return getSEO("Find campaign opportunities for content creators");
}

export default async function SearchPage() {
  return (
    <DashboardWrapper title={"Apply to campaigns"} activeKey={Route.Campaigns}>
      <Injector
        Component={PostingsData}
        props={{ fetchInitialData: false }}
        fetch={async () => {
          const Cookie = await cookies();
          const token = Cookie.get("refresh")?.value;
          return queryGQL(
            GET_ALL_POSTINGS,
            { page: 1 },
            Cookie,
            token ? 0 : 3600,
          );
        }}
      />
    </DashboardWrapper>
  );
}
