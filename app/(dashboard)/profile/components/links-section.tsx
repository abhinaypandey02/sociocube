import React from "react";

import { GetAccountPortfolioDetailsQuery } from "@/__generated__/graphql";
import { Button } from "@/components/button";
import { Variants } from "@/components/constants";
import LinkWrapper from "@/components/link-wrapper";

import AccountCard from "./account-card";
export default function LinksSection({
  data,
}: {
  data?: GetAccountPortfolioDetailsQuery;
}) {
  const user = data?.user;
  if (!user) return null;
  return (
    <AccountCard title="Links" subtitle="Your social links">
      <div className="space-y-2">
        {user.portfolio?.map(
          (item) =>
            !item.imageURL &&
            item.caption && (
              <LinkWrapper className="block" href={item.link} key={item.id}>
                <Button variant={Variants.ACCENT} className="w-full">
                  {item.caption}
                </Button>
              </LinkWrapper>
            ),
        )}
      </div>
    </AccountCard>
  );
}
