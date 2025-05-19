import { cookies } from "next/headers";
import React from "react";

import ReviewCampaignList from "@/app/(dashboard)/review-campaigns/review-campaign-list";
import { queryGQL } from "@/lib/apollo-server";
import { GET_POSTINGS_IN_REVIEW } from "@/lib/queries";

export default async function MyApplicationsPage() {
  const { getPostingsInReview } = await queryGQL(
    GET_POSTINGS_IN_REVIEW,
    undefined,
    await cookies(),
    0,
  );
  return <ReviewCampaignList postings={getPostingsInReview} />;
}
