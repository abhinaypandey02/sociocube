import React from "react";
import { notFound } from "next/navigation";
import { getCurrentUser, queryGQL } from "@/lib/apollo-server";
import { GET_POSTING } from "@/lib/queries";
import { Route } from "@/constants/routes";
import CreateNewPostingForm from "../../components/form";
import AccountPageWrapper from "../../../components/account-page-wrapper";
import ManagePostingButton from "../components/manage-posting-button";

export default async function CreateNewPostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericID = parseInt(id);
  const { user } = await getCurrentUser();
  const { posting } = await queryGQL(
    GET_POSTING,
    { id: numericID },
    undefined,
    0,
  );
  if (!posting || !user?.id) return notFound();
  return (
    <AccountPageWrapper
      backRoute={{
        route: Route.AccountPostings,
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
