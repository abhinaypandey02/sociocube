"use client";
import React, { useCallback, useState } from "react";
import type { CellContext } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { ChatCircleDots, EnvelopeSimple, Phone, SealCheck } from "@phosphor-icons/react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { getAge } from "@/constants/age";
import Table from "@/components/table";
import type { GetPostingApplicationsQuery } from "@/__generated__/graphql";
import { ApplicationStatus } from "@/__generated__/graphql";
import { getRoute } from "@/constants/routes";
import { convertToAbbreviation } from "@/lib/utils";
import ApplicationActions from "./application-actions";
import DownloadExcelButton from "./download-excel-button";

type Application = GetPostingApplicationsQuery["applications"][number];
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
            if (val.row.original.email) {
              await navigator.clipboard.writeText(val.row.original.email);
              toast.success(`Copied ${val.row.original.email} to clipboard`);
            }
          }}
        >
          <EnvelopeSimple size={20} />
        </button>
        {val.row.original.phone ? (
          <button
            className="text-accent"
            onClick={async () => {
              if (val.row.original.phone) {
                await navigator.clipboard.writeText(val.row.original.phone);
                toast.success(`Copied ${val.row.original.phone} to clipboard`, {
                  duration: 5000,
                });
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
    cell: (val) => (
      <Link
        className="flex items-center gap-2 font-medium text-accent hover:underline"
        href={`${getRoute("Profile")}/${val.row.original.user?.username}`}
        prefetch={false}
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
    cell: (value) => {
      const age = getAge(new Date(value.getValue() || ""));
      if (isNaN(age)) return "NA";
      return age;
    },
  }),
  colHelper.accessor("user.instagramStats.followers", {
    header: "Followers",
    cell: ({ getValue }) => convertToAbbreviation(getValue()),
  }),
  colHelper.accessor("user.instagramStats.averageLikes", {
    header: "Avg. Likes",
  }),
  colHelper.accessor("reach", {
    header: "Reach",
    id: "reach",
  }),
  colHelper.accessor("user.instagramStats.er", {
    header: "ER",
  }),

  colHelper.accessor("user.instagramStats.mediaCount", {
    header: "Posts",
  }),
];

const compareFn = (a: Application, b: Application) =>
  (a.status === ApplicationStatus.Rejected ? 1 : 0) -
  (b.status === ApplicationStatus.Rejected ? 1 : 0);

export default function ApplicationsTable({
  applications: defaultApplications,
  posting,
}: {
  applications: Application[];
  posting: GetPostingApplicationsQuery["posting"];
  showEarnings: boolean;
}) {
  const [applications, setApplications] = useState(
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

  const handleReject = (id: number) => {
    setApplications((prev) =>
      prev
        .map((val) =>
          val.id === id ? { ...val, status: ApplicationStatus.Rejected } : val,
        )
        .sort(compareFn),
    );
  };
  const handleLike = (id: number) => {
    setApplications((prev) =>
      prev.map((val) =>
        val.id === id ? { ...val, status: ApplicationStatus.Interested } : val,
      ),
    );
  };

  const handleReview = (id: number) => {
    setApplications((prev) =>
      prev.map((val) =>
        val.id === id ? { ...val, status: ApplicationStatus.Completed } : val,
      ),
    );
  };

  const ApplicationActionsCell = useCallback(
    (val: CellContext<Application & { reach: string }, ApplicationStatus>) => (
      <ApplicationActions
        handleLike={handleLike}
        handleReject={handleReject}
        handleReview={handleReview}
        id={val.row.original.id}
        status={val.getValue()}
        user={val.row.original.user}
      />
    ),
    [],
  );
  const columns = [
    ...DEFAULT_COLUMNS,
    ...(posting?.externalLink
      ? []
      : [
          colHelper.accessor("comment", {
            header: posting?.extraDetails || "Comment",
            // eslint-disable-next-line react/no-unstable-nested-components -- needed
            cell: (val) => {
              const comment = val.getValue();
              if (!comment) return null;
              return (
                <Popover className="relative">
                  <PopoverButton className="flex items-center font-poppins">
                    {comment.slice(0, 25)}
                    {comment.length > 25 ? (
                      <ChatCircleDots
                        className="ml-1 text-primary"
                        size={18}
                        weight="duotone"
                      />
                    ) : null}
                  </PopoverButton>
                  <PopoverPanel
                    anchor="top"
                    className="flex w-80 -translate-y-2 flex-col rounded-xl border border-gray-200 bg-white px-5 py-3 text-center text-sm font-light shadow-sm"
                  >
                    {val.getValue()}
                  </PopoverPanel>
                </Popover>
              );
            },
          }),
        ]),

    colHelper.accessor("status", {
      header: "Actions",
      cell: ApplicationActionsCell,
    }),
    colHelper.accessor("createdAt", {
      header: "Date",
      cell: (val) => new Date(val.getValue()).toDateString(),
    }),
  ];
  return (
    <>
      <div className="mb-4 flex justify-end">
        <DownloadExcelButton
          applications={applications}
          extraDetails={
            posting?.externalLink
              ? undefined
              : posting?.extraDetails || "Comment"
          }
          postingTitle={posting?.title || "Posting"}
        />
      </div>
      <Table columns={columns} data={applications} />
    </>
  );
}
