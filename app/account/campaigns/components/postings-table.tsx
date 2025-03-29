"use client";
import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { ArrowSquareOut, PencilSimple } from "@phosphor-icons/react";
import Table from "@/components/table";
import type { GetUserPostingsQuery } from "@/__generated__/graphql";
import { getCurrency } from "@/app/campaigns/utils";
import { Route } from "@/constants/routes";

type Posting = NonNullable<GetUserPostingsQuery["postings"]>[number];

const columnHelper = createColumnHelper<Posting>();
const columns = [
  columnHelper.accessor("title", {
    header: "Title",
    cell: (val) => (
      <Link
        className="hover:underline"
        href={`${Route.Postings}/${val.row.original.id}`}
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
        href={`${Route.AccountPostingsApplications}/${val.row.original.id}`}
      >
        {val.getValue()}&nbsp;
        <Link
          className="text-primary hover:underline"
          href={`${Route.AccountPostingsApplications}/${val.row.original.id}`}
        >
          View
        </Link>
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
          href={`${Route.AccountPostingsEdit}/${val.getValue()}`}
        >
          <PencilSimple size={18} />
        </Link>
        <Link
          className="text-accent"
          href={`${Route.Postings}/${val.row.original.id}`}
        >
          <ArrowSquareOut size={18} />
        </Link>
      </div>
    ),
  }),
];

export default function PostingsTable({
  postings,
  showEarnings,
}: {
  postings: GetUserPostingsQuery["postings"];
  showEarnings: boolean;
}) {
  return (
    <Table
      columns={[
        ...columns,
        ...(showEarnings
          ? [
              columnHelper.accessor("referralEarnings", {
                header: "Earnings",
              }),
            ]
          : []),
      ]}
      data={postings}
    />
  );
}
