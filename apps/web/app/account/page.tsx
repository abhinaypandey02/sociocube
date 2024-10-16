import React from "react";
import { getServerToken } from "../../lib/auth-server";
import { queryGQL } from "../../lib/apollo-server";
import { GET_ACCOUNT_DETAILS } from "../../lib/queries";
import AccountView from "./components/account-view";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ section: string }>;
}) {
  const token = await getServerToken();
  const { user } = await queryGQL(GET_ACCOUNT_DETAILS, undefined, token);
  const paramSection = parseInt((await searchParams).section);
  return <AccountView data={user} defaultSection={paramSection} />;
}
