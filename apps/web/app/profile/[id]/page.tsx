import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { Button, Variants } from "ui/button";
import { Heart, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { getAge } from "commons/age";
import { notFound } from "next/navigation";
import { queryGQL } from "../../../lib/apollo-server";
import { GET_SELLER } from "../../../lib/queries";
import { getSEO } from "../../../constants/seo";

interface ProfilePage {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProfilePage): Promise<Metadata> {
  const id = parseInt((await params).id);
  if (isNaN(id)) return {};
  const data = await queryGQL(
    GET_SELLER,
    {
      id,
    },
    undefined,
    60,
  );

  const seller = data.getSeller;
  if (!seller?.name) return {};
  return getSEO(
    `${data.getSeller?.name} | Seller at Freeluencers`,
    `${data.getSeller?.name} is a freelancing influencer at Freeluencers. His instagram account, @${data.getSeller?.instagramStats?.username}, has ${data.getSeller?.instagramStats?.followers} followers. Here's what he has to say: ${data.getSeller?.bio}`,
    [
      data.getSeller?.photo || "",
      ...(data.getSeller?.instagramMedia?.map((media) => media.thumbnail) ||
        []),
    ].filter(Boolean),
  );
}
export default async function ProfilePage({ params }: ProfilePage) {
  const id = parseInt((await params).id);
  if (isNaN(id)) return null;
  const data = await queryGQL(
    GET_SELLER,
    {
      id,
    },
    undefined,
    60,
  );
  const seller = data.getSeller;
  if (!seller?.name || !seller.photo || !seller.instagramStats)
    return notFound();
  const age = getAge(new Date(seller.dob || Date.now()));
  return (
    <div className="mx-auto max-w-2xl px-4 pt-6 sm:mt-8 sm:px-6 lg:grid lg:max-w-screen-2xl lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8 lg:px-8">
      <div className="lg:col-span-6 lg:col-start-7">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            {seller.name}
          </h1>
          <p className="text-lg  text-gray-900">
            From ₹{seller.pricing?.starting}
          </p>
        </div>
        <div className="prose prose-sm mt-3 text-gray-500">
          {age} yrs • {seller.gender} • {seller.category}
        </div>

        {/* Reviews */}
      </div>
      {/* Image gallery */}
      <div className="mt-8 lg:col-span-6 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
        <h2 className="sr-only">Images</h2>

        <Image
          alt={seller.name}
          className="w-full rounded-lg lg:col-span-2 lg:row-span-2"
          height={1080}
          src={seller.photo}
          width={720}
        />
      </div>

      <div className="mt-6 lg:col-span-6">
        {/* Product details */}
        <div className="">
          <h2 className="text-sm font-medium text-gray-900">About</h2>

          <div className="prose prose-sm mt-2 text-gray-500">{seller.bio}</div>
        </div>
        <div className="mt-3">
          <h2 className="text-sm font-medium text-gray-900">Location</h2>

          <div className="prose prose-sm mt-2 flex gap-3 text-gray-500">
            {seller.location?.city}, {seller.location?.country}{" "}
            <a
              href={`http://maps.google.com/?q=${seller.location?.city}+${seller.location?.country}`}
              rel="noopener"
              target="_blank"
            >
              <ArrowSquareOut color="black" size={20} />
            </a>
          </div>
        </div>
        <div className="mt-9 flex gap-4">
          <div className="grow">
            <Button className="w-full" disabled variant={Variants.ACCENT}>
              Chat coming soon!
            </Button>
          </div>
          <Button
            className="flex items-center gap-2"
            outline
            variant={Variants.ACCENT}
          >
            <Heart size={18} />
          </Button>
        </div>

        <div className="mt-10">
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
                {seller.instagramStats.followers}
              </div>
              <span className="text-sm font-medium text-gray-900">
                Followers
              </span>
            </div>
            <div className="text-center ">
              <div className=" text-3xl font-medium text-gray-900">
                {seller.instagramStats.mediaCount}
              </div>
              <span className="text-sm font-medium text-gray-900">Posts</span>
            </div>
            <div className="text-center ">
              <div className=" text-3xl font-medium text-gray-900">0</div>
              <span className="text-sm font-medium text-gray-900">Reach</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 ">
            {seller.instagramMedia?.map((media) => (
              <a
                className="relative"
                href={media.link}
                key={media.thumbnail}
                rel="noopener"
                target="_blank"
              >
                <Image
                  alt={media.caption}
                  className="size-full rounded-md object-cover"
                  height={500}
                  src={media.thumbnail}
                  width={500}
                />
                <small className="absolute bottom-0  w-full truncate rounded-b-md bg-[rgba(0,0,0,0.15)] p-2 text-center text-[10px] italic text-white backdrop-blur-sm">
                  {media.caption}
                </small>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export const revalidate = 60;
