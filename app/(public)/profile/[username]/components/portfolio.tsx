import React from "react";

import type { GetSellerQuery } from "@/__generated__/graphql";

export default function Portfolio({
  portfolio,
}: {
  portfolio: NonNullable<NonNullable<GetSellerQuery["getSeller"]>>["portfolio"];
}) {
  if (portfolio.length === 0) return null;
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">Portfolio</h2>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 ">
        {portfolio.map(
          (work) =>
            work.imageURL && (
              <div className="relative" key={work.link}>
                <a href={work.link || undefined} rel="noopener" target="_blank">
                  <img
                    alt={work.caption || "portfolio"}
                    className="size-full rounded-md object-cover"
                    height={500}
                    src={work.imageURL}
                    width={500}
                  />
                </a>
                {work.caption ? (
                  <small className="absolute bottom-0 w-full rounded-b-md bg-[rgba(0,0,0,0.15)] text-center text-[10px] italic text-white backdrop-blur-xs">
                    <div className="my-2 line-clamp-2 px-2">{work.caption}</div>
                  </small>
                ) : null}
              </div>
            ),
        )}
      </div>
    </div>
  );
}
