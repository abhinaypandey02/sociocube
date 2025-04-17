"use client";
import Link from "next/link";
import React from "react";

import { NavItem } from "@/app/(dashboard)/type";
import Logo from "@/app/logo";
import { getRoute } from "@/constants/routes";
import { useSubPage } from "@/lib/auth-client";

export default function TopNav({
  title,
  subLinks,
}: {
  title: string;
  subLinks: NavItem[];
}) {
  const { setOpenSubPage } = useSubPage();

  return (
    <div
      onScroll={(e) => e.stopPropagation()}
      className="flex w-full items-center justify-between py-4 px-5 lg:hidden sticky top-0 bg-background"
    >
      <div className="flex items-center gap-3">
        <Link href={getRoute("Home")}>
          <Logo className="text-primary" size={36} />
        </Link>
        <h2 className="font-poppins text-2xl font-semibold text-gray-800">
          {title}
        </h2>
      </div>
      <div className="flex">
        {subLinks.map((page) => (
          <button
            key={page.heading}
            onClick={() => {
              setOpenSubPage(page);
            }}
          >
            <page.icon size={24} />
          </button>
        ))}
      </div>
    </div>
  );
}
