"use client";
import React, { useEffect, useRef, useState } from "react";
import { EffectCards, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Heart, Spinner, TrendUp } from "@phosphor-icons/react/dist/ssr";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { SealCheck } from "@phosphor-icons/react";
import { getRoute } from "../../constants/routes";
import type { GetFeaturedSellersQuery } from "../../__generated__/graphql";

import "swiper/css";
import "swiper/css/effect-cards";
import { convertToAbbreviation } from "../../lib/utils";

function getRandomColor() {
  return `rgb(${Math.floor(Math.random() * 175) + 25},${Math.floor(Math.random() * 175) + 25},${Math.floor(Math.random() * 175) + 25})`;
}
function PostSlide({
  post,
  priority,
  active,
}: {
  post: GetFeaturedSellersQuery["posts"][number];
  priority: boolean;
  active: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (active) {
      void videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [active]);
  return (
    <li className="relative overflow-hidden rounded-lg">
      <div>
        <video
          className="aspect-[9/16] size-full sm:h-[568px] sm:w-[320px]"
          controlsList="nodownload"
          height={568}
          loop
          muted
          playsInline
          preload="none"
          ref={videoRef}
          style={{ background: getRandomColor() }}
          width={320}
        >
          <source src={post.mediaURL || ""} />
        </video>
      </div>
      <div className="absolute bottom-0 h-20 w-full bg-black/30 blur" />
      <Link
        className="absolute bottom-4 flex w-full items-center gap-3 pl-4 pr-3 "
        href={`${getRoute("Profile")}/${post.creatorUsername}`}
        prefetch
      >
        <Image
          alt={post.creatorName}
          className="size-10 rounded-full object-cover"
          height={40}
          priority={priority}
          src={post.creatorImage}
          width={40}
        />
        <p className="flex grow items-center gap-1.5 font-bold text-white">
          {post.creatorName}
          {post.creatorVerified ? (
            <div className="relative">
              <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 bg-white " />
              <SealCheck className="relative text-accent" weight="fill" />
            </div>
          ) : null}
        </p>
        <div className="text-xs font-semibold text-white">
          <div className="flex flex-col  items-center gap-1">
            <TrendUp size={16} weight="bold" />
            {Math.round(post.er)}%
          </div>

          <div className=" mt-2 flex flex-col items-center gap-1.5">
            <Heart size={16} weight="bold" />
            {convertToAbbreviation(post.likes)}
          </div>
        </div>
      </Link>
    </li>
  );
}

function PostSlider({ posts }: { posts: GetFeaturedSellersQuery["posts"] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

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
      onRealIndexChange={(swiper) => {
        setCurrentSlide(swiper.realIndex);
      }}
    >
      {posts.map((post, i) => (
        <SwiperSlide key={post.mediaURL}>
          <PostSlide
            active={currentSlide === i}
            post={post}
            priority={i === 0}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default dynamic(() => Promise.resolve(PostSlider), {
  ssr: false,
  loading: () => (
    <div className="mx-auto flex aspect-[9/16] w-3/4 max-w-[320px] items-center justify-center rounded-lg bg-red-50 sm:w-80">
      <Spinner className="animate-spin fill-primary " size={30} />
    </div>
  ),
});
