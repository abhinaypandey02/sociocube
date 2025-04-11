import React, { PropsWithChildren } from "react";

import NavWrapper from "@/app/(dashboard)/components/nav-wrapper";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-[calc(100svh-55px)] flex-col">
      <NavWrapper>{children}</NavWrapper>
    </div>
  );
}
