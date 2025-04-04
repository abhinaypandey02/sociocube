"use client";
import React, { PropsWithChildren } from "react";
import classNames from "classnames";
import { CaretLeft } from "@phosphor-icons/react";
import { useSubPage } from "@/lib/auth-client";
import { Route } from "@/constants/routes";

export default function SubpageRenderer({
  children,
  href,
}: PropsWithChildren<{
  href: Route;
}>) {
  const { openSubPage, setOpenSubPage } = useSubPage();
  return (
    <div
      className={classNames(
        "absolute inset-0 z-10 size-full  bg-primary-bg transition-transform",
        openSubPage?.href !== href && "translate-x-full",
      )}
      key={href}
    >
      <div className="flex items-center gap-2 p-4">
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
      {children}
    </div>
  );
}
