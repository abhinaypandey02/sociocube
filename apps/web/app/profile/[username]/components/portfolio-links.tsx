import React from "react";
import { Button, Variants } from "ui/button";
import type {
  GetPortfolioUploadUrlQuery,
  GetSellerQuery,
} from "../../../../__generated__/graphql";
import AddPortfolioButton from "./add-portfolio-button";
import DeletePortfolioButton from "./delete-portfolio-button";

export default function PortfolioLinks({
  portfolio,
  username,
  isAgency,
  data,
  id,
}: {
  data: GetPortfolioUploadUrlQuery | null;
  id: number;
  username: string;
  isAgency: boolean;
  portfolio: NonNullable<
    NonNullable<GetSellerQuery["getSeller"]>["user"]
  >["portfolio"];
}) {
  const isAgencyAuthor = data?.user?.agencies.some(
    ({ agency }) => agency === id,
  );
  const isAuthor = data && (id === data.user?.id || isAgencyAuthor);
  if ((!portfolio || portfolio.length === 0) && !isAuthor) return null;
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">Links</h2>
        {portfolio && isAuthor && data.uploadURL && portfolio.length < 6 ? (
          <AddPortfolioButton
            id={id}
            imageUploadURL={data.uploadURL}
            isAgency={isAgency}
            isAgencyAuthor={isAgencyAuthor}
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
              <Button
                className="flex size-full items-center"
                outline={isAgency}
                variant={isAgency ? Variants.PRIMARY : Variants.ACCENT}
              >
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
