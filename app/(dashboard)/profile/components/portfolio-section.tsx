import Image from "next/image";
import React from "react";

import { GetAccountPortfolioDetailsQuery } from "@/__generated__/graphql";
import LinkWrapper from "@/components/link-wrapper";

import AccountCard from "./account-card";
export default function PortfolioSection({
  data,
}: {
  data?: GetAccountPortfolioDetailsQuery;
}) {
  const user = data?.user;
  if (!user) return null;
  return (
    <AccountCard title="Portfolio" subtitle="Your past works">
      <div className="grid grid-cols-4 gap-y-5 gap-x-3 lg:grid-cols-6">
        {user.portfolio?.map(
          (item) =>
            item.imageURL && (
              <LinkWrapper href={item.link} key={item.id}>
                <Image
                  height={100}
                  width={50}
                  className="w-full h-full object-cover rounded-md"
                  src={item.imageURL}
                  alt={item.caption || ""}
                />
              </LinkWrapper>
            ),
        )}
      </div>
    </AccountCard>
  );
}
