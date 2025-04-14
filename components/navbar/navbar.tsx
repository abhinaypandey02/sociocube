"use client";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { List, User, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import Logo from "@/app/logo";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

import type { NavbarProps } from "./types";

function Navbar({
  primaryLinks,
  secondaryLinks,
  cta,
  disableCTA,
  userImage,
}: NavbarProps) {
  const activeHref = usePathname();
  const darkOnTop = activeHref === "/";
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    if (darkOnTop) {
      setScrollPosition(window.scrollY);
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  return (
    <header className="fixed top-0 z-10 w-full p-2">
      <nav
        aria-label="Global"
        className={cn(
          " mx-auto flex max-w-7xl ease-in-out text-gray-900 transition-colors duration-300 items-center justify-between rounded-xl  px-3 py-2  sm:gap-x-6",
          !darkOnTop || scrollPosition > 25
            ? "bg-background shadow-sm "
            : "bg-transparent",
        )}
      >
        <div className="flex items-center gap-5">
          <Link
            className={cn(
              " flex items-center gap-2 transition-colors ease-in-out duration-300 leading-none text-primary sm:text-6xl",
            )}
            href={process.env.NEXT_PUBLIC_BASE_URL || "/public"}
          >
            <Logo size={32} />
            <h1 className="translate-y-0.5 font-madina text-4xl sm:hidden">
              sociocube
            </h1>
          </Link>
          <div className="h-5 w-0.5 bg-gray-200 max-sm:hidden" />
          <div className="hidden lg:flex gap-x-3.5">
            {primaryLinks.map(
              (item) =>
                item.render || (
                  <Link
                    className={cn(
                      "text-base leading-6  hover:underline  hover:underline-offset-8 ",
                      activeHref === item.href
                        ? "pointer-events-none underline-offset-8 underline"
                        : "",
                    )}
                    href={item.href}
                    key={item.label}
                  >
                    {item.label}
                  </Link>
                ),
            )}
          </div>
        </div>
        <div className="flex items-center">
          {cta ? (
            <Link href={cta.href}>
              <Button
                compact
                {...cta.button}
                className={cn(cta.button.className, "max-sm:text-sm")}
                disabled={disableCTA}
              />
            </Link>
          ) : null}
          <Menu as="div" className="relative ml-3.5">
            <MenuButton className="relative flex rounded-full text-sm focus:outline-hidden focus:ring-2 focus:ring-primary focus:ring-offset-2">
              {({ open }) => (
                <>
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  {userImage ? (
                    userImage === "loading" ? (
                      <div className="flex size-8 items-center justify-center rounded-full border border-gray-100">
                        <User className="size-5 rounded-full" size={40} />
                      </div>
                    ) : (
                      <Image
                        alt="logged in user"
                        className="size-8 rounded-full object-cover"
                        height={32}
                        src={userImage}
                        width={32}
                      />
                    )
                  ) : open ? (
                    <X className="size-5 rounded-full" size={40} />
                  ) : (
                    <List className="size-5 rounded-full sm:hidden" size={40} />
                  )}
                </>
              )}
            </MenuButton>
            <Transition
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 ring-black/5 focus:outline-hidden">
                {primaryLinks.map((item) => (
                  // @ts-expect-error -- type missing
                  <MenuItem className="sm:hidden" key={item.href}>
                    {({ focus }) =>
                      item.render || (
                        <Link
                          className={cn(
                            focus ? "bg-gray-100" : "",
                            "block px-4 py-1.5 sm:py-3 text-gray-700",
                          )}
                          href={item.href}
                          key={item.label}
                        >
                          {item.label}
                        </Link>
                      )
                    }
                  </MenuItem>
                ))}
                {secondaryLinks.map((item) => (
                  <MenuItem key={item.href}>
                    {({ focus }) =>
                      item.render || (
                        <Link
                          className={cn(
                            focus ? "bg-gray-100" : "",
                            "block px-4 py-1.5 sm:py-3  text-gray-700",
                          )}
                          href={item.href}
                          key={item.label}
                        >
                          {item.label}
                        </Link>
                      )
                    }
                  </MenuItem>
                ))}
              </MenuItems>
            </Transition>
          </Menu>
          {!userImage &&
            secondaryLinks.map((item) => (
              <Link
                className={cn(
                  "max-lg:hidden lg:text-base lg:font-medium lg:leading-6 hover:underline hover:underline-offset-8 ",
                  activeHref === item.href
                    ? "pointer-events-none underline-offset-8 underline"
                    : "",
                )}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
