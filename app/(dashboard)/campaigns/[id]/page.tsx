import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

import PostingsData from "@/app/(dashboard)/campaigns/components/postings-data";
import DashboardWrapper from "@/app/(dashboard)/components/dashboard-wrapper";
import { getPostingCacheTag } from "@/constants/revalidate";
import { Route } from "@/constants/routes";
import { getSEO } from "@/constants/seo";
import { queryGQL } from "@/lib/apollo-server";
import { GET_POSTING } from "@/lib/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = parseInt((await params).id);
  const { posting } = await queryGQL(
    GET_POSTING,
    {
      id,
    },
    undefined,
    undefined,
    [getPostingCacheTag(id)],
  );
  return getSEO(
    `${posting?.title} by ${posting?.agency.name}`,
    posting?.description,
  );
}

export default async function JobPostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = parseInt((await params).id);
  const Cookie = await cookies();
  const { posting } = await queryGQL(
    GET_POSTING,
    {
      id,
    },
    Cookie,
    Cookie.get("refresh")?.value ? 0 : undefined,
    [getPostingCacheTag(id)],
  );
  if (!posting) return notFound();
  return (
    <DashboardWrapper title={"Apply to campaigns"} activeKey={Route.Campaigns}>
      <PostingsData
        fetchInitialData={true}
        data={{ postings: [posting] }}
        loading={false}
      />
    </DashboardWrapper>
  );
}
