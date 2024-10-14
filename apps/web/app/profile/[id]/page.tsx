import React, { Suspense } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { queryGQL } from "../../../lib/apollo-server";
import { GET_SELLER } from "../../../lib/queries";
import { getSEO } from "../../../constants/seo";
import ChatButtonInjector from "./components/chat-button-injector";
import ChatButton from "./components/chat-button";

interface ProfilePage {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: ProfilePage): Promise<Metadata> {
  const id = parseInt(params.id);
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
    `${data.getSeller?.name} | Seller at Freeluence`,
    `${data.getSeller?.name} is a freelancing influencer at Freeluence. His instagram account, @${data.getSeller?.instagramStats?.username}, has ${data.getSeller?.instagramStats?.followers} followers. Here's what he has to say: ${data.getSeller?.bio}`,
    [
      data.getSeller?.photo || "",
      ...(data.getSeller?.instagramMedia?.map((media) => media.thumbnail) ||
        []),
    ].filter(Boolean),
  );
}
export default async function ProfilePage({ params }: ProfilePage) {
  const id = parseInt(params.id);
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
  if (!seller?.name || !seller.photo) return null;
  return (
    <div className="mx-auto mt-8 max-w-2xl px-4 pb-16 pt-6 sm:px-6 sm:pb-24 lg:grid lg:max-w-7xl lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8 lg:px-8">
      <div className="lg:col-span-5 lg:col-start-8">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            {seller.name}
          </h1>
          <p className="text-lg  text-gray-900">Travel</p>
        </div>
        {/* Reviews */}
      </div>
      {/* Image gallery */}
      <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
        <h2 className="sr-only">Images</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
          <Image
            alt={seller.name}
            className="rounded-lg lg:col-span-2 lg:row-span-2"
            height={1080}
            src={seller.photo}
            width={720}
          />
        </div>
      </div>

      <div className="mt-8 lg:col-span-5">
        <form>
          <Suspense fallback={<ChatButton to={id} />}>
            <ChatButtonInjector to={id} />
          </Suspense>
        </form>

        {/* Product details */}
        <div className="mt-10">
          <h2 className="text-sm font-medium text-gray-900">About</h2>

          <div className="prose prose-sm mt-2 text-gray-500">{seller.bio}</div>
        </div>
        <div className="mt-10">
          <div className="flex justify-between">
            <h2 className="text-sm font-medium text-gray-900">Instagram</h2>
            <a
              className="link-accent text-sm font-medium text-gray-900"
              href={`https://instagram.com/${seller.instagramStats?.username}`}
            >
              @{seller.instagramStats?.username}
            </a>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 ">
            <div className="text-center ">
              <div className=" text-3xl font-medium text-gray-900">
                {seller.instagramStats?.followers}
              </div>
              <span className="text-sm font-medium text-gray-900">
                Followers
              </span>
            </div>
            <div className="text-center ">
              <div className=" text-3xl font-medium text-gray-900">
                {seller.instagramStats?.mediaCount}
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
              <a className="relative" href={media.link} key={media.thumbnail}>
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
