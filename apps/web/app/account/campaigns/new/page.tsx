import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import CreateNewPostingForm from "../components/form";
import AccountPageWrapper from "../../components/account-page-wrapper";
import { queryGQL } from "../../../../lib/apollo-server";
import { GET_USER_CURRENCY } from "../../../../lib/queries";
import { getRoute } from "../../../../constants/routes";

export default async function CreateNewPostingPage() {
  const { user } = await queryGQL(
    GET_USER_CURRENCY,
    undefined,
    await cookies(),
  );
  if (!user?.agencies || user.agencies.length === 0)
    redirect(getRoute("AgencyOnboarding"));
  return (
    <AccountPageWrapper title="Create new posting">
      <div className="max-w-2xl">
        <CreateNewPostingForm agencies={user.agencies} />
      </div>
    </AccountPageWrapper>
  );
}
