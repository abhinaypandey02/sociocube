import { cookies } from "next/headers";
import React from "react";

import { Route } from "@/constants/routes";
import { Injector, queryGQL } from "@/lib/apollo-server";
import { GET_USER_APPLICATIONS } from "@/lib/queries";

import DashboardWrapper from "../components/dashboard-wrapper";
import MyApplications from "./components/my-applications";

export default async function MyApplicationsPage() {
  return (
    <DashboardWrapper
      title={"Your applications"}
      activeKey={Route.Applications}
    >
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
    </DashboardWrapper>
  );
}
