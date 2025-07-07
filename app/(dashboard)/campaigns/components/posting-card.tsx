import { ArrowDown, User } from "@phosphor-icons/react";
import { Cake, SealCheck, Users, Wallet } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

import type { GetAllPostingsQuery } from "@/__generated__/graphql";
import ApplyNowButton from "@/app/(dashboard)/campaigns/[id]/apply-now-button";
import { Button } from "@/components/button";
import Modal from "@/components/modal";
import countriesData from "@/constants/countries";
import { getRoute } from "@/constants/routes";
import { useVisibility } from "@/lib/hooks";
import { convertToAbbreviation } from "@/lib/utils";

import { renderRichText } from "../utils";
import { getAgeGroup, getCurrency, getPlatforms } from "../utils";

export default function PostingCard({
  posting,
  fetchMore,
  loading,
  gotoNext,
  onReject,
}: {
  posting: GetAllPostingsQuery["postings"][number];
  fetchMore?: () => void;
  loading: boolean;
  gotoNext?: () => void;
  onReject?: () => void;
}) {
  const aboutRef = useRef<HTMLDivElement>(null);
  const [showDescription, setShowDescription] = useState(false);
  const mainRef = useVisibility(fetchMore);
  const locationNames = [
    ...countriesData
      .filter((c) => posting.countries?.includes(c.value))
      .map((country) => country.label),
    ...(posting.states || []).map((state) => state.label),
    ...(posting.cities || []).map((city) => city.label),
  ];

  const price = getCurrency(posting.barter, posting.currency, posting.price);

  return (
    <>
      <div className="h-full snap-start pb-3">
        <div
          id={posting.id.toString()}
          key={posting.id}
          ref={mainRef}
          className="h-full snap-start pt-2 flex flex-col overflow-hidden relative border-gray-200 bg-background lg:rounded-xl lg:border lg:p-8 lg:shadow-md"
        >
          <div className="flex items-start justify-between gap-3 max-lg:flex-wrap">
            <div>
              <h3 className="text-xl font-semibold leading-7 text-gray-800 sm:text-2xl line-clamp-2">
                {posting.title}
              </h3>
              <Link
                prefetch={false}
                className="group mt-2 sm:mt-4 flex items-center gap-3"
                href={`${getRoute("Profile")}/${posting.agency.username}`}
              >
                {posting.agency.photo ? (
                  <Image
                    alt={posting.agency.name || ""}
                    className="size-7 rounded-full object-cover"
                    height={28}
                    src={posting.agency.photo}
                    width={28}
                  />
                ) : null}
                <p className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600 underline-offset-2 group-hover:underline sm:text-base">
                    {posting.agency.name}
                  </span>
                  {posting.agency.instagramStats?.isVerified ? (
                    <SealCheck className="text-accent" weight="fill" />
                  ) : null}
                </p>
              </Link>
              <div
                className={
                  "flex flex-wrap items-center gap-3 mt-3 sm:mt-4 text-sm sm:text-base"
                }
              >
                <div className="flex items-center gap-1">
                  {getPlatforms(posting.platform)}
                </div>

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
                {posting.gender ? (
                  <>
                    <span className={"text-[10px] text-gray-500"}>•</span>
                    <div className={"flex items-center gap-1"}>
                      <User />
                      {posting.gender}
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
            </div>
            <div className="flex shrink-0 flex-col gap-3 max-sm:w-full max-sm:gap-3">
              <div className="flex items-center lg:flex-row-reverse lg:gap-4">
                {!onReject && <ApplyNowButton posting={posting} />}
              </div>
              {posting.applicationsCount ? (
                <div className="flex items-center gap-2 sm:justify-end">
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
          </div>
          {locationNames.length > 0 ? (
            <div className="pt-5 sm:col-span-2 ">
              <dt className=" font-semibold underline underline-offset-4 leading-6 text-gray-900">
                Location
              </dt>
              <dd className="text-sm mt-2 leading-6 text-gray-600 ">
                {locationNames.join(", ")}
              </dd>
            </div>
          ) : null}
          {posting.deliverables ? (
            <div className="pt-5 sm:col-span-2 ">
              <dt className=" font-semibold underline underline-offset-4 leading-6 text-gray-900">
                Deliverables
              </dt>
              <dd className="text-sm mt-2 leading-6 text-gray-600 ">
                {posting.deliverables.join(", ")}
              </dd>
            </div>
          ) : null}
          <div className="pt-3 sm:col-span-2 grow min-h-0 flex flex-col">
            <dt className="font-semibold underline underline-offset-4 leading-6 text-gray-900">
              Description
            </dt>
            <dd
              ref={aboutRef}
              className="text-sm leading-6 mt-2 text-gray-600  min-h-0 overflow-hidden"
              dangerouslySetInnerHTML={{
                __html: renderRichText(posting.description),
              }}
            />
          </div>
          <div className="flex justify-between items-start pt-2">
            {onReject && (
              <Button invert onClick={onReject} loading={loading}>
                Reject
              </Button>
            )}
            <button
              onClick={() => setShowDescription(true)}
              className="text-sm underline text-primary"
            >
              Read full description
            </button>

            <Button onClick={gotoNext} loading={loading}>
              Next Campaign&nbsp;
              <ArrowDown />
            </Button>
          </div>
        </div>
      </div>

      <Modal close={() => setShowDescription(false)} open={showDescription}>
        <dd
          className=" leading-6 text-gray-600"
          dangerouslySetInnerHTML={{
            __html: renderRichText(posting.description),
          }}
        />
      </Modal>
    </>
  );
}
