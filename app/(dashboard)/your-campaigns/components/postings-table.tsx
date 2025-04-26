"use client";
import {
  ArrowRight,
  Cake,
  SmileyXEyes,
  Users,
  Wallet,
} from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

import type { GetUserPostingsQuery } from "@/__generated__/graphql";
import {
  getAgeGroup,
  getCurrency,
  getPlatforms,
} from "@/app/(dashboard)/campaigns/utils";
import { useSetSubPage } from "@/app/(dashboard)/utils";
import { Button } from "@/components/button";
import { Variants } from "@/components/constants";
import LinkWrapper from "@/components/link-wrapper";
import LoaderSkeleton from "@/components/loader-skeleton";
import { getRoute, Route } from "@/constants/routes";
import { useToken } from "@/lib/auth-client";
import { convertToAbbreviation } from "@/lib/utils";

import AccountCard from "../../profile/components/account-card";

export default function PostingsTable({
  data,
  loading,
}: {
  data?: GetUserPostingsQuery;
  loading?: boolean;
}) {
  const setSubPage = useSetSubPage();
  const token = useToken();
  const postings = data?.postings;
  if (loading) return <LoaderSkeleton />;
  if (!postings || postings.length === 0)
    return (
      <LoaderSkeleton
        title={"You haven't created any campaigns"}
        subtitle={
          <LinkWrapper href={!token ? getRoute("SignUp") : undefined}>
            <Button
              variant={Variants.DARK}
              onClick={() => {
                if (token) setSubPage(Route.NewCampaign);
              }}
              className={"items-center gap-1"}
            >
              Start your first campaign <ArrowRight />
            </Button>
          </LinkWrapper>
        }
        Icon={SmileyXEyes}
      />
    );
  return (
    <div className="space-y-4">
      {postings.map((posting) => {
        const price = getCurrency(
          posting.barter,
          posting.currency,
          posting.price,
        );
        return (
          <Link
            key={posting.id}
            className="-translate-y-1.5 translate-x-1.5 hover:scale-105 transition-all duration-300"
            href={`${Route.YourCampaigns}/${posting.id}`}
          >
            <AccountCard>
              <div className="flex justify-between items-center">
                <h2>{posting.title}</h2>
                <ArrowRight size={18} />
              </div>
              <div
                className={
                  "flex flex-wrap items-center gap-3 mt-3 sm:mt-4 text-sm sm:text-base"
                }
              >
                <div>{getPlatforms(posting.platforms)}</div>

                {price ? (
                  <>
                    <span className={"text-[10px] text-gray-500"}>•</span>
                    <div className={"flex items-center gap-1"}>
                      <Wallet />
                      {price}
                    </div>
                  </>
                ) : null}
                {posting.minimumFollowers ? (
                  <>
                    <span className={"text-[10px] text-gray-500"}>•</span>
                    <div className={"flex items-center gap-1"}>
                      <Users />
                      {convertToAbbreviation(posting.minimumFollowers)}+
                    </div>
                  </>
                ) : null}
                {posting.minimumAge || posting.maximumAge ? (
                  <>
                    <span className={"text-[10px] text-gray-500"}>•</span>
                    <div className={"flex items-center gap-1"}>
                      <Cake />
                      {getAgeGroup(posting.minimumAge, posting.maximumAge)}
                    </div>
                  </>
                ) : null}
              </div>
            </AccountCard>
          </Link>
        );
      })}
    </div>
  );
}
