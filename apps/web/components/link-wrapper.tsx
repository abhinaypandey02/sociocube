import type { PropsWithChildren } from "react";
import React from "react";
import Link from "next/link";

export default function LinkWrapper({
  href,
  children,
}: PropsWithChildren<{ href?: string | null }>) {
  if (!href) return children;
  return <Link href={href}>{children}</Link>;
}
