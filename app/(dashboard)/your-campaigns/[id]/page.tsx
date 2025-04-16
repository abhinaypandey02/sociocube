import { notFound } from "next/navigation";
import React from "react";

import AccountPageWrapper from "@/app/(dashboard)/profile/components/account-page-wrapper";
import { Route } from "@/constants/routes";
import { queryGQL } from "@/lib/apollo-server";
import { GET_POSTING } from "@/lib/queries";

import CreateNewPostingForm from "../components/form";
import ManagePostingButton from "../components/manage-posting-button";

export default async function CreateNewPostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericID = parseInt(id);
  const { posting } = await queryGQL(
    GET_POSTING,
    { id: numericID },
    undefined,
    0,
  );
  if (!posting) return notFound();
  return (
    <AccountPageWrapper
      backRoute={{
        route: Route.YourCampaigns,
        title: "Campaigns",
      }}
      cta={<ManagePostingButton posting={posting} />}
      title="Edit posting"
    >
      <div className="max-w-2xl">
        <CreateNewPostingForm existingPosting={posting} />
      </div>
    </AccountPageWrapper>
  );
}
