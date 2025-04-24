import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

import { getRoute, Route } from "@/constants/routes";
import { getSEO } from "@/constants/seo";
import { Injector, queryGQL } from "@/lib/apollo-server";
import {
  GET_ACCOUNT_PORTFOLIO_DETAILS,
  GET_ACCOUNT_PROFILE_DETAILS,
  GET_ACCOUNT_SOCIAL_DETAILS,
} from "@/lib/queries";

import SubpageRenderer from "../components/subpage-renderer";
import SettingsPage from "../settings/page";
import ConnectionsSection from "./components/connections-section";
import LinksSection from "./components/links-section";
import PortfolioSection from "./components/portfolio-section";
import ProfileSection from "./components/profile-section";
import StatsSection from "./components/stats-section";
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
      <SubpageRenderer href={Route.Settings}>
        <SettingsPage />
      </SubpageRenderer>
      <Injector
        fetch={() => queryGQL(GET_ACCOUNT_SOCIAL_DETAILS, undefined, Cookie, 0)}
        Component={ProfileSection}
        props={{ user }}
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
