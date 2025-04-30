"use client";
import { EnvelopeSimple, Phone, SealCheck } from "@phosphor-icons/react";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

import type { GetPostingRecommendationsQuery } from "@/__generated__/graphql";
import { ApplicationStatus } from "@/__generated__/graphql";
import Table from "@/components/table";
import { getAgeRange } from "@/constants/age";
import { getRoute } from "@/constants/routes";
import { convertToAbbreviation } from "@/lib/utils";

type Application = NonNullable<
  GetPostingRecommendationsQuery["posting"]
>["recommendations"][number];
const colHelper = createColumnHelper<Application & { reach: string }>();

const DEFAULT_COLUMNS = [
  colHelper.accessor("user.instagramStats.username", {
    header: "Links",
    cell: (val) => (
      <div className="flex items-center gap-2">
        <a
          className="text-accent"
          href={`https://instagram.com/${val.getValue()}`}
          rel="noopener"
          target="_blank"
        >
          <InstagramLogo size={19} />
        </a>
        <button
          className="text-accent"
          onClick={async () => {
            if (val.row.original.user?.email) {
              await navigator.clipboard.writeText(val.row.original.user?.email);
              toast.success(
                `Copied ${val.row.original.user?.email} to clipboard`,
              );
            }
          }}
        >
          <EnvelopeSimple size={20} />
        </button>
        {val.row.original.user?.phone ? (
          <button
            className="text-accent"
            onClick={async () => {
              if (val.row.original.user?.phone) {
                await navigator.clipboard.writeText(
                  val.row.original.user?.phone,
                );
                toast.success(
                  `Copied ${val.row.original.user?.phone} to clipboard`,
                  {
                    duration: 5000,
                  },
                );
              }
            }}
            type="button"
          >
            <Phone size={20} />
          </button>
        ) : null}
      </div>
    ),
  }),

  colHelper.accessor("user.photo", {
    header: "Photo",

    cell: (value) => {
      const val = value.getValue();
      if (!val) return null;
      return (
        <Image
          alt={value.row.original.user?.name || ""}
          className="size-10 rounded-full object-cover"
          height={40}
          src={val}
          width={40}
        />
      );
    },
  }),
  colHelper.accessor("user.name", {
    header: "Name",
    enableColumnFilter: true,
    enableSorting: true,

    cell: (val) => (
      <Link
        className="flex items-center gap-2 font-medium text-accent hover:underline"
        href={`${getRoute("Profile")}/${val.row.original.user?.username}`}
        prefetch={false}
      >
        {val.getValue()}{" "}
        {val.row.original.user?.instagramStats?.isVerified ? (
          <SealCheck className="text-primary" weight="fill" />
        ) : null}
      </Link>
    ),
  }),
  colHelper.accessor("user.dob", {
    header: "Age",
    cell: (value) => {
      if (!value.getValue()) return "NA";
      return (
        (getAgeRange(new Date(value.getValue() || ""))?.minimum || 19) - 1 + "+"
      );
    },
  }),
  colHelper.accessor("user.instagramStats.followers", {
    enableSorting: true,
    header: "Followers",
    cell: ({ getValue }) => convertToAbbreviation(getValue()),
  }),
  colHelper.accessor("user.instagramStats.averageLikes", {
    enableSorting: true,
    header: "Avg. Likes",
  }),
  colHelper.accessor("reach", {
    enableSorting: true,
    header: "Reach",
    id: "reach",
  }),
  colHelper.accessor("user.instagramStats.er", {
    enableSorting: true,
    header: "ER",
  }),

  colHelper.accessor("user.instagramStats.mediaCount", {
    enableSorting: true,
    header: "Posts",
  }),
];

const compareFn = (a: Application, b: Application) =>
  (a.status === ApplicationStatus.Rejected ? 1 : 0) -
  (b.status === ApplicationStatus.Rejected ? 1 : 0);

export default function RecommendationsTable({
  applications: defaultApplications,
}: {
  applications: Application[];
}) {
  const [applications] = useState(
    defaultApplications.sort(compareFn).map((val) => ({
      ...val,
      reach: convertToAbbreviation(
        Math.round(
          ((val.user?.instagramStats?.er || 0) *
            (val.user?.instagramStats?.followers || 0)) /
            100,
        ),
      ),
    })),
  );
  return <Table columns={DEFAULT_COLUMNS} data={applications} />;
}
