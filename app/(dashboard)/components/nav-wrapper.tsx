"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";

import BottomNav from "@/app/(dashboard)/components/bottom-nav";
import SideNav from "@/app/(dashboard)/components/side-nav";
import TopNav from "@/app/(dashboard)/components/top-nav";
import { NAV_ITEMS } from "@/app/(dashboard)/constants";
import { Button } from "@/components/button";
import { Variants } from "@/components/constants";
import { SEO } from "@/constants/seo";
import { useSubPage } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import { WRAPPER_ID } from "../campaigns/constants";
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
    () =>
      activeItem ? all.filter((item) => item.parent === activeItem?.href) : [],
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
        <div className={cn("relative w-full grow flex flex-col min-w-0")}>
          <TopNav
            subLinks={subPages}
            title={activeItem?.heading || SEO.companyName}
          />
          <div
            className={
              "flex items-center justify-between px-8 pt-5 pb-5 max-lg:hidden"
            }
          >
            <h2 className="h-10 font-poppins text-3xl font-medium text-gray-800 pl-0.5">
              {activeItem?.heading}
            </h2>
            <div className={"flex gap-1 items-center"}>
              {subPages.map((item) =>
                !item.onlyOnMobile ? (
                  <Link href={item.href} key={item.href}>
                    <Button variant={Variants.DARK} invert square borderless>
                      <item.icon size={24} />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() => setOpenSubPage(item)}
                    key={item.href}
                    variant={Variants.DARK}
                    className={"flex gap-2 items-center"}
                  >
                    {item.navTitle} <item.icon />
                  </Button>
                ),
              )}
            </div>
          </div>
          <div
            id={WRAPPER_ID}
            className="h-full min-h-0 w-full px-4 lg:px-8 overflow-auto snap-y snap-mandatory snap-always"
          >
            {children}
          </div>
        </div>
      </div>
      <BottomNav activeItem={activeItem} setActiveItem={setActiveItem} />
    </>
  );
}
