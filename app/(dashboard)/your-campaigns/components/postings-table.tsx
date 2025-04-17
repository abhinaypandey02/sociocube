"use client";
import {
  ArrowRight,
  ArrowSquareOut,
  PencilSimple,
  SmileyXEyes,
} from "@phosphor-icons/react";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import React from "react";

import type { GetUserPostingsQuery } from "@/__generated__/graphql";
import { getCurrency } from "@/app/(dashboard)/campaigns/utils";
import { NAV_ITEMS } from "@/app/(dashboard)/constants";
import { Button } from "@/components/button";
import LoaderSkeleton from "@/components/loader-skeleton";
import Table from "@/components/table";
import { Route } from "@/constants/routes";
import { useSubPage } from "@/lib/auth-client";

type Posting = NonNullable<GetUserPostingsQuery["postings"]>[number];

const columnHelper = createColumnHelper<Posting>();
const columns = [
  columnHelper.accessor("title", {
    header: "Title",
    cell: (val) => (
      <Link
        className="hover:underline"
        href={`${Route.Campaigns}/${val.row.original.id}`}
      >
        {val.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor("price", {
    header: "Payment",
    cell: (val) =>
      getCurrency(
        val.row.original.barter,
        val.row.original.currency,
        val.getValue(),
      ),
  }),

  columnHelper.accessor("applicationsCount", {
    header: "Applications",
    cell: (val) => (
      <Link
        className="flex items-center gap-1"
        href={`${Route.YourCampaigns}/${val.row.original.id}${Route.Applications}`}
      >
        {val.getValue()}&nbsp;
        <span className="text-primary hover:underline">View</span>
      </Link>
    ),
  }),
  columnHelper.accessor("open", {
    header: "Status",
    cell: (val) => (val.getValue() ? "Open" : "Paused"),
  }),
  columnHelper.accessor("id", {
    header: "Actions",
    cell: (val) => (
      <div className="flex gap-2">
        <Link
          className="text-accent"
          href={`${Route.YourCampaigns}/${val.getValue()}`}
        >
          <PencilSimple size={18} />
        </Link>
        <Link
          className="text-accent"
          href={`${Route.Campaigns}/${val.row.original.id}`}
        >
          <ArrowSquareOut size={18} />
        </Link>
      </div>
    ),
  }),
];

export default function PostingsTable({
  data,
  loading,
}: {
  data?: GetUserPostingsQuery;
  loading?: boolean;
}) {
  const { setOpenSubPage } = useSubPage();

  const postings = data?.postings;
  if (loading) return <LoaderSkeleton className={"mt-10"} />;
  if (!postings || postings.length === 0)
    return (
      <LoaderSkeleton
        className={"mt-10"}
        title={"You haven't created any campaigns"}
        subtitle={
          <Button
            onClick={() =>
              setOpenSubPage(
                NAV_ITEMS.find((item) => item.href === Route.NewCampaign),
              )
            }
            className={"items-center gap-1"}
          >
            Start your first campaign <ArrowRight />
          </Button>
        }
        Icon={SmileyXEyes}
      />
    );
  return <Table columns={columns} data={postings} />;
}
