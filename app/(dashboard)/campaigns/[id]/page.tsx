import type { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

import PostingsData from "@/app/(dashboard)/campaigns/components/postings-data";
import { getPostingCacheTag } from "@/constants/revalidate";
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
  const { posting } = await queryGQL(
    GET_POSTING,
    {
      id,
    },
    undefined,
    undefined,
    [getPostingCacheTag(id)],
  );
  if (!posting) return notFound();
  return (
    <PostingsData
      fetchInitialData={true}
      data={{ postings: [posting] }}
      loading={false}
    />
  );
}
