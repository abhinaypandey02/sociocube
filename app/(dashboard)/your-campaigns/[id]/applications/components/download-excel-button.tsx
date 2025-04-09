import { DownloadSimple } from "@phosphor-icons/react";
import React from "react";
import writeXlsxFile from "write-excel-file";

import type { GetPostingApplicationsQuery } from "@/__generated__/graphql";
import { getAge } from "@/constants/age";
import { getRoute } from "@/constants/routes";

import { getStatusName } from "../utils";

export default function DownloadExcelButton({
  applications,
  postingTitle,
  extraDetails,
}: {
  applications: GetPostingApplicationsQuery["applications"];
  postingTitle: string;
  extraDetails?: string;
}) {
  return (
    <button
      className="flex items-center gap-1 text-sm font-medium text-primary underline underline-offset-4"
      onClick={async () => {
        await writeXlsxFile(
          [
            [
              { value: "Name" },
              { value: "Email" },
              { value: "Phone" },
              { value: "Age" },
              { value: "Profile" },
              { value: "Instagram" },
              { value: "Followers" },
              { value: "Avg Likes" },
              { value: "Reach" },
              { value: "ER" },
              { value: "Total Posts" },
              { value: "Status" },
              ...(extraDetails ? [{ value: extraDetails }] : []),
              { value: "Date" },
            ].map((val) => ({ ...val, fontWeight: "bold" as const })),
            ...applications.map((app) => [
              {
                type: String,
                value: app.user?.name || "",
              },
              {
                type: String,
                value: app.email || "",
              },
              {
                type: String,
                value: app.phone || "",
              },
              {
                type: Number,
                value: getAge(new Date(app.user?.dob || "")),
              },
              {
                type: String,
                value: `${getRoute("Profile")}/${app.user?.username}`,
              },
              {
                type: String,
                value: `https://instagram.com/${app.user?.instagramStats?.username}`,
              },
              {
                type: Number,
                value: app.user?.instagramStats?.followers,
              },
              {
                type: Number,
                value: app.user?.instagramStats?.averageLikes,
              },
              {
                type: Number,
                value: Math.round(
                  ((app.user?.instagramStats?.er || 0) *
                    (app.user?.instagramStats?.followers || 0)) /
                    100,
                ),
              },
              {
                type: Number,
                value: app.user?.instagramStats?.er,
              },
              {
                type: Number,
                value: app.user?.instagramStats?.mediaCount,
              },
              {
                type: String,
                value: getStatusName(app.status),
              },
              ...(extraDetails
                ? [
                    {
                      type: String,
                      value: app.comment || "",
                    },
                  ]
                : []),
              {
                type: Date,
                value: new Date(app.createdAt),
                format: "mm/dd/yyyy hh:mm",
              },
            ]),
          ],
          {
            fileName: `${postingTitle}.xlsx`,
          },
        );
      }}
      type="button"
    >
      Download excel
      <DownloadSimple size={18} />
    </button>
  );
}
