"use client";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren, useMemo, useState } from "react";

import BottomNav from "@/app/(dashboard)/components/bottom-nav";
import SideNav from "@/app/(dashboard)/components/side-nav";
import TopNav from "@/app/(dashboard)/components/top-nav";
import { NAV_ITEMS } from "@/app/(dashboard)/constants";
import { SEO } from "@/constants/seo";
import { useSubPage } from "@/lib/auth-client";

export default function NavWrapper({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const { openSubPage } = useSubPage();
  const [activeItem, setActiveItem] = useState(
    NAV_ITEMS.find((item) => String(item.href) === pathname),
  );
  const subPages = useMemo(
    () => NAV_ITEMS.filter((item) => item.parent === activeItem?.href),
    [activeItem],
  );
  return (
    <>
      <div
        className={classNames(
          "mx-auto flex w-full  max-w-7xl grow",
          openSubPage ? "overflow-hidden" : "overflow-auto",
        )}
      >
        <SideNav activeItem={activeItem} setActiveItem={setActiveItem} />
        <div className={classNames("relative w-full grow flex flex-col ")}>
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
