"use client";
import React from "react";
import { EffectCards, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Heart, TrendUp } from "@phosphor-icons/react/dist/ssr";
import { getRoute } from "../../constants/routes";
import type { GetFeaturedSellersQuery } from "../../__generated__/graphql";

import "swiper/css";
import "swiper/css/effect-cards";

export default function PostSlider({
  posts,
}: {
  posts: GetFeaturedSellersQuery["posts"];
}) {
  return (
    <Swiper
      autoplay={{
        delay: 2000,
        disableOnInteraction: true,
      }}
      className="w-56 sm:w-80"
      effect="cards"
      grabCursor
      loop
      modules={[EffectCards, Autoplay, Navigation]}
      navigation
    >
      {posts.map((post) => (
        <SwiperSlide key={post.mediaURL}>
          <li className="relative overflow-hidden rounded-lg">
            <div rel="noopener">
              <video autoPlay loop muted src={post.mediaURL || ""} />
            </div>
            <div className="absolute bottom-0 h-20 w-full bg-black/30 blur" />
            <a
              className="absolute bottom-4 flex w-full items-center gap-3 pl-4 pr-3 "
              href={`${getRoute("Profile")}/${post.creatorUsername}`}
            >
              <img
                alt={post.creatorName}
                className="size-10 rounded-full"
                src={post.creatorImage}
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
