import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import React from "react";

import DashboardWrapper from "@/app/(dashboard)/components/dashboard-wrapper";
import { getRoute, Route } from "@/constants/routes";
import { queryGQL } from "@/lib/apollo-server";
import { GET_POSTING_APPLICATIONS } from "@/lib/queries";

import ApplicationsTable from "../components/applications-table";

export default async function AccountPostingApplicationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericID = parseInt(id);
  const Cookie = await cookies();
  const { applications, posting, getSubscription } = await queryGQL(
    GET_POSTING_APPLICATIONS,
    {
      postingID: numericID,
    },
    Cookie,
    0,
  );
  if (!posting) {
    if (!Cookie.get("refresh"))
      return redirect(
        `${getRoute("Login")}?redirectURL=${Route.YourCampaigns}/${id}${Route.Applications}`,
      );
    return notFound();
  }
  return (
    <DashboardWrapper
      collapse
      backRoute={Route.YourCampaigns + "/" + id}
      title={"Creator applications"}
      activeKey={Route.YourCampaigns}
    >
      <ApplicationsTable
        sub={getSubscription}
        actionType={"applications"}
        applications={applications.filter((app) => Boolean(app.user))}
        posting={posting}
      />
    </DashboardWrapper>
  );
}
