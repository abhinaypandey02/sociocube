"use client";
import React, { PropsWithChildren } from "react";

import BottomNav from "@/app/(dashboard)/components/bottom-nav";
import SideNav from "@/app/(dashboard)/components/side-nav";
import TopNav from "@/app/(dashboard)/components/top-nav";
import { cn } from "@/lib/utils";

import { WRAPPER_ID } from "../campaigns/constants";

export default function DashboardWrapper({
  children,
  backRoute,
  title,
  activeKey,
}: PropsWithChildren<{
  title: string;
  activeKey: string;
  backRoute?: string;
}>) {
  return (
    <>
      <div
        className={cn(
          "mx-auto flex w-full max-w-8xl grow overflow-x-hidden no-scrollbar",
        )}
      >
        <SideNav activeKey={activeKey} />
        <div className={cn("relative w-full grow flex flex-col min-w-0")}>
          <TopNav backRoute={backRoute} activeKey={activeKey} title={title} />
          <div
            id={WRAPPER_ID}
            className="h-full min-h-0 w-full px-4 lg:px-8 overflow-auto snap-y snap-mandatory snap-always"
          >
            {children}
          </div>
        </div>
      </div>
      <BottomNav activeKey={activeKey} />
    </>
  );
}
