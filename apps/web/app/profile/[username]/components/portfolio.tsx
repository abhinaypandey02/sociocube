import React from "react";
import Image from "next/image";
import type {
  GetPortfolioUploadUrlQuery,
  GetSellerQuery,
} from "../../../../__generated__/graphql";
import AddPortfolioButton from "./add-portfolio-button";
import DeletePortfolioButton from "./delete-portfolio-button";

export default function Portfolio({
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
        <h2 className="text-sm font-medium text-gray-900">Portfolio</h2>
        {portfolio && isAuthor && data.uploadURL && portfolio.length < 6 ? (
          <AddPortfolioButton
            imageUploadURL={data.uploadURL}
            username={username}
          />
        ) : null}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 ">
        {portfolio?.map((work) => (
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
            <small className="absolute bottom-0     w-full rounded-b-md bg-[rgba(0,0,0,0.15)] text-center text-[10px] italic text-white backdrop-blur-sm">
              <div className="my-2 line-clamp-2 px-2">{work.caption}</div>
            </small>
            {isAuthor ? (
              <DeletePortfolioButton username={username} work={work} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
