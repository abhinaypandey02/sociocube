import type { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

import PostingsData from "@/app/(dashboard)/campaigns/components/postings-data";
import { getSEO } from "@/constants/seo";
import { Injector, queryGQL } from "@/lib/apollo-server";
import { GET_ALL_POSTINGS, GET_POSTING } from "@/lib/queries";

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
    ["posting"],
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
  return (
    <Injector
      Component={PostingsData}
      fetch={async () => {
        const id = parseInt((await params).id);
        const Cookie = await cookies();
        const token = Cookie.get("refresh")?.value;
        return queryGQL(
          GET_ALL_POSTINGS,
          { page: 1, posting: id },
          Cookie,
          token ? 0 : 3600,
          ["posting"],
        );
      }}
    />
  );
}
