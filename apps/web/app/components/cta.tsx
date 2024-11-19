import React from "react";
import Link from "next/link";
import { Button } from "ui/button";
import { Route } from "../../constants/routes";
import { getCurrentUser, Injector } from "../../lib/apollo-server";
import type { GetCurrentUserQuery } from "../../__generated__/graphql";

function PrimaryButton({ data }: { data?: GetCurrentUserQuery }) {
  if (data?.user) {
    if (data.user.isOnboarded) {
      return (
        <Link href={`${Route.Profile}/${data.user.id}`}>
          <Button>Your profile</Button>
        </Link>
      );
    }
    return (
      <Link href={Route.Onboarding}>
        <Button>Join as an Influencer</Button>
      </Link>
    );
  }
  return (
    <Link href={`${Route.SignUp}?redirect=${Route.Onboarding}`}>
      <Button>Register now</Button>
    </Link>
  );
}

export default function Cta() {
  return (
    <div className="my-16 bg-accent  px-6 py-32 sm:px-6  lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-poppins text-3xl font-bold text-white sm:text-5xl">
          Ready to Grow Together?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-100">
          Whether you're an influencer or a brand, Freeluencers makes it easy to
          connect, collaborate, and create real impact. Join us today!
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Injector Component={PrimaryButton} fetch={getCurrentUser} />
          <Link
            className="text-sm font-semibold leading-6 text-gray-100"
            href={Route.Search}
          >
            Start Your Search <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
