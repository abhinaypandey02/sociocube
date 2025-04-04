import { Suspense } from "react";
import { getSEO } from "@/constants/seo";
import { Injector, queryGQL } from "@/lib/apollo-server";
import { GET_ALL_POSTINGS } from "@/lib/queries";
import SubpageRenderer from "@/app/(dashboard)/components/subpage-renderer";
import MyApplications from "@/app/account/applications/page";
import { Route } from "@/constants/routes";
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
