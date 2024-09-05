import React, { useMemo } from "react";
import Link from "next/link";
import classNames from "classnames";
import { Button } from "../../atoms/button";
import type { NavbarProps } from "./types";

function Navbar({ sections, activeHref }: NavbarProps) {
  const linksList = useMemo(
    () =>
      sections.map((section, i) => (
        <div className="flex items-center gap-4" key={i}>
          {section.map((link) => {
            const children =
              typeof link.label !== "string" ? (
                <Button {...link.label} />
              ) : (
                link.label
              );
            if (link.href)
              return (
                <Link
                  className={classNames(
                    "transition-colors hover:text-accent",
                    activeHref === link.href && "font-bold text-accent",
                  )}
                  href={link.href}
                  key={link.href}
                >
                  {children}
                </Link>
              );
            return children;
          })}
        </div>
      )),
    [sections],
  );
  return (
    <nav className="flex items-center px-6 py-4">
      <Link className="pr-14 text-3xl font-bold italic text-primary" href="/">
        freeluence
      </Link>
      <div className="flex grow items-center justify-between gap-6">
        {linksList}
      </div>
    </nav>
  );
}

export default Navbar;
