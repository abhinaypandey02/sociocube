"use client";
import React, { PropsWithChildren, useState } from "react";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import TopNav from "@/app/(dashboard)/components/top-nav";
import BottomNav from "@/app/(dashboard)/components/bottom-nav";
import { SEO } from "@/constants/seo";
import { NAV_ITEMS } from "@/app/(dashboard)/constants";
import { useSubPage } from "@/lib/auth-client";

export default function NavWrapper({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const { openSubPage } = useSubPage();
  const [activeItem, setActiveItem] = useState(
    NAV_ITEMS.find((item) => String(item.href) === pathname),
  );
  return (
    <>
      <div
        className={classNames(
          "relative w-full grow flex flex-col max-w-5xl mx-auto ",
          openSubPage ? "overflow-hidden" : "overflow-auto",
        )}
      >
        <TopNav
          subLinks={activeItem?.subPages || []}
          title={activeItem?.topTitle || SEO.companyName}
        />
        <div className="min-h-0">{children}</div>
      </div>
      <BottomNav activeItem={activeItem} setActiveItem={setActiveItem} />
    </>
  );
}
