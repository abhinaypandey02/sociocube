import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

import DashboardWrapper from "@/app/(dashboard)/components/dashboard-wrapper";
import ApplicationsTable from "@/app/(dashboard)/your-campaigns/[id]/components/applications-table";
import { Route } from "@/constants/routes";
import { queryGQL } from "@/lib/apollo-server";
import { GET_POSTING_RECOMMENDATIONS } from "@/lib/queries";

export default async function AccountPostingApplicationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericID = parseInt(id);
  const { posting } = await queryGQL(
    GET_POSTING_RECOMMENDATIONS,
    {
      postingID: numericID,
    },
    await cookies(),
    0,
  );
  if (!posting) return notFound();
  return (
    <DashboardWrapper
      backRoute={Route.YourCampaigns + "/" + id}
      title={"Explore creators"}
      activeKey={Route.YourCampaigns}
    >
      <ApplicationsTable
        actionType={"recommendations"}
        posting={posting}
        applications={posting.recommendations.map((rec) => ({
          ...rec,
          __typename: undefined,
          createdAt: 0,
          hasReview: false,
          id: 0,
        }))}
      />
    </DashboardWrapper>
  );
}
