"use client";
import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import classNames from "classnames";
import { NavItem } from "@/app/(dashboard)/type";
import { NAV_ITEMS } from "@/app/(dashboard)/constants";

export default function BottomNav({
  setActiveItem,
  activeItem,
}: {
  setActiveItem: Dispatch<SetStateAction<NavItem | undefined>>;
  activeItem?: NavItem;
}) {
  return (
    <div className="flex items-center justify-center border-t border-gray-200 py-3 shadow-xl">
      {NAV_ITEMS.map((item) => (
        <Link
          className={classNames(
            "flex flex-col items-center",
            activeItem?.href === item.href && "text-accent",
          )}
          href={item.href}
          key={item.href}
          onClick={() => {
            setActiveItem(item);
          }}
        >
          <item.icon size={20} weight="bold" />
          <p className="text-xs">{item.bottomTitle}</p>
        </Link>
      ))}
      <div />
    </div>
  );
}
