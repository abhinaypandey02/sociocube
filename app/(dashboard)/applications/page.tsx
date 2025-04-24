import { cookies } from "next/headers";
import React from "react";

import { Injector, queryGQL } from "@/lib/apollo-server";
import { GET_USER_APPLICATIONS } from "@/lib/queries";

import MyApplications from "./components/my-applications";

export default async function MyApplicationsPage() {
  return (
    <Injector
      fetch={async () => {
        const { getUserApplications, getPendingReviews } = await queryGQL(
          GET_USER_APPLICATIONS,
          undefined,
          await cookies(),
          0,
        );

        const applications = getUserApplications.map((app) => ({
          ...app,
          isPendingReview: getPendingReviews.includes(app.posting?.id || -1),
        }));
        return { applications };
      }}
      Component={MyApplications}
    />
  );
}
