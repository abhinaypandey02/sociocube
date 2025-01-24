import React from "react";
import { cookies } from "next/headers";
import CreateNewPostingForm from "../components/form";
import AccountPageWrapper from "../../components/account-page-wrapper";
import { queryGQL } from "../../../../lib/apollo-server";
import { GET_USER_CURRENCY } from "../../../../lib/queries";

export default async function CreateNewPostingPage() {
  const { user } = await queryGQL(
    GET_USER_CURRENCY,
    undefined,
    await cookies(),
  );
  return (
    <AccountPageWrapper title="Create new posting">
      <div className="max-w-2xl">
        <CreateNewPostingForm
          currencyCode={user?.locationID?.country}
          isVerified={Boolean(user?.instagramStats?.isVerified)}
        />
      </div>
    </AccountPageWrapper>
  );
}
