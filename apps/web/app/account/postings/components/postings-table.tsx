"use client";
import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import Table from "ui/table";
import Link from "next/link";
import { ArrowSquareOut } from "@phosphor-icons/react";
import type { GetUserPostingsQuery } from "../../../../__generated__/graphql";
import { getCurrency } from "../../../postings/utils";
import { Route } from "../../../../constants/routes";

type Posting = NonNullable<GetUserPostingsQuery["postings"]>[number];

const columnHelper = createColumnHelper<Posting>();
const columns = [
  columnHelper.accessor("title", {
    header: "Title",
    cell: (val) => val.getValue(),
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
        {val.getValue()}
        <ArrowSquareOut className="text-accent" weight="bold" />
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
      <div className="flex ">
        <Link
          className="text-primary"
          href={`${Route.Postings}/${val.getValue()}`}
        >
          View&nbsp;
        </Link>
        <Link
          className="text-accent"
          href={`${Route.AccountPostingsEdit}/${val.getValue()}`}
        >
          Edit
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
