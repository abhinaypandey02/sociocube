"use client";
import React from "react";

import { GetAccountSocialDetailsQuery } from "@/__generated__/graphql";
import { convertToAbbreviation } from "@/lib/utils";
import { useToggleSubscribeModal } from "@/lib/auth-client";

import AccountCard from "./account-card";
export default function StatsSection({
  data,
}: {
  data?: GetAccountSocialDetailsQuery;
}) {
  const toggleSubscribeModal = useToggleSubscribeModal();
  const user = data?.user;
  if (!user?.instagramStats) return null;
  return (
    <AccountCard
      title="Instagram Stats"
      subtitle="These are just estimates and not official data."
    >
      <div className="grid grid-cols-3 gap-y-5 gap-x-3 lg:grid-cols-6">
        {[
          {
            value: convertToAbbreviation(user.instagramStats?.followers),
            label: "Followers",
            suffix: ""
          },
          {
            value: convertToAbbreviation(
              user.instagramStats?.er === -2 ? -2 : user.instagramStats?.er
            ),
            label: "Engagement",
            suffix: "%"
          },
          {
            value: convertToAbbreviation(
              user.instagramStats?.followers === -2
                ? -2
                : user.instagramStats?.er * user.instagramStats?.followers
            ),
            label: "Reach",
            suffix: ""
          },
          {
            value: convertToAbbreviation(user.instagramStats?.mediaCount),
            label: "Media count",
            suffix: ""
          },
          {
            value: convertToAbbreviation(user.instagramStats?.averageLikes),
            label: "Avg. Likes",
            suffix: ""
          },
          {
            value: convertToAbbreviation(user.instagramStats?.averageComments),
            label: "Avg. Comments",
            suffix: ""
          },
        ].map(({ value, label, suffix }) => (
          <div key={label}>
            <p className="text-2xl font-poppins font-medium text-center text-gray-700">
              {value === "-2" ? (
                <span 
                  className="blur-xs cursor-pointer"
                  onClick={() => toggleSubscribeModal()}
                  title="Subscribe to view this stat"
                >
                  XX
                </span>
              ) : (
                value + suffix
              )}
            </p>
            <p className="text-xs text-gray-500 text-center">{label}</p>
          </div>
        ))}
      </div>
    </AccountCard>
  );
}
