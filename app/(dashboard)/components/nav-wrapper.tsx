"use client";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";

import BottomNav from "@/app/(dashboard)/components/bottom-nav";
import SideNav from "@/app/(dashboard)/components/side-nav";
import TopNav from "@/app/(dashboard)/components/top-nav";
import { NAV_ITEMS } from "@/app/(dashboard)/constants";
import { Button } from "@/components/button";
import { SEO } from "@/constants/seo";
import { useSubPage } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import { useUserNavItems } from "./useUserNavItems";

const getActiveItem = (pathname: string) =>
  NAV_ITEMS.find((item) => String(item.href) === pathname);

export default function NavWrapper({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const { openSubPage, setOpenSubPage } = useSubPage();
  const [activeItem, setActiveItem] = useState(getActiveItem(pathname));
  useEffect(() => {
    const activeItem = getActiveItem(pathname);
    if (activeItem) setActiveItem(activeItem);
  }, [pathname]);
  const { all } = useUserNavItems();
  const subPages = useMemo(
    () => all.filter((item) => item.parent === activeItem?.href),
    [activeItem, all],
  );
  return (
    <>
      <div
        className={cn(
          "mx-auto flex w-full max-w-7xl grow overflow-x-hidden no-scrollbar",
          openSubPage ? "overflow-y-hidden" : "overflow-y-auto",
        )}
      >
        <SideNav activeItem={activeItem} setActiveItem={setActiveItem} />
        <div className={cn("relative w-full grow flex flex-col")}>
          <TopNav
            subLinks={subPages}
            title={activeItem?.heading || SEO.companyName}
          />
          <div
            className={
              "flex items-center justify-between px-8 py-7 max-lg:hidden"
            }
          >
            <h2 className=" font-poppins text-4xl font-semibold text-gray-800 pl-0.5">
              {activeItem?.heading}
            </h2>
            <div className={"flex gap-1 items-center"}>
              {subPages
                .filter((item) => item.onlyOnMobile)
                .map((item) => (
                  <Button
                    onClick={() => setOpenSubPage(item)}
                    key={item.href}
                    className={"flex gap-1 items-center text-sm"}
                  >
                    {item.navTitle} <item.icon />
                  </Button>
                ))}
            </div>
          </div>
          <div
            id="dashboard-wrapper-container"
            className="min-h-0 w-full px-4 lg:px-8 overflow-auto snap-y snap-mandatory snap-always"
          >
            {children}
          </div>
        </div>
      </div>
      <BottomNav activeItem={activeItem} setActiveItem={setActiveItem} />
    </>
  );
}
