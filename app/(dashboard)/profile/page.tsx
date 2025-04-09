import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import AccountView from "@/app/(dashboard)/profile/components/account-view";
import { getRoute } from "@/constants/routes";
import { getSEO } from "@/constants/seo";
import { queryGQL } from "@/lib/apollo-server";
import { GET_ACCOUNT_DETAILS } from "@/lib/queries";

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
  if (!user) return redirect(getRoute("SignUp"));
  return <AccountView data={user} defaultSection={paramSection} />;
}
export const metadata = getSEO("Manage your Account");
