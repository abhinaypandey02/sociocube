import {
  ArrowSquareOut,
  InstagramLogo,
  SealCheck,
  TrendUp,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

import { Roles } from "@/__generated__/graphql";
import Schema from "@/app/(public)/components/schema";
import { IconButton } from "@/components/icon-button";
import { getMeURL, getRoute, Route } from "@/constants/routes";
import { getSEO } from "@/constants/seo";
import { queryGQL } from "@/lib/apollo-server";
import { GET_SELLER } from "@/lib/queries";
import { convertToAbbreviation } from "@/lib/utils";

import CopyLinkButton from "./components/copy-link-button";
import OnboardingCompletedModal from "./components/onboarding-completed-modal";
import Portfolio from "./components/portfolio";
import PortfolioLinks from "./components/portfolio-links";
import Review from "./components/review";
import { getPostFrequency } from "./components/utils";

export interface ProfilePage {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ noCache?: string }>;
}

export async function generateMetadata({
  params,
}: ProfilePage): Promise<Metadata> {
  const { username } = await params;
  const { getSeller: user } = await queryGQL(
    GET_SELLER,
    {
      username,
    },
    undefined,
    60 * 6 * 165,
  );

  if (!user?.name) return {};
  return {
    alternates: {
      canonical: `${
        process.env.NEXT_PUBLIC_BASE_URL + Route.Profile
      }/${username}`,
    },
    ...getSEO(
      user.name,
      `${convertToAbbreviation(user.instagramStats?.followers || 0)} Followers, ${getPostFrequency(user.instagramMedia || [])} Frequency, ${convertToAbbreviation(user.instagramStats?.mediaCount || 0)} posts on their Instagram account @${user.instagramStats?.username}. Join for free now to connect with brands for collaboration opportunities.`,
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
  const { getSeller: user } = await queryGQL(
    GET_SELLER,
    {
      username,
    },
    undefined,
    noCache ? 0 : 60 * 60 * 40,
    [`profile-${username}`],
  );
  if (!user?.name) return notFound();
  return (
    <div className="mx-auto max-w-2xl px-6 lg:grid lg:max-w-(--breakpoint-lg) lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8 lg:px-8">
      <Suspense>
        <OnboardingCompletedModal url={getMeURL(username, true)} />
      </Suspense>
      <Schema
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          mainEntity: {
            "@type": "Person",
            name: user.name,
            alternateName: username,
            identifier: username,
            interactionStatistic: [
              {
                "@type": "InteractionCounter",
                interactionType: "https://schema.org/FollowAction",
                userInteractionCount: user.instagramStats?.followers || 0,
              },
              {
                "@type": "InteractionCounter",
                interactionType: "https://schema.org/LikeAction",
                userInteractionCount: user.instagramStats?.averageLikes || 0,
              },
            ],
            description: user.bio,
            image: user.photo,
            sameAs: [
              `${getRoute("Profile")}/${username}`,
              getMeURL(username),
              ...(user.instagramStats
                ? [`https://instagram.com/${user.instagramStats.username}`]
                : []),
            ],
          },
        }}
        id="main-profile"
      />
      <div className="lg:col-span-8 ">
        <div className="flex justify-between gap-2 max-sm:flex-wrap">
          <h2 className="flex items-center gap-2 font-poppins text-xl font-semibold text-gray-900 sm:text-2xl">
            {user.name}
          </h2>
          <div className="flex grow items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              {user.instagramStats?.isVerified ? (
                <SealCheck
                  className={
                    user.role === Roles.Creator ? "text-primary" : "text-accent"
                  }
                  size={23}
                  weight="fill"
                />
              ) : null}
            </div>
            <div className="flex items-center">
              {user.instagramStats && (
                <a
                  href={`https://ig.me/m/${user.instagramStats.username}`}
                  rel="noopener"
                  target="_blank"
                >
                  <IconButton>
                    <InstagramLogo size={18} />
                  </IconButton>
                </a>
              )}
              <CopyLinkButton url={getMeURL(username, true)} />
            </div>
          </div>
        </div>
        {user.pricing?.starting ? (
          <p className="mb-3 mt-1 text-gray-900">
            <span className="mr-1 text-sm font-light italic">from</span>{" "}
            <span className=" ">
              {user.location?.currency}
              {user.pricing.starting}
            </span>
          </p>
        ) : null}

        {/* Reviews */}
      </div>
      {/* Image gallery */}
      <div className="mt-8 lg:col-span-4 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
        <h2 className="sr-only">Image</h2>

        {user.photo ? (
          <>
            <Schema
              data={{
                "@context": "https://schema.org/",
                "@type": "ImageObject",
                contentUrl: user.photo,
                creditText: user.name,
                creator: {
                  "@type": "Person",
                  name: user.name,
                },
                copyrightNotice: user.name,
              }}
              id="profile-image"
            />
            <Image
              alt={user.name}
              className="w-full rounded-lg lg:col-span-2 lg:row-span-2"
              height={1080}
              src={user.photo}
              width={720}
            />
          </>
        ) : null}
        {user.reviews.length > 0 && (
          <div className="mt-7">
            <h2 className="text-sm font-medium text-gray-900">Reviews</h2>

            <div className="mt-5 space-y-4 ">
              {user.reviews.map((review) => (
                <Review key={review.username} review={review} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 lg:col-span-8">
        {/* Product details */}
        <div className="">
          <h2 className="text-sm font-medium text-gray-900">About</h2>

          <div className="prose prose-sm mt-2 text-gray-500">
            {user.bio?.split("\n").map((line) => (
              <>
                {line}
                <br />
              </>
            ))}
          </div>
        </div>
        {user.location ? (
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
        <PortfolioLinks portfolio={user.portfolio} isAgency={!user} />
        <Portfolio portfolio={user.portfolio} />

        {user.instagramStats && (
          <div className="mt-8">
            <div className="flex justify-between">
              <h2 className="text-sm font-medium text-gray-900">Instagram</h2>
              <a
                className="text-sm font-medium text-accent"
                href={`https://instagram.com/${user.instagramStats.username}`}
                rel="noopener"
                target="_blank"
              >
                @{user.instagramStats.username}
              </a>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 ">
              <div className="text-center ">
                <div className=" text-xl font-medium text-gray-900 sm:text-3xl">
                  {convertToAbbreviation(user.instagramStats.followers)}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Followers
                </span>
              </div>
              <div className="text-center ">
                <div className=" text-xl font-medium text-gray-900 sm:text-3xl">
                  {convertToAbbreviation(user.instagramStats.mediaCount)}
                </div>
                <span className="text-sm font-medium text-gray-900">Posts</span>
              </div>
              <div className="text-center ">
                <div className="text-xl font-medium text-gray-900 sm:text-3xl">
                  {getPostFrequency(user.instagramMedia)}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Frequency
                </span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 ">
              {user.instagramMedia?.map((media, i) => (
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
                      creditText: user.name,
                      creator: {
                        "@type": "Person",
                        name: user.name,
                      },
                      copyrightNotice: user.name,
                    }}
                    id={`post-image-${i}`}
                  />
                  <img
                    alt={media.caption || `Post by ${user.name}`}
                    className="size-full rounded-md object-cover"
                    height={500}
                    src={media.thumbnail}
                    width={500}
                  />
                  <small className="absolute bottom-0  w-full truncate rounded-b-md bg-[rgba(0,0,0,0.15)] p-2 text-center text-[10px] italic text-white backdrop-blur-xs">
                    {media.caption}
                  </small>
                  {media.er ? (
                    <div className="absolute left-0 top-0 flex items-center gap-2 p-2 text-center text-[10px] font-semibold text-white backdrop-blur-xs">
                      <TrendUp />
                      {Math.max(media.er, 1.1)}%
                    </div>
                  ) : null}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
