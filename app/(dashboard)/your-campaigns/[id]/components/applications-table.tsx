"use client";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChatCircleDots, SealCheck } from "@phosphor-icons/react";
import type { CellContext } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useState } from "react";

import type { GetPostingApplicationsQuery } from "@/__generated__/graphql";
import { ApplicationStatus } from "@/__generated__/graphql";
import SendAnnouncementButton from "@/app/(dashboard)/your-campaigns/[id]/components/send-announcement-button";
import RecommendationActions from "@/app/(dashboard)/your-campaigns/[id]/explore/components/recommendation-actions";
import SelectedActions from "@/app/(dashboard)/your-campaigns/[id]/selected/components/selected-actions";
import Table from "@/components/table";
import { getAgeRange } from "@/constants/age";
import { getRoute } from "@/constants/routes";
import { convertToAbbreviation } from "@/lib/utils";
import { useOpenPopup } from "@/state/hooks";

import ApplicationActions from "../applications/components/application-actions";
import { ContactButtons } from "./contact-buttons";
import DownloadExcelButton from "./download-excel-button";

export type ApplicationTableRow = Omit<
  GetPostingApplicationsQuery["applications"][number],
  "status"
> & {
  status?: ApplicationStatus | null;
};

function SubscriptionStat() {
  const toggleSubscribeModal = useOpenPopup("GET_SUBSCRIPTION");

  return (
    <span
      className="blur-xs cursor-pointer"
      onClick={() => toggleSubscribeModal("View advanced stats of applicants")}
      title="Subscribe to view this stat"
    >
      XX
    </span>
  );
}

const colHelper = createColumnHelper<ApplicationTableRow & { reach: number }>();

const DEFAULT_COLUMNS = [
  colHelper.accessor("user.instagramStats.username", {
    header: "Links",
    cell: (val) => (
      <ContactButtons
        chatUsername={val.row.original.user?.username}
        instaUsername={val.getValue()}
        email={val.row.original.user?.email}
        phone={val.row.original.user?.phone}
      />
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
    cell: ({ getValue }) => {
      const value = getValue();
      if (value === -2) {
        return <SubscriptionStat />;
      }
      return convertToAbbreviation(value);
    },
  }),
  colHelper.accessor("user.instagramStats.averageLikes", {
    enableSorting: true,
    header: "Avg. Likes",
    cell: ({ getValue }) => {
      const value = getValue();
      if (value === -2) {
        return <SubscriptionStat />;
      }
      return convertToAbbreviation(value);
    },
  }),
  colHelper.accessor("reach", {
    enableSorting: true,
    header: "Reach",
    id: "reach",
    cell: ({ getValue }) => {
      const value = getValue();
      if (value === -2) {
        return <SubscriptionStat />;
      }
      return convertToAbbreviation(value);
    },
  }),
  colHelper.accessor("user.instagramStats.er", {
    enableSorting: true,
    header: "ER",
    id: "er",
    cell: ({ getValue }) => {
      const value = getValue();
      if (value === -2) {
        return <SubscriptionStat />;
      }
      return convertToAbbreviation(value);
    },
  }),

  colHelper.accessor("user.instagramStats.mediaCount", {
    enableSorting: true,
    header: "Posts",
    id: "mediaCount",
    cell: ({ getValue }) => {
      const value = getValue();
      if (value === -2) {
        return <SubscriptionStat />;
      }
      return convertToAbbreviation(value);
    },
  }),
];

const compareFn = (a: ApplicationTableRow, b: ApplicationTableRow) =>
  (a.status === ApplicationStatus.Rejected ? 1 : 0) -
  (b.status === ApplicationStatus.Rejected ? 1 : 0);

export default function ApplicationsTable({
  applications: defaultApplications,
  posting,
  sub,
  actionType,
}: {
  applications: ApplicationTableRow[];
  posting: NonNullable<GetPostingApplicationsQuery["posting"]>;
  sub: GetPostingApplicationsQuery["getSubscription"];
  actionType: "applications" | "recommendations" | "selected";
}) {
  const [applications] = useState(
    defaultApplications.sort(compareFn).map((val) => ({
      ...val,
      reach:
        val.user?.instagramStats?.er === -2
          ? -2
          : Math.round(
              ((val.user?.instagramStats?.er || 0) *
                (val.user?.instagramStats?.followers || 0)) /
                100,
            ),
    })),
  );
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelectionChange = useCallback(
    (row: Record<string, boolean>) => {
      const selectedRowIndices = Object.keys(row)
        .filter((key) => row[key])
        .map(Number);

      const selectedApplicationIds = selectedRowIndices
        .map((index) => applications[index]?.id)
        .filter((id): id is number => id !== undefined);

      setSelectedIds(selectedApplicationIds);
    },
    [applications],
  );

  const ApplicationActionsCell = useCallback(
    (
      val: CellContext<
        ApplicationTableRow & { reach: number },
        ApplicationStatus
      >,
    ) =>
      actionType === "recommendations" ? (
        <RecommendationActions
          status={val.getValue()}
          postingID={posting.id}
          userID={val.row.original.user?.id || -1}
        />
      ) : actionType === "applications" ? (
        <ApplicationActions id={val.row.original.id} status={val.getValue()} />
      ) : (
        <SelectedActions
          id={val.row.original.id}
          status={val.getValue()}
          user={val.row.original.user}
          hasReview={val.row.original.hasReview}
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
  ];
  return (
    <Table
      cta={
        <div className={"flex gap-2 items-center justify-end"}>
          {actionType === "selected" && applications.length > 0 && (
            <SendAnnouncementButton
              count={sub.usages.PostingAnnouncement}
              dailyCount={sub.usages.GlobalAnnouncement}
              applications={
                selectedIds.length > 0
                  ? applications.filter((app) => selectedIds.includes(app.id))
                  : applications
              }
              postingID={posting.id}
            />
          )}
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
      }
      columns={columns}
      data={applications}
      onSelect={actionType === "selected" ? handleSelectionChange : undefined}
    />
  );
}
