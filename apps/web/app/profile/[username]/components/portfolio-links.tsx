import React from "react";
import { Button } from "ui/button";
import type {
  GetPortfolioUploadUrlQuery,
  GetSellerQuery,
} from "../../../../__generated__/graphql";
import AddPortfolioButton from "./add-portfolio-button";
import DeletePortfolioButton from "./delete-portfolio-button";

export default function PortfolioLinks({
  portfolio,
  username,
  data,
  id,
}: {
  data: GetPortfolioUploadUrlQuery | null;
  id: number;
  username: string;
  portfolio: NonNullable<GetSellerQuery["getSeller"]>["portfolio"];
}) {
  const isAuthor = id === data?.user?.id;
  if ((!portfolio || portfolio.length === 0) && !isAuthor) return null;
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">Links</h2>
        {portfolio && isAuthor && data.uploadURL && portfolio.length < 6 ? (
          <AddPortfolioButton
            imageUploadURL={data.uploadURL}
            isLink
            username={username}
          />
        ) : null}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 ">
        {portfolio?.map((work) => (
          <div className="relative" key={work.link}>
            <a
              className="block h-full"
              href={work.link || undefined}
              rel="noopener"
              target="_blank"
            >
              <Button className="flex size-full items-center">
                {work.caption}
              </Button>
            </a>
            {isAuthor ? (
              <DeletePortfolioButton isLink username={username} work={work} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
