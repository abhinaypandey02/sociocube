import Link from "next/link";
import React from "react";

import type { GetCurrentUserQuery } from "@/__generated__/graphql";
import { Button } from "@/components/button";
import { getRoute } from "@/constants/routes";
import { getCurrentUser, Injector } from "@/lib/apollo-server";

function PrimaryButton({ data }: { data?: GetCurrentUserQuery }) {
  if (data?.user) {
    if (data.user.isOnboarded) {
      return (
        <Link href={`${getRoute("Profile")}/${data.user.username}`}>
          <Button>Your profile</Button>
        </Link>
      );
    }
    return (
      <Link href={getRoute("Onboarding")}>
        <Button>Join as an Influencer</Button>
      </Link>
    );
  }
  return (
    <Link href={getRoute("SignUp")}>
      <Button>Register now</Button>
    </Link>
  );
}

export default function Cta() {
  return (
    <div className="mt-16 bg-accent  px-6 py-32 sm:px-6  lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-poppins text-3xl font-semibold text-white sm:text-5xl">
          Ready to Launch or Join Your Next UGC Campaign
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-100">
          Whether you're a brand looking to collaborate with top creators or a
          content creator ready to monetize your talent — Sociocube is your
          launchpad. Start for free and discover the future of influencer
          marketing.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Injector Component={PrimaryButton} fetch={getCurrentUser} />
          <Link
            className="text-sm font-semibold leading-6 text-gray-100"
            href={getRoute("Search")}
          >
            Start Your Search <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
