import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

import DashboardWrapper from "@/app/(dashboard)/components/dashboard-wrapper";
import { Route } from "@/constants/routes";
import { getSEO } from "@/constants/seo";
import { Injector, queryGQL } from "@/lib/apollo-server";
import { GET_USER_POSTINGS } from "@/lib/queries";

import PostingsTable from "./components/postings-table";

export default async function PostingsPage() {
  return (
    <DashboardWrapper activeKey={Route.YourCampaigns} title={"Your Campaigns"}>
      <Injector
        fetch={async () =>
          queryGQL(GET_USER_POSTINGS, undefined, await cookies(), 0)
        }
        Component={PostingsTable}
      />
    </DashboardWrapper>
  );
}

export const metadata: Metadata = getSEO(
  "Post UGC Campaigns & Find Content Creators Fast",
  "Launch influencer or UGC campaigns and connect with verified content creators who match your brand’s goals. Post once, get applications instantly, and manage everything in one place with Sociocube.",
);
