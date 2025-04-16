"use client";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

import { NavItem } from "@/app/(dashboard)/type";
import { cn } from "@/lib/utils";

import { useUserNavItems } from "./useUserNavItems";

export default function BottomNav({
  setActiveItem,
  activeItem,
}: {
  setActiveItem: Dispatch<SetStateAction<NavItem | undefined>>;
  activeItem?: NavItem;
}) {
  const { primary } = useUserNavItems();
  return (
    <div className="flex items-center justify-around border-t bg-background border-gray-200 py-3 px-7 gap-4 shadow-xl lg:hidden fixed bottom-0 w-full">
      {primary.map((item) => (
        <Link
          className={cn(
            "flex flex-col items-center",
            activeItem?.href === item.href && "text-accent",
          )}
          href={item.href}
          key={item.href}
          onClick={() => {
            setActiveItem(item);
          }}
        >
          <item.icon
            size={30}
            weight={activeItem?.href === item.href ? "fill" : "duotone"}
          />
        </Link>
      ))}
    </div>
  );
}
