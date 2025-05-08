import React from "react";

import type { GetSellerQuery } from "@/__generated__/graphql";
import { Button } from "@/components/button";
import { Variants } from "@/components/constants";

export default function PortfolioLinks({
  portfolio,
  isAgency,
}: {
  portfolio: NonNullable<NonNullable<GetSellerQuery["getSeller"]>>["portfolio"];
  isAgency: boolean;
}) {
  if (portfolio.length === 0) return null;
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">Links</h2>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 ">
        {portfolio.map(
          (work) =>
            !work.imageURL && (
              <div className="relative" key={work.link}>
                <a
                  className="block h-full"
                  href={work.link || undefined}
                  rel="noopener"
                  target="_blank"
                >
                  <Button
                    className="flex size-full items-center font-poppins"
                    invert={isAgency}
                    variant={isAgency ? Variants.PRIMARY : Variants.ACCENT}
                  >
                    {work.caption}
                  </Button>
                </a>
              </div>
            ),
        )}
      </div>
    </div>
  );
}
