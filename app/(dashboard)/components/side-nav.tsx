"use client";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

import { NAV_ITEMS } from "@/app/(dashboard)/constants";
import { NavItem } from "@/app/(dashboard)/type";
import Logo from "@/app/logo";
import { Route } from "@/constants/routes";
import { cn } from "@/lib/utils";

import { useUserNavItems } from "./useUserNavItems";

export default function SideNav({
  setActiveItem,
  activeItem,
}: {
  setActiveItem: Dispatch<SetStateAction<NavItem | undefined>>;
  activeItem?: NavItem;
}) {
  if (activeItem?.onlyOnMobile)
    activeItem = NAV_ITEMS.find((item) => item.href === activeItem?.parent);
  const { all } = useUserNavItems();

  return (
    <ul className="space-y-1 shrink-0 border-r border-gray-200 px-3 py-4 max-lg:hidden ">
      <Link
        className="mb-8 gap-2 flex items-center text-primary"
        href={Route.Home}
        key={Route.Home}
      >
        <Logo size={36} />

        <h1 className="translate-y-0.5 font-madina text-4xl leading-none">
          sociocube
        </h1>
      </Link>
      {all
        .filter((item) => !item.onlyOnMobile)
        .map((item) => (
          <Link
            className={cn(
              "flex gap-2.5 items-center py-3 pl-3 pr-14 hover:bg-gray-100 rounded-lg",
              activeItem?.href === item.href && "bg-gray-100 text-primary",
            )}
            href={item.href}
            key={item.href}
            onClick={() => {
              setActiveItem(item);
            }}
          >
            <item.icon
              size={28}
              weight={activeItem?.href === item.href ? "fill" : "duotone"}
            />
            <h4 className="text-lg font-medium">{item.navTitle}</h4>
          </Link>
        ))}
      <div />
    </ul>
  );
}
