import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

import { queryGQL } from "@/lib/apollo-server";
import { GET_POSTING_RECOMMENDATIONS } from "@/lib/queries";

import RecommendationsTable from "./components/recommendations-table";

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
  return <RecommendationsTable applications={posting.recommendations} />;
}
