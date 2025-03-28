import React from "react";
import Image from "next/image";
import { MAX_CAMPAIGNS } from "commons/constraints";
import type {
  GetPortfolioUploadUrlQuery,
  GetSellerQuery,
} from "../../../../__generated__/graphql";
import AddPortfolioButton from "./add-portfolio-button";
import DeletePortfolioButton from "./delete-portfolio-button";

export default function Portfolio({
  portfolio,
  username,
  isAgency,
  data,
  id,
}: {
  data: GetPortfolioUploadUrlQuery | null;
  id: number;
  isAgency: boolean;
  username: string;
  portfolio: NonNullable<NonNullable<GetSellerQuery["getSeller"]>>["portfolio"];
}) {
  const isAuthor = data && id === data.user?.id;
  if (portfolio.length === 0 && !isAuthor) return null;
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">Portfolio</h2>
        {isAuthor && data.uploadURL && portfolio.length < MAX_CAMPAIGNS ? (
          <AddPortfolioButton
            imageUploadURL={data.uploadURL}
            isAgency={isAgency}
            isLink={false}
            username={username}
          />
        ) : null}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 ">
        {portfolio.map(
          (work) =>
            work.imageURL && (
              <div className="relative" key={work.link}>
                <a href={work.link || undefined} rel="noopener" target="_blank">
                  <Image
                    alt={work.caption || "portfolio"}
                    className="size-full rounded-md object-cover"
                    height={500}
                    src={work.imageURL}
                    width={500}
                  />
                </a>
                {work.caption ? (
                  <small className="absolute bottom-0 w-full rounded-b-md bg-[rgba(0,0,0,0.15)] text-center text-[10px] italic text-white backdrop-blur-sm">
                    <div className="my-2 line-clamp-2 px-2">{work.caption}</div>
                  </small>
                ) : null}
                {isAuthor ? (
                  <DeletePortfolioButton
                    isLink={false}
                    username={username}
                    work={work}
                  />
                ) : null}
              </div>
            ),
        )}
      </div>
    </div>
  );
}
