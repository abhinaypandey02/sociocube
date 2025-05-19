"use client";
import React from "react";

import { GetPostingsInReviewQuery } from "@/__generated__/graphql";
import PostingCard from "@/app/(dashboard)/campaigns/components/posting-card";
import DashboardWrapper from "@/app/(dashboard)/components/dashboard-wrapper";
import { Route } from "@/constants/routes";
import { handleGQLErrors, useAuthMutation } from "@/lib/apollo-client";
import { ACCEPT_POSTING, REJECT_POSTING } from "@/lib/mutations";

export default function ReviewCampaignList({
  postings,
}: {
  postings: GetPostingsInReviewQuery["getPostingsInReview"];
}) {
  const [reject] = useAuthMutation(REJECT_POSTING);
  const [accept] = useAuthMutation(ACCEPT_POSTING);

  const handleReject = (id: number) => {
    const reason = window.prompt("Enter rejection reason");
    if (reason) {
      reject({
        id,
        reason,
      })
        .then(() => {
          window.alert("Rejected successfully");
        })
        .catch(handleGQLErrors);
    }
  };
  const handleAccept = (id: number) => {
    accept({
      id,
    })
      .then(() => {
        window.alert("Accepted successfully");
      })
      .catch(handleGQLErrors);
  };

  return (
    <DashboardWrapper
      title={"Review campaigns"}
      activeKey={Route.ReviewCampaigns}
    >
      {postings.map((posting) => (
        <PostingCard
          gotoNext={() => handleAccept(posting.id)}
          onReject={() => handleReject(posting.id)}
          posting={posting}
          key={posting.id}
          loading={false}
        />
      ))}
    </DashboardWrapper>
  );
}
