import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

import DetailsSections from "@/app/(dashboard)/your-campaigns/components/details-sections";
import RequirementsSections from "@/app/(dashboard)/your-campaigns/components/requirements-sections";
import { Route } from "@/constants/routes";
import { queryGQL } from "@/lib/apollo-server";
import { GET_POSTING } from "@/lib/queries";

export default async function CreateNewPostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericID = parseInt(id);
  const { posting } = await queryGQL(
    GET_POSTING,
    { id: numericID },
    undefined,
    0,
  );
  if (!posting) return notFound();
  return (
    <div>
      <DetailsSections posting={posting} />
      <div className={"grid grid-cols-2 gap-2"}>
        <div className={"shadow-md rounded-xl mb-5 p-5 border border-gray-200"}>
          <div className={"flex justify-between items-start"}>
            <p className={"text-3xl font-medium font-poppins text-gray-800"}>
              0
            </p>

            <div
              className={
                "bg-primary/90 text-xs text-white rounded-md px-1.5 py-0.5"
              }
            >
              Coming soon
            </div>
          </div>
          <h2 className={"text-sm font-poppins"}>Shortlisted</h2>
        </div>

        <Link
          href={posting.id + Route.Applications}
          className={"shadow-md rounded-xl mb-5 p-5 border border-gray-200"}
        >
          <p className={"text-3xl font-medium font-poppins text-gray-800"}>
            {posting.applicationsCount}
          </p>
          <h2 className={"text-sm font-poppins"}>Applied</h2>
        </Link>
      </div>

      <div className={"shadow-md rounded-xl mb-5 p-5 border border-gray-200"}>
        <div className={"flex justify-between items-start"}>
          <p className={"text-3xl font-medium font-poppins text-gray-600"}>
            <MagnifyingGlass weight={"bold"} />
          </p>
          <div
            className={
              "bg-primary/90 text-xs text-white rounded-md px-1.5 py-0.5"
            }
          >
            Coming soon
          </div>
        </div>
        <h2 className={"font-poppins mt-3"}>Explore recommendations</h2>
      </div>
      <RequirementsSections posting={posting} />
    </div>
  );
}
