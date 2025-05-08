import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

import DashboardWrapper from "@/app/(dashboard)/components/dashboard-wrapper";
import ApplicationsTable from "@/app/(dashboard)/your-campaigns/[id]/components/applications-table";
import { Route } from "@/constants/routes";
import { queryGQL } from "@/lib/apollo-server";
import { GET_POSTING_SELECTED } from "@/lib/queries";

export default async function AccountPostingApplicationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericID = parseInt(id);
  const { applications, posting } = await queryGQL(
    GET_POSTING_SELECTED,
    {
      postingID: numericID,
    },
    await cookies(),
    0,
  );
  if (!posting) return notFound();
  return (
    <DashboardWrapper
      collapse
      backRoute={Route.YourCampaigns + "/" + id}
      title={"Selected creators"}
      activeKey={Route.YourCampaigns}
    >
      <ApplicationsTable
        actionType={"selected"}
        applications={applications.filter((app) => Boolean(app.user))}
        posting={posting}
      />
    </DashboardWrapper>
  );
}
