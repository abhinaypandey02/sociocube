"use client";
import { format } from "@flasd/whatsapp-formatting";
import { Cake, SealCheck, Users, Wallet } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import type { GetAllPostingsQuery } from "@/__generated__/graphql";
import ApplyNowButton from "@/app/(dashboard)/campaigns/[id]/apply-now-button";
import { Button } from "@/components/button";
import Modal from "@/components/modal";
import { getRoute } from "@/constants/routes";
import { convertToAbbreviation } from "@/lib/utils";

import { getAgeGroup, getCurrency, getPlatforms } from "../utils";

export function renderRichText(text: string) {
  const renderedText = format(text);
  const lines = renderedText.split("<br>");
  return lines
    .map((line) =>
      line
        .split(" ")
        .map((element) => {
          if (element.startsWith("http")) {
            return `<a
            class="text-accent underline"
            href="${element}"
            rel="noopener"
            target="_blank"
          >
            ${element}
          </a>`;
          }
          return element;
        })
        .join(" "),
    )
    .join("<br/>");
}

export default function PostingCard({
  posting,
  fetchMore,
  loading,
  gotoNext,
}: {
  posting: GetAllPostingsQuery["postings"][number];
  fetchMore?: () => void;
  loading: boolean;
  gotoNext?: () => void;
}) {
  const aboutRef = useRef<HTMLDivElement>(null);
  const [showDescription, setShowDescription] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fetchMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target?.isIntersecting) {
          fetchMore();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      },
    );

    const currentTarget = mainRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      observer.disconnect();
    };
  }, [fetchMore]);

  const price = getCurrency(posting.barter, posting.currency, posting.price);

  return (
    <>
      <div className="h-full snap-start pb-5">
        <div
          id={posting.id.toString()}
          key={posting.id}
          ref={mainRef}
          className="h-full snap-start pt-3 pb-5 flex flex-col overflow-hidden relative border-gray-200 bg-background lg:rounded-xl lg:border lg:p-8 lg:shadow-md"
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
                <div>{getPlatforms(posting.platforms)}</div>

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
                <ApplyNowButton posting={posting} />
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
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setShowDescription(true)}
              className="text-sm underline font-medium text-primary"
            >
              Read full description
            </button>

            <Button onClick={gotoNext} loading={loading}>
              Next
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
