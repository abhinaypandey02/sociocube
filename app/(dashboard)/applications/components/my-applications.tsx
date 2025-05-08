"use client";
import { MagnifyingGlass, SmileySad } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { GetUserApplicationsQuery } from "@/__generated__/graphql";
import SendReview from "@/app/(dashboard)/your-campaigns/[id]/applications/components/send-review";
import {
  getStatusColor,
  getStatusName,
} from "@/app/(dashboard)/your-campaigns/[id]/applications/utils";
import { Button } from "@/components/button";
import { Variants } from "@/components/constants";
import LoaderSkeleton from "@/components/loader-skeleton";
import { getRoute } from "@/constants/routes";

export default function MyApplications({
  data,
  loading,
}: {
  data?: {
    applications: (GetUserApplicationsQuery["getUserApplications"][number] & {
      isPendingReview: boolean;
    })[];
  };
  loading: boolean;
}) {
  const applications = data?.applications;
  if (loading) {
    return <LoaderSkeleton />;
  }
  return (
    <div>
      {applications?.length === 0 && (
        <LoaderSkeleton
          Icon={SmileySad}
          title={"You haven't applied to any campaigns yet."}
          subtitle={
            <Link href={getRoute("Campaigns")}>
              <Button variant={Variants.DARK} className="gap-1">
                Apply now <MagnifyingGlass />
              </Button>
            </Link>
          }
        />
      )}
      <ul className="space-y-5">
        {applications?.map(
          ({ posting, ...app }) =>
            posting && (
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
                      {app.isPendingReview ? (
                        <SendReview posting={posting} />
                      ) : (
                        <div
                          className="mt-0.5 gap-1 rounded-md px-3 py-1.5 text-sm font-medium  sm:text-end"
                          style={{
                            background: getStatusColor(app.status)[0],
                            color: getStatusColor(app.status)[1],
                          }}
                        >
                          {getStatusName(app.status)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ),
        )}
      </ul>
    </div>
  );
}
