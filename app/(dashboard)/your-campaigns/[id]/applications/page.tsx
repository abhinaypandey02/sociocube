import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

import { queryGQL } from "@/lib/apollo-server";
import { GET_POSTING_APPLICATIONS } from "@/lib/queries";

import ApplicationsTable from "./components/applications-table";

export default async function AccountPostingApplicationsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericID = parseInt(id);
  const { applications, posting } = await queryGQL(
    GET_POSTING_APPLICATIONS,
    {
      postingID: numericID,
    },
    await cookies(),
    0,
  );
  if (!posting) return notFound();
  const totalEarnings = applications.reduce(
    (acc, curr) => curr.referralEarnings + acc,
    0,
  );
  return (
    <ApplicationsTable
      applications={applications.filter((app) => Boolean(app.user))}
      posting={posting}
      showEarnings={Boolean(totalEarnings)}
    />
  );
}
