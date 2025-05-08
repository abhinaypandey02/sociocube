import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

import ApplicationsTable from "@/app/(dashboard)/your-campaigns/[id]/components/applications-table";
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
    <ApplicationsTable
      actionType={"selected"}
      applications={applications.filter((app) => Boolean(app.user))}
      posting={posting}
    />
  );
}
