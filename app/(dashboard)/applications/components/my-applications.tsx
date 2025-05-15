"use client";
import { MagnifyingGlass, SmileySad } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

import { GetUserApplicationsQuery } from "@/__generated__/graphql";
import ApplicationCard from "@/app/(dashboard)/applications/components/application-card";
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
        {applications?.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </ul>
    </div>
  );
}
