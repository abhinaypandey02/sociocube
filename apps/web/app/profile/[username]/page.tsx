import React, { Suspense } from "react";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowSquareOut,
  InstagramLogo,
  SealCheck,
  Sparkle,
  TrendUp,
} from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";
import Image from "next/image";
import { cookies } from "next/headers";
import { IconButton } from "ui/icon-button";
import Link from "next/link";
import classNames from "classnames";
import { Injector, queryGQL } from "../../../lib/apollo-server";
import {
  GET_FEATURED_SELLERS_AND_POSTS,
  GET_PORTFOLIO_UPLOAD_URL,
  GET_SELLER,
} from "../../../lib/queries";
import { getSEO } from "../../../constants/seo";
import { convertToAbbreviation } from "../../../lib/utils";
import Schema from "../../components/schema";
import { getMeURL, getRoute, Route } from "../../../constants/routes";
import { getAgeGroup, getCurrency } from "../../campaigns/utils";
import CopyLinkButton from "./components/copy-link-button";
import OnboardingCompletedModal from "./components/onboarding-completed-modal";
import Portfolio from "./components/portfolio";
import PortfolioLinks from "./components/portfolio-links";
import { getPostFrequency } from "./components/utils";
import Review from "./components/review";

export interface ProfilePage {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ noCache?: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const { sellers } = await queryGQL(GET_FEATURED_SELLERS_AND_POSTS);
  return sellers.map(({ username }) => ({
    username,
  }));
}

export async function generateMetadata({
  params,
}: ProfilePage): Promise<Metadata> {
  const { username } = await params;
  const data = await queryGQL(
    GET_SELLER,
    {
      username,
    },
    undefined,
    60 * 6 * 165,
  );

  const seller = data.getSeller?.user || data.getSeller?.agency;
  if (!seller?.name) return {};
  return {
    alternates: {
      canonical: `${
        process.env.NEXT_PUBLIC_FRONTEND_BASE_URL + Route.Profile
      }/${username}`,
    },
    ...getSEO(
      seller.name,
      `${convertToAbbreviation(seller.instagramStats?.followers || 0)} Followers, ${getPostFrequency(seller.instagramMedia || [])} Frequency, ${convertToAbbreviation(seller.instagramStats?.mediaCount || 0)} posts on their Instagram account @${seller.instagramStats?.username}. Join for free now to connect with brands for collaboration opportunities.`,
    ),
  };
}

export default async function ProfilePage({
  params,
  searchParams,
}: ProfilePage) {
  const { username } = await params;
  const { noCache } = await searchParams;
  if (!username) return null;
  const { getSeller } = await queryGQL(
    GET_SELLER,
    {
      username,
    },
    undefined,
    noCache ? 0 : 60 * 6 * 165,
    [`profile-${username}`],
  );
  const user = getSeller?.user;
  const agency = getSeller?.agency;
  const seller = user || agency;
  if (!seller?.name || !seller.instagramStats) return notFound();
  return (
    <div className="mx-auto max-w-2xl px-6 pt-6 sm:mt-8 lg:grid lg:max-w-screen-2xl lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8 lg:px-8">
      <Suspense>
        <OnboardingCompletedModal url={getMeURL(username, true)} />
      </Suspense>
      <Schema
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            name: seller.name,
            alternateName: seller.instagramStats.username,
            identifier: seller.instagramStats.username,
            interactionStatistic: [
              {
                "@type": "InteractionCounter",
                interactionType: "https://schema.org/FollowAction",
                userInteractionCount: seller.instagramStats.followers,
              },
              {
                "@type": "InteractionCounter",
                interactionType: "https://schema.org/LikeAction",
                userInteractionCount: seller.instagramStats.averageLikes,
              },
            ],
            description: seller.bio,
            image: seller.photo,
            sameAs: [
              `${getRoute("Profile")}/${username}`,
              getMeURL(username),
              `https://instagram.com/${seller.instagramStats.username}`,
            ],
          },
        }}
        id="main-profile"
      />
      <div className="lg:col-span-8 ">
        <div className="flex justify-between gap-2 max-sm:flex-wrap">
          <h2 className="flex items-center gap-2 font-poppins text-xl font-semibold text-gray-900 sm:text-2xl">
            {seller.name}
          </h2>
          <div className="flex grow items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              {seller.instagramStats.isVerified ? (
                <SealCheck
                  className={classNames(user ? "text-accent" : "text-primary")}
                  size={23}
                  weight="fill"
                />
              ) : null}
              {agency ? (
                <span className="rounded-full bg-primary/95 px-2 py-1.5 text-xs font-medium leading-none text-white">
                  {seller.category}
                </span>
              ) : null}
            </div>
            <div className="flex items-center">
              <a
                href={`https://ig.me/m/${seller.instagramStats.username}`}
                rel="noopener"
                target="_blank"
              >
                <IconButton>
                  <InstagramLogo size={18} />
                </IconButton>
              </a>
              <CopyLinkButton url={getMeURL(username, true)} />
            </div>
          </div>
        </div>
        {user?.pricing?.starting ? (
          <p className="mb-3 mt-1 text-gray-900">
            <span className="mr-1 text-sm font-light italic">from</span>{" "}
            <span className=" ">
              {user.location?.currency?.symbol}
              {user.pricing.starting} {user.location?.currency?.code}
            </span>
          </p>
        ) : null}
        <div className="prose prose-sm mt-2 flex gap-2 text-gray-500">
          {!agency?.location ? (
            <>
              {seller.category}
              <span>•</span>
              {user?.gender}
            </>
          ) : (
            <a
              className="flex items-center gap-2 text-[15px]"
              href={`http://maps.google.com/?q=${agency.location.city || ""}+${agency.location.country}`}
              rel="noopener"
              target="_blank"
            >
              {agency.location.city ? `${agency.location.city}, ` : ""}
              {agency.location.country}{" "}
              <ArrowSquareOut
                className="inline-block"
                color="black"
                size={14}
              />
            </a>
          )}
        </div>

        {/* Reviews */}
      </div>
      {/* Image gallery */}
      <div className="mt-8 lg:col-span-4 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
        <h2 className="sr-only">Image</h2>

        {seller.photo ? (
          <>
            <Schema
              data={{
                "@context": "https://schema.org/",
                "@type": "ImageObject",
                contentUrl: seller.photo,
                creditText: seller.name,
                creator: {
                  "@type": "Person",
                  name: seller.name,
                },
                copyrightNotice: seller.name,
              }}
              id="profile-image"
            />
            <Image
              alt={seller.name}
              className="w-full rounded-lg lg:col-span-2 lg:row-span-2"
              height={1080}
              src={seller.photo}
              width={720}
            />
          </>
        ) : null}
        <div className="mt-7">
          <h2 className="text-sm font-medium text-gray-900">Reviews</h2>

          <div className="mt-5 space-y-4 ">
            {seller.reviews.map((review) => (
              <Review key={review.name} review={review} />
            ))}
            {seller.reviews.length === 0 ? (
              <div className="text-gray-500">
                <div className="flex items-center justify-center gap-1 text-sm">
                  No reviews yet.
                  <Sparkle size={20} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-6 lg:col-span-8">
        {/* Product details */}
        <div className="">
          <h2 className="text-sm font-medium text-gray-900">About</h2>

          <div className="prose prose-sm mt-2 text-gray-500">
            {seller.bio?.split("\n").map((line) => (
              <>
                {line}
                <br />
              </>
            ))}
          </div>
        </div>
        {user?.location ? (
          <div className="mt-5">
            <h2 className="text-sm font-medium text-gray-900">Location</h2>

            <div className="prose prose-sm mt-2 flex gap-3 text-gray-500">
              {user.location.city ? `${user.location.city}, ` : ""}
              {user.location.country}{" "}
              <a
                href={`http://maps.google.com/?q=${user.location.city || ""}+${user.location.country}`}
                rel="noopener"
                target="_blank"
              >
                <ArrowSquareOut color="black" size={20} />
              </a>
            </div>
          </div>
        ) : null}
        {agency?.recentPostings.length ? (
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-gray-900">
                Recent Campaigns
              </h2>
              <Link
                className={classNames(
                  "flex items-center gap-1 text-sm font-semibold",
                  user ? "text-accent" : "text-primary",
                )}
                href={`${getRoute("Postings")}?agency=${username}`}
              >
                See all <ArrowRight />
              </Link>
            </div>
            <ul className="mx-auto mt-4 max-w-6xl divide-y divide-gray-300 ">
              {agency.recentPostings.map((posting) => {
                const descriptions = [
                  posting.applicationsCount &&
                    `${posting.applicationsCount}+ applications`,
                  getAgeGroup(posting.minimumAge, posting.maximumAge) ||
                    undefined,
                  posting.minimumFollowers &&
                    `Min followers: ${convertToAbbreviation(posting.minimumFollowers)}`,
                ].filter(Boolean);
                return (
                  <li
                    className="relative  flex justify-between gap-x-6 py-3 transition-all duration-300 hover:scale-[1.02]"
                    key={posting.id}
                  >
                    <div className="flex items-center gap-3 sm:gap-2 ">
                      {posting.open ? (
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div className="size-1.5 rounded-full bg-emerald-500" />
                        </div>
                      ) : null}

                      <div>
                        <Link
                          className="text-sm leading-6 text-gray-600"
                          href={`${getRoute("Postings")}/${posting.id}`}
                        >
                          <span className="absolute inset-x-0 -top-px bottom-0" />
                          {posting.title}
                        </Link>
                        <p className="mt-1 items-center text-xs leading-5 text-gray-500 sm:line-clamp-1 sm:flex">
                          {descriptions.join(" • ")}{" "}
                          <p className="inline-block sm:hidden">
                            {descriptions.length ? " • " : ""}
                            {getCurrency(
                              posting.barter,
                              posting.currency,
                              posting.price,
                            )}
                          </p>
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-4">
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {getCurrency(
                            posting.barter,
                            posting.currency,
                            posting.price,
                          )}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
        <Injector
          Component={PortfolioLinks}
          fetch={async () =>
            queryGQL(GET_PORTFOLIO_UPLOAD_URL, undefined, await cookies(), 0)
          }
          props={{
            isAgency: !user,
            portfolio: seller.portfolio
              .filter((work) => !work.imageURL && work.caption && work.link)
              .toReversed(),
            id: seller.id,
            username,
          }}
        />
        <Injector
          Component={Portfolio}
          fetch={async () =>
            queryGQL(GET_PORTFOLIO_UPLOAD_URL, undefined, await cookies(), 0)
          }
          props={{
            isAgency: !user,
            portfolio: seller.portfolio
              .filter((work) => Boolean(work.imageURL))
              .toReversed(),
            id: seller.id,
            username,
          }}
        />

        <div className="mt-8">
          <div className="flex justify-between">
            <h2 className="text-sm font-medium text-gray-900">Instagram</h2>
            <a
              className={classNames(
                "text-sm font-medium",
                user ? "text-accent" : "text-primary",
              )}
              href={`https://instagram.com/${seller.instagramStats.username}`}
              rel="noopener"
              target="_blank"
            >
              @{seller.instagramStats.username}
            </a>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 ">
            <div className="text-center ">
              <div className=" text-3xl font-medium text-gray-900">
                {convertToAbbreviation(seller.instagramStats.followers)}
              </div>
              <span className="text-sm font-medium text-gray-900">
                Followers
              </span>
            </div>
            <div className="text-center ">
              <div className=" text-3xl font-medium text-gray-900">
                {convertToAbbreviation(seller.instagramStats.mediaCount)}
              </div>
              <span className="text-sm font-medium text-gray-900">Posts</span>
            </div>
            <div className="text-center ">
              <div className=" text-3xl font-medium text-gray-900">
                {getPostFrequency(seller.instagramMedia)}
              </div>
              <span className="text-sm font-medium text-gray-900">
                Frequency
              </span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 ">
            {seller.instagramMedia?.map((media, i) => (
              <a
                className="relative"
                href={media.link}
                key={media.thumbnail}
                rel="noopener"
                target="_blank"
              >
                <Schema
                  data={{
                    "@context": "https://schema.org/",
                    "@type": "ImageObject",
                    contentUrl: media.thumbnail,
                    creditText: seller.name,
                    creator: {
                      "@type": "Person",
                      name: seller.name,
                    },
                    copyrightNotice: seller.name,
                  }}
                  id={`post-image-${i}`}
                />
                <Image
                  alt={media.caption || `Post by ${seller.name}`}
                  className="size-full rounded-md object-cover"
                  height={500}
                  src={media.thumbnail}
                  width={500}
                />
                <small className="absolute bottom-0  w-full truncate rounded-b-md bg-[rgba(0,0,0,0.15)] p-2 text-center text-[10px] italic text-white backdrop-blur-sm">
                  {media.caption}
                </small>
                {media.er ? (
                  <div className="absolute left-0 top-0 flex items-center gap-2 p-2 text-center text-[10px] font-bold text-white backdrop-blur-sm">
                    <TrendUp />
                    {Math.max(media.er, 1.1)}%
                  </div>
                ) : null}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
