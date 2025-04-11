"use client";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";

import BottomNav from "@/app/(dashboard)/components/bottom-nav";
import SideNav from "@/app/(dashboard)/components/side-nav";
import TopNav from "@/app/(dashboard)/components/top-nav";
import { NAV_ITEMS } from "@/app/(dashboard)/constants";
import { SEO } from "@/constants/seo";
import { useSubPage } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const getActiveItem = (pathname: string) =>
  NAV_ITEMS.find((item) => String(item.href) === pathname);

export default function NavWrapper({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const { openSubPage } = useSubPage();
  const [activeItem, setActiveItem] = useState(getActiveItem(pathname));
  useEffect(() => {
    const activeItem = getActiveItem(pathname);
    if (activeItem) setActiveItem(activeItem);
  }, [pathname]);
  const subPages = useMemo(
    () => NAV_ITEMS.filter((item) => item.parent === activeItem?.href),
    [activeItem],
  );
  return (
    <>
      <div
        className={cn(
          "mx-auto flex w-full max-sm:pb-10 max-w-7xl grow overflow-x-hidden no-scrollbar",
          openSubPage ? "overflow-y-hidden" : "overflow-y-auto",
        )}
      >
        <SideNav activeItem={activeItem} setActiveItem={setActiveItem} />
        <div className={cn("relative w-full grow flex flex-col ")}>
          <TopNav
            subLinks={subPages}
            title={activeItem?.heading || SEO.companyName}
          />

          <h2 className="px-8 py-10 font-poppins text-4xl font-semibold text-gray-800 max-lg:hidden">
            {activeItem?.heading}
          </h2>
          <div className="min-h-0 w-full lg:px-8">{children}</div>
        </div>
      </div>
      <BottomNav activeItem={activeItem} setActiveItem={setActiveItem} />
    </>
  );
}
