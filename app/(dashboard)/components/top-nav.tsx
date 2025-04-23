"use client";
import Link from "next/link";
import React from "react";

import { NavItem } from "@/app/(dashboard)/type";
import Logo from "@/app/logo";
import LinkWrapper from "@/components/link-wrapper";
import { getRoute } from "@/constants/routes";
import { useSubPage, useToken } from "@/lib/auth-client";

export default function TopNav({
  title,
  subLinks,
}: {
  title: string;
  subLinks: NavItem[];
}) {
  const { setOpenSubPage } = useSubPage();
  const token = useToken();
  return (
    <div
      onScroll={(e) => e.stopPropagation()}
      className="flex w-full items-center justify-between py-4 px-5 lg:hidden sticky top-0 bg-background"
    >
      <div className="flex items-center gap-3">
        <Link href={getRoute("Home")}>
          <Logo className="text-primary" size={32} />
        </Link>
        <h2 className="font-poppins text-2xl font-medium text-gray-800">
          {title}
        </h2>
      </div>
      <div className="flex">
        {subLinks.map((page) => (
          <LinkWrapper
            key={page.heading}
            href={page.requireAuth && !token ? getRoute("SignUp") : undefined}
          >
            <button
              onClick={() => {
                if (page.requireAuth && !token) return;
                setOpenSubPage(page);
              }}
            >
              <page.icon size={24} />
            </button>
          </LinkWrapper>
        ))}
      </div>
    </div>
  );
}
