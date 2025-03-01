import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { queryGQL } from "../../../lib/apollo-server";
import { GET_AGENCY_ACCOUNT_DETAILS } from "../../../lib/queries";
import { getRoute } from "../../../constants/routes";
import { getSEO } from "../../../constants/seo";
import AgencyView from "./components/agency-view";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ agency?: string; section?: string }>;
}) {
  const params = await searchParams;
  const selectedAgencyUsername = params.agency;
  const paramSection = parseInt(params.section || "0");
  const { getCurrentUserAgency } = await queryGQL(
    GET_AGENCY_ACCOUNT_DETAILS,
    { username: selectedAgencyUsername },
    await cookies(),
    0,
  );
  if (!getCurrentUserAgency) return redirect(getRoute("Home"));
  return (
    <AgencyView data={getCurrentUserAgency} defaultSection={paramSection} />
  );
}

export const metadata = getSEO("Manage your Agency");
