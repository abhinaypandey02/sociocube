import { cookies } from "next/headers";
import React from "react";

import { queryGQL } from "@/lib/apollo-server";
import { GET_USER_CURRENCY } from "@/lib/queries";

import AccountPageWrapper from "../../components/account-page-wrapper";
import CreateNewPostingForm from "../components/form";

export default async function CreateNewPostingPage() {
  const { user } = await queryGQL(
    GET_USER_CURRENCY,
    undefined,
    await cookies(),
  );
  return (
    <AccountPageWrapper title="Create new posting">
      <div className="max-w-2xl">
        <CreateNewPostingForm currencyCountry={user?.locationID?.country} />
      </div>
    </AccountPageWrapper>
  );
}
