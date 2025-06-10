import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import React from "react";

import DashboardWrapper from "@/app/(dashboard)/components/dashboard-wrapper";
import ApplicationsTable from "@/app/(dashboard)/your-campaigns/[id]/components/applications-table";
import { getRoute, Route } from "@/constants/routes";
import { queryGQL } from "@/lib/apollo-server";
import { GET_POSTING_SELECTED } from "@/lib/queries";

export default async function AccountPostingApplicationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericID = parseInt(id);
  const Cookie = await cookies();
  const { applications, posting, getSubscription } = await queryGQL(
    GET_POSTING_SELECTED,
    {
      postingID: numericID,
    },
    Cookie,
    0,
  );
  if (!posting) {
    if (!Cookie.get("refresh"))
      return redirect(
        `${getRoute("SignUp")}?redirectURL=${Route.YourCampaigns}/${id}${Route.Selected}`,
      );
    return notFound();
  }
  return (
    <DashboardWrapper
      collapse
      backRoute={Route.YourCampaigns + "/" + id}
      title={"Selected creators"}
      activeKey={Route.YourCampaigns}
    >
      <ApplicationsTable
        actionType={"selected"}
        sub={getSubscription}
        applications={applications.filter((app) => Boolean(app.user))}
        posting={posting}
      />
    </DashboardWrapper>
  );
}
