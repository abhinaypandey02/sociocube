import React, { Suspense } from "react";
import type { Metadata } from "next";
import {
  ArrowSquareOut,
  InstagramLogo,
  TrendUp,
  SealCheck,
} from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";
import Image from "next/image";
import { cookies } from "next/headers";
import { IconButton } from "ui/icon-button";
import { Injector, queryGQL } from "../../../lib/apollo-server";
import {
  GET_SELLER,
  GET_FEATURED_SELLERS_AND_POSTS,
  GET_PORTFOLIO_UPLOAD_URL,
} from "../../../lib/queries";
import { getSEO } from "../../../constants/seo";
import { convertToAbbreviation } from "../../../lib/utils";
import Schema from "../../components/schema";
import { getMeURL, getRoute, Route } from "../../../constants/routes";
import CopyLinkButton from "./components/copy-link-button";
import OnboardingCompletedModal from "./components/onboarding-completed-modal";
import Portfolio from "./components/portfolio";
import PortfolioLinks from "./components/portfolio-links";

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
    60,
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
      `${convertToAbbreviation(seller.instagramStats?.followers || 0)} Followers, ${seller.instagramStats?.er}% Engagement, ${convertToAbbreviation(seller.instagramStats?.mediaCount || 0)} posts on their Instagram account @${seller.instagramStats?.username}. Join for free now to connect with brands for collaboration opportunities.`,
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
  const data = await queryGQL(
    GET_SELLER,
    {
      username,
    },
    undefined,
    noCache ? 0 : 60,
    [`profile-${username}`],
  );
  const seller = data.getSeller?.user || data.getSeller?.agency;
  const user = data.getSeller?.user;
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
      <div className="lg:col-span-6 lg:col-start-7">
        <div className="flex justify-between">
          <h2 className="flex items-center gap-2 font-poppins text-2xl font-semibold text-gray-900">
            {seller.name}{" "}
            {seller.instagramStats.isVerified ? (
              <SealCheck className="text-accent" weight="fill" />
            ) : null}
          </h2>
          <div className="flex ">
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
        {user?.pricing?.starting ? (
          <p className="mb-3 mt-1 text-gray-900">
            <span className="mr-1 text-sm font-light italic">from</span>{" "}
            <span className=" ">
              {user.location?.currency?.symbol}
              {user.pricing.starting} {user.location?.currency?.code}
            </span>
          </p>
        ) : null}
        <div className="prose prose-sm mt-2 text-gray-500">
          {user ? `${user.gender} • ` : ""}
          {seller.category}
        </div>

        {/* Reviews */}
      </div>
      {/* Image gallery */}
      <div className="mt-8 lg:col-span-6 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
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
      </div>

      <div className="mt-6 lg:col-span-6">
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
        {seller.location ? (
          <div className="mt-5">
            <h2 className="text-sm font-medium text-gray-900">Location</h2>

            <div className="prose prose-sm mt-2 flex gap-3 text-gray-500">
              {seller.location.city ? `${seller.location.city}, ` : ""}
              {seller.location.country}{" "}
              <a
                href={`http://maps.google.com/?q=${seller.location.city || ""}+${seller.location.country}`}
                rel="noopener"
                target="_blank"
              >
                <ArrowSquareOut color="black" size={20} />
              </a>
            </div>
          </div>
        ) : null}
        <Injector
          Component={PortfolioLinks}
          fetch={async () =>
            queryGQL(GET_PORTFOLIO_UPLOAD_URL, undefined, await cookies(), 0)
          }
          props={{
            isAgencyAuthor: !user,
            portfolio: seller.portfolio
              ?.filter((work) => !work.imageURL && work.caption && work.link)
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
            isAgencyAuthor: !user,
            portfolio: seller.portfolio
              ?.filter((work) => Boolean(work.imageURL))
              .toReversed(),
            id: seller.id,
            username,
          }}
        />
        <div className="mt-8">
          <div className="flex justify-between">
            <h2 className="text-sm font-medium text-gray-900">Instagram</h2>
            <a
              className="link-accent text-sm font-medium text-gray-900"
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
            {seller.instagramStats.er ? (
              <div className="text-center ">
                <div className=" text-3xl font-medium text-gray-900">
                  {seller.instagramStats.er}%
                </div>
                <span className="text-sm font-medium text-gray-900">
                  Engagement
                </span>
              </div>
            ) : null}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 ">
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
                    {media.er}%
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
