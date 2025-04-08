import { Suspense } from "react";

import MyApplications from "@/app/(dashboard)/applications/page";
import SubpageRenderer from "@/app/(dashboard)/components/subpage-renderer";
import { Route } from "@/constants/routes";
import { getSEO } from "@/constants/seo";
import { Injector, queryGQL } from "@/lib/apollo-server";
import { GET_ALL_POSTINGS } from "@/lib/queries";

import SearchWindow from "./components/search-window";

export function generateMetadata() {
  return getSEO("Find influencer campaigns");
}

export default function SearchPage() {
  return (
    <>
      <SubpageRenderer href={Route.AccountApplications}>
        <Suspense>
          <MyApplications />
        </Suspense>
      </SubpageRenderer>
      <Injector
        Component={SearchWindow}
        fetch={() => queryGQL(GET_ALL_POSTINGS, { page: 1 }, undefined, 120)}
      />
    </>
  );
}
