import { DownloadSimple } from "@phosphor-icons/react";
import React from "react";
import writeXlsxFile from "write-excel-file";

import { ApplicationTableRow } from "@/app/(dashboard)/your-campaigns/[id]/components/applications-table";
import { getAge } from "@/constants/age";
import { getRoute } from "@/constants/routes";
import { useOpenPopup } from "@/state/hooks";
import { useSubscription } from "@/state/hooks";

import { getStatusName } from "../applications/utils";

export default function DownloadExcelButton({
  applications,
  postingTitle,
  extraDetails,
}: {
  applications: ApplicationTableRow[];
  postingTitle: string;
  extraDetails?: string;
}) {
  const toggleSubscribeModal = useOpenPopup("GET_SUBSCRIPTION");
  const [subscription] = useSubscription();
  return (
    <button
      className="flex items-center gap-1 text-sm font-medium text-primary underline underline-offset-4"
      onClick={async () => {
        if (!subscription?.existing.plan) {
          toggleSubscribeModal("Download data as excel with Plus subscription");
          return;
        }
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
                value: app.user?.email || "",
              },
              {
                type: String,
                value: app.user?.phone || "",
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
                value: app.status ? getStatusName(app.status) : "NA",
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
      <DownloadSimple size={18} />
      <span className={"shrink-0"}>Download excel</span>
    </button>
  );
}
