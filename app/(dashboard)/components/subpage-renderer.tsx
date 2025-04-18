"use client";
import { CaretLeft } from "@phosphor-icons/react";
import React, { PropsWithChildren } from "react";

import { Route } from "@/constants/routes";
import { useSubPage } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export default function SubpageRenderer({
  children,
  href,
}: PropsWithChildren<{
  href: Route;
}>) {
  const { openSubPage, setOpenSubPage } = useSubPage();
  return (
    <div
      className={cn(
        "absolute inset-0 px-4 pb-8 pt-20 z-10 size-full bg-background transition-transform",
        openSubPage?.href !== href && "translate-x-full",
      )}
      key={href}
    >
      <div className="flex fixed top-0 items-center gap-2 py-4 bg-background w-full z-10">
        <button
          onClick={() => {
            setOpenSubPage(undefined);
          }}
        >
          <CaretLeft size={22} weight="bold" />
        </button>
        <h2 className="font-poppins text-2xl font-semibold text-gray-800">
          {openSubPage?.heading}
        </h2>
      </div>
      <div className="overflow-auto">{children}</div>
    </div>
  );
}
