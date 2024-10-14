import React, { useMemo } from "react";
import Link from "next/link";
import classNames from "classnames";
import { Button } from "../../atoms/button";
import type { NavbarProps } from "./types";

function Navbar({ sections, activeHref, disabled }: NavbarProps) {
  const linksList = useMemo(
    () =>
      sections.map((section, i) => (
        <div className="flex items-center gap-4" key={i}>
          {section.map((link) => {
            const children =
              typeof link.label !== "string" ? (
                <Button {...link.label} disabled={disabled} />
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
                  href={disabled ? "/" : link.href}
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
    <nav className="w-full px-6 py-4 shadow-md">
      <div className=" mx-auto flex max-w-screen-2xl items-center">
        <Link className="pr-14 text-3xl font-bold italic text-primary" href="/">
          freeluence
        </Link>
        <div className="flex grow items-center justify-between gap-6">
          {linksList}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
