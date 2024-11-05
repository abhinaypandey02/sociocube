import React from "react";
import Link from "next/link";
import { Button } from "ui/button";
import { Route } from "../../constants/routes";

export default function Cta() {
  return (
    <div className="my-16 bg-accent  px-6 py-32 sm:px-6  lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Ready to Grow Together?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-100">
          Whether you're an influencer or a brand, Freeluencer makes it easy to
          connect, collaborate, and create real impact. Join us today!
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          <Link href={Route.SignUp}>
            <Button>Join as an Influencer</Button>
          </Link>
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
