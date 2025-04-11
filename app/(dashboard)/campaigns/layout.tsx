import { PropsWithChildren, Suspense } from "react";

import MyApplications from "@/app/(dashboard)/applications/page";
import SubpageRenderer from "@/app/(dashboard)/components/subpage-renderer";
import { Route } from "@/constants/routes";
import { getSEO } from "@/constants/seo";

export function generateMetadata() {
  return getSEO("Find influencer your-campaigns");
}

export default function SearchPage({ children }: PropsWithChildren) {
  return (
    <>
      <SubpageRenderer href={Route.Applications}>
        <Suspense>
          <MyApplications />
        </Suspense>
      </SubpageRenderer>
      {children}
    </>
  );
}
