import React, { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

export default function AccountCard({
  children,
  className,
  title,
  subtitle,
}: PropsWithChildren<{
  className?: string;
  title?: string;
  subtitle?: string;
}>) {
  return (
    <section
      className={cn(
        "shadow-md rounded-xl mb-5 p-5 border border-gray-200",
        className,
      )}
    >
      {title && <h2 className="text-xl font-poppins font-medium">{title}</h2>}
      {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
      {children}
    </section>
  );
}
