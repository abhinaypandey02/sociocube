"use client";
import React from "react";
import Table from "ui/table";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import { getAge } from "commons/age";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import {
  ChatCircleDots,
  EnvelopeSimple,
  SealCheck,
} from "@phosphor-icons/react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import type { GetPostingApplicationsQuery } from "../../../../../__generated__/graphql";
import { getRoute } from "../../../../../constants/routes";
import { convertToAbbreviation } from "../../../../../lib/utils";

type Application = GetPostingApplicationsQuery["applications"][number];
const colHelper = createColumnHelper<Application>();

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
              await navigator.clipboard.writeText(val.row.original.email);
              toast.success(`Copied ${val.row.original.email} to clipboard`);
            }
          }}
        >
          <EnvelopeSimple size={20} />
        </button>
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
          className="size-10 rounded-full"
          height={40}
          src={val}
          width={40}
        />
      );
    },
  }),
  colHelper.accessor("user.name", {
    header: "Name",
    cell: (val) => (
      <Link
        className="flex items-center gap-2 font-medium text-accent hover:underline"
        href={`${getRoute("Profile")}/${val.row.original.user?.username}`}
      >
        {val.getValue()}{" "}
        {val.row.original.user?.instagramStats?.isVerified ? (
          <SealCheck className="text-accent" weight="fill" />
        ) : null}
      </Link>
    ),
  }),
  colHelper.accessor("user.dob", {
    header: "Age",
    cell: (value) => getAge(new Date(value.getValue() || "")),
  }),
  colHelper.accessor("user.instagramStats.followers", {
    header: "Followers",
    cell: ({ getValue }) => convertToAbbreviation(getValue()),
  }),
  colHelper.accessor("user.instagramStats.averageLikes", {
    header: "Avg. Likes",
  }),
  colHelper.accessor("user.instagramStats.er", {
    header: "Reach",
    id: "reach",
    cell: (val) =>
      convertToAbbreviation(
        Math.round(
          (val.getValue() *
            (val.row.original.user?.instagramStats?.followers || 0)) /
            100,
        ),
      ),
  }),
  colHelper.accessor("user.instagramStats.er", {
    header: "ER",
  }),

  colHelper.accessor("user.instagramStats.mediaCount", {
    header: "Posts",
  }),
];

export default function ApplicationsTable({
  applications,
  posting,
}: {
  applications: Application[];
  posting: GetPostingApplicationsQuery["posting"];
}) {
  const columns = [
    ...DEFAULT_COLUMNS,
    colHelper.accessor("comment", {
      header: posting?.extraDetails || "Comment",
      // eslint-disable-next-line react/no-unstable-nested-components -- needed
      cell: (val) => {
        const comment = val.getValue();
        if (!comment) return null;
        return (
          <Popover className="relative">
            <PopoverButton className="flex items-center font-poppins">
              {comment.slice(0, 30)}
              {comment.length > 30 ? (
                <ChatCircleDots
                  className="ml-1 text-primary"
                  size={18}
                  weight="duotone"
                />
              ) : null}
            </PopoverButton>
            <PopoverPanel
              anchor="top"
              className="flex w-80 -translate-y-2 flex-col rounded-xl border border-gray-200 bg-white px-5 py-3 text-center text-sm font-light shadow"
            >
              {val.getValue()}
            </PopoverPanel>
          </Popover>
        );
      },
    }),
  ];
  return <Table columns={columns} data={applications} />;
}
