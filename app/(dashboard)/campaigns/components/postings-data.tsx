"use client";
import { format } from "@flasd/whatsapp-formatting";
import { Cake, SealCheck, Users, Wallet } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import type { GetAllPostingsQuery } from "@/__generated__/graphql";
import ApplyNowButton from "@/app/(dashboard)/campaigns/[id]/apply-now-button";
import NoResults from "@/app/(dashboard)/campaigns/components/no-results";
import { Button } from "@/components/button";
import Modal from "@/components/modal";
import { getRoute } from "@/constants/routes";
import { useAuthQuery } from "@/lib/apollo-client";
import { GET_ALL_POSTINGS } from "@/lib/queries";
import { cn, convertToAbbreviation } from "@/lib/utils";

import PostingReviews from "../[id]/posting-reviews";
import { getAgeGroup, getCurrency, getPlatforms } from "../utils";
import SearchLoading from "./search-loading";

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

export default function PostingsData({
  data,
  loading,
}: {
  data: GetAllPostingsQuery | null;
  loading: boolean;
}) {
  const [postings, setPostings] = useState(data?.postings || []);
  const [page, setPage] = useState(1);
  const [description, setDescription] = useState<string>();
  const [fetchPostings, { loading: fetchingMore }] =
    useAuthQuery(GET_ALL_POSTINGS);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target?.isIntersecting && !loading) {
          fetchPostings({
            page: page + 1,
          }).then(({ data }) => {
            if (data?.postings) {
              setPostings((prev) => [...prev, ...data.postings]);
            }
          });
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      observer.disconnect();
    };
  }, [loading, postings]);

  return (
    <ul
      aria-labelledby="products-heading"
      className="h-full snap-y snap-mandatory snap-always overflow-auto no-scrollbar"
    >
      {loading ? <SearchLoading /> : null}
      {postings.length === 0 && !loading && <NoResults />}
      {!loading &&
        postings.map((posting, i) => (
          <div
            id={posting.id.toString()}
            className={cn("h-full snap-start pt-3 pb-5")}
            key={posting.id}
            ref={i === postings.length - 2 ? observerTarget : undefined}
          >
            <div className="h-full overflow-hidden relative border-gray-200 bg-background px-4 lg:rounded-xl lg:border lg:p-8 lg:shadow-md">
              <div className="px-4 sm:px-0">
                <div className="flex items-start justify-between gap-3 max-lg:flex-wrap">
                  <div>
                    <h3 className="text-xl font-semibold leading-7 text-gray-800 sm:text-3xl line-clamp-2">
                      {posting.title}
                    </h3>
                    <Link
                      className="group mt-2 flex items-center gap-3"
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
                          <SealCheck className="text-primary" weight="fill" />
                        ) : null}
                      </p>
                    </Link>
                    <div
                      className={
                        "flex flex-wrap items-center gap-3 mt-3 text-sm"
                      }
                    >
                      <div>{getPlatforms(posting.platforms)}</div>
                      <span className={"text-[10px] text-gray-500"}>•</span>
                      <div className={"flex items-center gap-1"}>
                        <Wallet />
                        {getCurrency(
                          posting.barter,
                          posting.currency,
                          posting.price,
                        )}
                      </div>
                      {posting.minimumFollowers && (
                        <>
                          <span className={"text-[10px] text-gray-500"}>•</span>
                          <div className={"flex items-center gap-1"}>
                            <Users />
                            {convertToAbbreviation(posting.minimumFollowers)}+
                          </div>
                        </>
                      )}
                      {posting.minimumAge || posting.maximumAge ? (
                        <>
                          <span className={"text-[10px] text-gray-500"}>•</span>
                          <div className={"flex items-center gap-1"}>
                            <Cake />
                            {getAgeGroup(
                              posting.minimumAge,
                              posting.maximumAge,
                            )}
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
              </div>
              <PostingReviews reviews={posting.reviews} />
              <div>
                <dl className="grid grid-cols-1 sm:grid-cols-2">
                  {posting.deliverables ? (
                    <div className="px-4 pt-4 sm:col-span-2 sm:px-0 ">
                      <dt className=" font-semibold leading-6 text-gray-900">
                        Deliverables
                      </dt>
                      <dd className="mt-1 max-w-4xl text-sm leading-6 text-gray-600 sm:mt-2">
                        {posting.deliverables.join(", ")}
                      </dd>
                    </div>
                  ) : null}
                  <div className="px-4 pt-3 sm:col-span-2 sm:px-0 sm:pt-10">
                    <dt className="font-semibold leading-6 text-gray-900 flex justify-between">
                      About
                      <button
                        onClick={() => setDescription(posting.description)}
                        className="text-xs underline text-accent"
                      >
                        Read full description
                      </button>
                    </dt>
                    <dd
                      className="mt-1 max-w-4xl text-sm leading-6 text-gray-600 sm:mt-2 line-clamp-6"
                      dangerouslySetInnerHTML={{
                        __html: renderRichText(posting.description),
                      }}
                    />
                  </div>
                </dl>
              </div>

              <a
                className={"absolute bottom-0 right-5"}
                href={"#" + postings[i + 1]?.id}
              >
                <Button loading={i === postings.length - 1 && fetchingMore}>
                  Next
                </Button>
              </a>
            </div>
          </div>
        ))}
      <Modal close={() => setDescription(undefined)} open={!!description}>
        <dt className="font-bold mb-2 leading-6 text-lg text-gray-900 flex justify-between">
          About
        </dt>
        {description && (
          <dd
            className=" leading-6 text-gray-600"
            dangerouslySetInnerHTML={{
              __html: renderRichText(description),
            }}
          />
        )}
      </Modal>
    </ul>
  );
}
