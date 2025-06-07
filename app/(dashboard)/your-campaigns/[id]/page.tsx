import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import DashboardWrapper from "@/app/(dashboard)/components/dashboard-wrapper";
import DetailsSections from "@/app/(dashboard)/your-campaigns/components/details-sections";
import RequirementsSections from "@/app/(dashboard)/your-campaigns/components/requirements-sections";
import { Route } from "@/constants/routes";
import { queryGQL } from "@/lib/apollo-server";
import { GET_POSTING } from "@/lib/queries";

import ExploreRecommendationsLink from "./components/explore-section";

export default async function CreateNewPostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { posting } = await queryGQL(
    GET_POSTING,
    { id: parseInt(id), owned: true },
    await cookies(),
    0,
  );
  if (!posting) return notFound();
  return (
    <DashboardWrapper
      backRoute={Route.YourCampaigns}
      title={"Manage posting"}
      activeKey={Route.YourCampaigns}
    >
      <DetailsSections posting={posting} />
      <div className={"grid grid-cols-2 gap-2"}>
        <Link
          href={posting.id + Route.Selected}
          className={
            "shadow-md block rounded-xl mb-5 p-5 border border-gray-200 hover:bg-gray-50 transition-colors"
          }
        >
          <div className={"flex justify-between items-start"}>
            <p className={"text-3xl font-medium font-poppins text-gray-800"}>
              {posting.selectedCount}
            </p>

            <ArrowRight />
          </div>
          <h2 className={"text-sm font-poppins"}>Selected</h2>
        </Link>

        <Link
          href={posting.id + Route.Applications}
          className={
            "shadow-md block rounded-xl mb-5 p-5 border border-gray-200 hover:bg-gray-50 transition-colors"
          }
        >
          <div className={"flex justify-between items-start"}>
            <p className={"text-3xl font-medium font-poppins text-gray-800"}>
              {posting.applicationsCount}
            </p>

            <ArrowRight />
          </div>
          <h2 className={"text-sm font-poppins"}>Applied</h2>
        </Link>
      </div>

      <ExploreRecommendationsLink postingId={posting.id} />
      <RequirementsSections posting={posting} />
    </DashboardWrapper>
  );
}
