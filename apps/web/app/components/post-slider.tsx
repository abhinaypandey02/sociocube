"use client";
import React, { Suspense } from "react";
import { EffectCards, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Heart, TrendUp } from "@phosphor-icons/react/dist/ssr";
import { getRoute } from "../../constants/routes";
import type { GetFeaturedSellersQuery } from "../../__generated__/graphql";

import "swiper/css";
import "swiper/css/effect-cards";
import Image from "next/image";

function getRandomColor() {
  return `rgb(${Math.floor(Math.random() * 175)},${Math.floor(Math.random() * 175)},${Math.floor(Math.random() * 175)})`;
}
function PostSlide({
  post,
}: {
  post: GetFeaturedSellersQuery["posts"][number];
}) {
  return (
    <li className="relative overflow-hidden rounded-lg">
      <div>
        <Suspense fallback={<div>REDDDD</div>}>
          <video
            autoPlay
            className="size-full sm:h-[568px] sm:w-[320px]"
            controlsList="nodownload"
            height={568}
            loop
            muted
            playsInline
            poster={post.thumbnailURL}
            preload="none"
            style={{ background: getRandomColor() }}
            width={320}
          >
            <source src={post.mediaURL || ""} />
          </video>
        </Suspense>
      </div>
      <div className="absolute bottom-0 h-20 w-full bg-black/30 blur" />
      <a
        className="absolute bottom-4 flex w-full items-center gap-3 pl-4 pr-3 "
        href={`${getRoute("Profile")}/${post.creatorUsername}`}
      >
        <Image
          alt={post.creatorName}
          className="size-10 rounded-full"
          height={40}
          src={post.creatorImage}
          width={40}
        />
        <p className="grow font-bold text-white">{post.creatorName}</p>
        <div className="text-xs font-semibold text-white">
          <div className="flex flex-col  items-center gap-1">
            <TrendUp size={16} weight="bold" />
            {Math.round(post.er)}%
          </div>

          <div className=" mt-2 flex flex-col items-center gap-1.5">
            <Heart size={16} weight="bold" />
            {post.likes}
          </div>
        </div>
      </a>
    </li>
  );
}

export default function PostSlider({
  posts,
}: {
  posts: GetFeaturedSellersQuery["posts"];
}) {
  return (
    <Swiper
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
      className="w-3/4 max-w-[320px] sm:w-80"
      effect="cards"
      grabCursor
      modules={[EffectCards, Autoplay, Navigation]}
      navigation
    >
      {posts.map((post) => (
        <SwiperSlide key={post.mediaURL}>
          <PostSlide post={post} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
