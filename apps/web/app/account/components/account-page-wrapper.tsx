import type { PropsWithChildren, ReactNode } from "react";
import React from "react";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function AccountPageWrapper({
  title,
  cta,
  children,
  backRoute,
}: PropsWithChildren<{
  title: string;
  cta?: ReactNode;
  backRoute?: {
    route: string;
    title: string;
  };
}>) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8 sm:py-16 lg:px-8">
      {backRoute ? (
        <Link
          className="mb-3 flex items-center gap-1 text-sm text-gray-600"
          href={backRoute.route}
        >
          <ArrowLeft /> Back to {backRoute.title}
        </Link>
      ) : null}
      <div className="mb-8 flex items-center justify-between gap-2">
        <h2 className="font-poppins text-4xl font-bold text-gray-800">
          {title}
        </h2>
        {cta}
      </div>
      {children}
    </div>
  );
}
