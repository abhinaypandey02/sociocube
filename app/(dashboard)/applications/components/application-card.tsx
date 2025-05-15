"use client";
import { Check, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import {
  ApplicationStatus,
  GetUserApplicationsQuery,
} from "@/__generated__/graphql";
import SendReview from "@/app/(dashboard)/your-campaigns/[id]/applications/components/send-review";
import {
  getStatusColor,
  getStatusName,
} from "@/app/(dashboard)/your-campaigns/[id]/applications/utils";
import { getRoute } from "@/constants/routes";
import { useAuthMutation } from "@/lib/apollo-client";
import { UPDATE_SHORTLIST } from "@/lib/mutations";

export default function ApplicationCard({
  application: { posting, ...app },
}: {
  application: GetUserApplicationsQuery["getUserApplications"][number] & {
    isPendingReview: boolean;
  };
}) {
  const [status, setStatus] = useState(app.status);
  const [updateShortlist] = useAuthMutation(UPDATE_SHORTLIST);
  if (!posting) return null;
  return (
    <li
      className="flex items-center gap-3 rounded-md px-4 py-3"
      key={posting.id}
    >
      <Image
        alt={posting.agency.name || ""}
        className="size-16 shrink-0 rounded-full object-cover sm:size-20"
        height={80}
        src={posting.agency.photo || ""}
        width={80}
      />
      <div className="min-w-0 grow">
        <div className="flex flex-wrap items-start justify-between">
          <div>
            <Link
              prefetch={false}
              className="hover:underline"
              href={`${getRoute("Campaigns")}/${posting.id}`}
            >
              <h3 className="  gap-1.5  text-lg font-semibold  ">
                {posting.title}
              </h3>
            </Link>
            <div className="mt-0.5 flex items-center gap-3 text-sm  max-sm:w-full">
              <Link
                prefetch={false}
                className="font-poppins  font-semibold text-primary hover:underline"
                href={`${getRoute("Profile")}/${posting.agency.username}`}
              >
                {posting.agency.name}
              </Link>
            </div>
            <p className="mt-2 flex flex-wrap items-center gap-1 truncate text-xs leading-6 text-gray-700">
              {[new Date(app.createdAt).toDateString(), app.comment]
                .filter(Boolean)
                .join(" • ")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {status === ApplicationStatus.Shortlisted && (
              <div className={"flex gap-2"}>
                <button
                  onClick={() => {
                    void updateShortlist({
                      id: app.id,
                      accepted: true,
                    });
                    setStatus(ApplicationStatus.Selected);
                  }}
                >
                  <Check size={20} className={"text-primary"} />
                </button>
                <button
                  onClick={() => {
                    void updateShortlist({
                      id: app.id,
                      accepted: false,
                    });
                    setStatus(ApplicationStatus.Denied);
                  }}
                >
                  <X size={20} className={"text-red-400"} />
                </button>
              </div>
            )}
            {app.isPendingReview ? (
              <SendReview posting={posting} />
            ) : (
              <div
                className="mt-0.5 gap-1 rounded-md px-3 py-1.5 text-sm font-medium  sm:text-end"
                style={{
                  background: getStatusColor(status)[0],
                  color: getStatusColor(status)[1],
                }}
              >
                {getStatusName(status)}
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
