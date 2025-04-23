import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

import { getRoute } from "@/constants/routes";
import { getSEO } from "@/constants/seo";
import { Injector, queryGQL } from "@/lib/apollo-server";
import {
  GET_ACCOUNT_PORTFOLIO_DETAILS,
  GET_ACCOUNT_PROFILE_DETAILS,
  GET_ACCOUNT_SOCIAL_DETAILS,
} from "@/lib/queries";

import ConnectionsSection from "./components/connections-section";
import LinksSection from "./components/links-section";
import PortfolioSection from "./components/portfolio-section";
import ProfileSection from "./components/profile-section";
import StatsSection from "./components/stats-section";
import VerifiedBadge from "./components/verified-badge";

export default async function ProfilePage() {
  const Cookie = await cookies();
  const { user } = await queryGQL(
    GET_ACCOUNT_PROFILE_DETAILS,
    undefined,
    Cookie,
    0,
  );
  if (!user) return redirect(getRoute("SignUp"));
  return (
    <div className="max-w-(--breakpoint-lg) mx-auto">
      <ProfileSection
        VerifiedBadge={
          <Suspense>
            <VerifiedBadge Cookie={Cookie} />
          </Suspense>
        }
        user={user}
      />
      <Injector
        fetch={() => queryGQL(GET_ACCOUNT_SOCIAL_DETAILS, undefined, Cookie, 0)}
        Component={StatsSection}
      />
      <Injector
        fetch={() =>
          queryGQL(GET_ACCOUNT_PORTFOLIO_DETAILS, undefined, Cookie, 0)
        }
        Component={PortfolioSection}
      />
      <Injector
        fetch={() =>
          queryGQL(GET_ACCOUNT_PORTFOLIO_DETAILS, undefined, Cookie, 0)
        }
        Component={LinksSection}
      />
      <Injector
        fetch={() => queryGQL(GET_ACCOUNT_SOCIAL_DETAILS, undefined, Cookie, 0)}
        Component={ConnectionsSection}
        props={{ profile: user }}
      />
    </div>
  );
}
export const metadata = getSEO("Manage your Account");
