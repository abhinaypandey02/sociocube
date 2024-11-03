import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { queryGQL } from "../../lib/apollo-server";
import { GET_ACCOUNT_DETAILS } from "../../lib/queries";
import { Route } from "../../constants/routes";
import AccountView from "./components/account-view";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ section: string }>;
}) {
  const { user } = await queryGQL(
    GET_ACCOUNT_DETAILS,
    undefined,
    await cookies(),
    0,
  );
  const paramSection = parseInt((await searchParams).section);
  if (!user) return redirect(Route.Home);
  return <AccountView data={user} defaultSection={paramSection} />;
}
