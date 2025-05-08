"use client";
import Link from "next/link";
import React from "react";

import { getRoute } from "@/constants/routes";
import { useToken } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import { useUserNavItems } from "./useUserNavItems";

export default function BottomNav({ activeKey }: { activeKey: string }) {
  const { primary, all } = useUserNavItems();
  const token = useToken();
  const primaryKey =
    all.find((item) => item.href === activeKey)?.parent || activeKey;
  return (
    <div className="flex items-center justify-around border-t bg-background border-gray-200 py-3 px-7 gap-4 shadow-xl lg:hidden fixed bottom-0 w-full">
      {primary.map((item) => (
        <Link
          className={cn(
            "flex flex-col items-center",
            primaryKey === item.href && "text-accent",
          )}
          href={item.requireAuth && !token ? getRoute("SignUp") : item.href}
          key={item.href}
        >
          <item.icon
            size={30}
            weight={primaryKey === item.href ? "fill" : "duotone"}
          />
        </Link>
      ))}
    </div>
  );
}
