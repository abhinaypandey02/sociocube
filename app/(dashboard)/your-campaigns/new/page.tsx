import { cookies } from "next/headers";
import React from "react";

import DashboardWrapper from "@/app/(dashboard)/components/dashboard-wrapper";
import { Route } from "@/constants/routes";
import { Injector, queryGQL } from "@/lib/apollo-server";
import { GET_USER_CURRENCY } from "@/lib/queries";

import CreateNewPostingForm from "../components/form";

export default async function CreateNewPostingPage() {
  return (
    <DashboardWrapper
      backRoute={Route.YourCampaigns}
      title={"New campaign"}
      activeKey={Route.NewCampaign}
    >
      <div className="max-w-2xl">
        <Injector
          fetch={async () =>
            queryGQL(GET_USER_CURRENCY, undefined, await cookies())
          }
          Component={CreateNewPostingForm}
          props={{}}
        />
      </div>
    </DashboardWrapper>
  );
}
