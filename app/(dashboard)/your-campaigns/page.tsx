import { cookies } from "next/headers";
import React, { Suspense } from "react";

import SubpageRenderer from "@/app/(dashboard)/components/subpage-renderer";
import CreateNewPostingPage from "@/app/(dashboard)/your-campaigns/new/page";
import { Route } from "@/constants/routes";
import { Injector, queryGQL } from "@/lib/apollo-server";
import { GET_USER_POSTINGS } from "@/lib/queries";

import PostingsTable from "./components/postings-table";

export default async function PostingsPage() {
  return (
    <>
      <SubpageRenderer href={Route.NewCampaign}>
        <Suspense>
          <CreateNewPostingPage />
        </Suspense>
      </SubpageRenderer>
      <Injector
        fetch={async () =>
          queryGQL(GET_USER_POSTINGS, undefined, await cookies(), 0)
        }
        Component={PostingsTable}
      />
    </>
  );
}
