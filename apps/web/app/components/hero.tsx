import React from "react";
import Link from "next/link";
import { Button, Variants } from "ui/button";
import { getRoute } from "../../constants/routes";
import type {
  GetCurrentUserQuery,
  GetFeaturedSellersQuery,
} from "../../__generated__/graphql";
import { getCurrentUser, Injector } from "../../lib/apollo-server";
import PostSlider from "./post-slider";

function SecondaryLink({ data }: { data?: GetCurrentUserQuery }) {
  if (data?.user) {
    if (data.user.isOnboarded) {
      return (
        <Link
          className="text-sm font-semibold leading-6 text-gray-900"
          href={`${getRoute("Profile")}/${data.user.username}`}
        >
          Your profile <span aria-hidden="true">→</span>
        </Link>
      );
    }
    return (
      <Link
        className="text-sm font-semibold leading-6 text-gray-900"
        href={getRoute("Onboarding")}
      >
        Get listed <span aria-hidden="true">→</span>
      </Link>
    );
  }
  return (
    <Link
      className="text-sm font-semibold leading-6 text-gray-900"
      href={getRoute("SignUp")}
    >
      Join Now <span aria-hidden="true">→</span>
    </Link>
  );
}

export default function Hero({
  posts,
}: {
  posts: GetFeaturedSellersQuery["posts"];
}) {
  return (
    <div className="relative isolate">
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
      >
        <defs>
          <pattern
            height={200}
            id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
            patternUnits="userSpaceOnUse"
            width={200}
            x="50%"
            y={-1}
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg className="overflow-visible fill-gray-50" x="50%" y={-1}>
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
          height="100%"
          strokeWidth={0}
          width="100%"
        />
      </svg>
      <div
        aria-hidden="true"
        className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
      >
        <div
          className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-8 sm:my-16 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl grid-cols-2 gap-x-14 lg:mx-0 lg:grid lg:max-w-none lg:items-center">
          <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
            <h1 className="font-poppins text-5xl font-bold text-gray-900 sm:text-7xl">
              Connect. <br />
              Collaborate. <br />
              Create.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
              Freeluencers bridges the gap between brands and influencers,
              providing a seamless platform for authentic partnerships. Join us
              today and take your collaborations to the next level!
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link href={getRoute("Postings")}>
                <Button variant={Variants.ACCENT}>Find Collaborations</Button>
              </Link>
              <Injector Component={SecondaryLink} fetch={getCurrentUser} />
            </div>
          </div>
          <div className="mt-20 lg:mt-0">
            <PostSlider posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}
