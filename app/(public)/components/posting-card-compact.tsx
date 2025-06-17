import {
  ArrowRight,
  Cake,
  Users,
  Wallet,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { PostingPlatforms } from "@/__generated__/graphql";
import {
  getAgeGroup,
  getCurrency,
  getPlatforms,
} from "@/app/(dashboard)/campaigns/utils";
import { getRoute } from "@/constants/routes";
import { cn, convertToAbbreviation } from "@/lib/utils";

interface JobPostingCardProps {
  posting: {
    id: number;
    price?: number | null;
    platforms: Array<PostingPlatforms>;
    currency?: string | null;
    title: string;
    open: boolean;
    minimumAge?: number | null;
    maximumAge?: number | null;
    barter: boolean;
    applicationsCount: number;
    minimumFollowers?: number | null;
    externalLink?: string | null;
    description: string;
    deliverables?: Array<string> | null;
    agency: {
      photo?: string | null;
      name?: string | null;
    };
  };
  index: number;
  maxVisibleOnMobile?: number;
}

export default function JobPostingCard({
  posting,
  index = 0,
  maxVisibleOnMobile = 5,
}: JobPostingCardProps) {
  return (
    <Link
      href={`${getRoute("Campaigns")}/${posting.id}`}
      key={posting.id}
      className={cn(
        "block hover:scale-[1.02] duration-500 transition-transform shadow-md rounded-xl p-5 gap-3 border border-gray-200 " +
          (index >= maxVisibleOnMobile ? "max-lg:hidden" : ""),
      )}
    >
      <div className={"flex justify-between items-center w-full"}>
        <div className={"flex items-center gap-2 "}>
          {posting.agency.photo && (
            <Image
              alt={posting.agency.name || ""}
              className="size-8 rounded-full object-cover"
              height={28}
              src={posting.agency.photo}
              width={28}
            />
          )}
          <h3 className="text-lg font-medium leading-7 font-poppins text-gray-800 line-clamp-1">
            {posting.title}
          </h3>
        </div>
        <ArrowRight className={"shrink-0"} size={16} />
      </div>

      <div
        className={
          "flex flex-wrap items-center gap-3 mt-3 text-sm sm:text-base"
        }
      >
        <div className="flex items-center gap-1">
          {getPlatforms(posting.platforms)}
        </div>

        {posting.price || posting.barter ? (
          <>
            <span className={"text-[10px] text-gray-500"}>•</span>
            <div className={"flex items-center gap-1"}>
              <Wallet />
              {getCurrency(posting.barter, posting.currency, posting.price)}
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

        {posting.applicationsCount ? (
          <div className="flex items-center gap-1">
            {posting.open ? (
              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className="size-1 rounded-full bg-emerald-500" />
              </div>
            ) : null}
            <p className="text-xs text-gray-500">
              {posting.applicationsCount}+ applications
            </p>
          </div>
        ) : null}
      </div>
    </Link>
  );
}
