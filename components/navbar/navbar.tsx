"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import classNames from "classnames";
import { List, User, X } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/button";
import Logo from "@/app/logo";
import type { NavbarProps } from "./types";

function Navbar({
  primaryLinks,
  secondaryLinks,
  cta,
  disableCTA,
  userImage,
}: NavbarProps) {
  const activeHref = usePathname();
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className="fixed top-0 z-10 w-full p-2">
      <Menu as="div" className="relative">
        <nav
          aria-label="Global"
          className={classNames(
            " mx-auto flex max-w-7xl ease-in-out transition-colors duration-300 items-center justify-between rounded-xl  px-3 py-2  sm:gap-x-6 sm:py-1",
            scrollPosition > 50
              ? "bg-primary-bg shadow text-gray-900"
              : "bg-transparent text-white",
          )}
        >
          <Link
            className={classNames(
              " flex items-center gap-2 transition-colors ease-in-out duration-300 leading-none  sm:text-6xl",
              scrollPosition > 50 ? "text-primary" : "text-white",
            )}
            href={process.env.NEXT_PUBLIC_BASE_URL || "/public"}
          >
            <Logo size={32} />
            <h1 className="translate-y-0.5 font-madina text-4xl">sociocube</h1>
          </Link>
          <div className="hidden lg:flex lg:gap-x-6">
            {primaryLinks.map(
              (item) =>
                item.render || (
                  <Link
                    className={classNames(
                      "text-base font-semibold leading-6  hover:underline  hover:underline-offset-8 ",
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
          <div className="flex items-center gap-4">
            {userImage ? (
              <Menu as="div" className="relative max-lg:hidden">
                <div>
                  <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    {userImage === "loading" ? (
                      <div className="flex size-8 items-center justify-center rounded-full border border-gray-100">
                        <User className="size-5 rounded-full" size={40} />
                      </div>
                    ) : (
                      <img
                        alt="logged in user"
                        className="size-8 rounded-full object-cover"
                        src={userImage}
                      />
                    )}
                  </MenuButton>
                </div>
                <Transition
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {secondaryLinks.map((item) => (
                      <MenuItem key={item.href}>
                        {({ focus }) =>
                          item.render || (
                            <Link
                              className={classNames(
                                focus ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700",
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
            ) : (
              secondaryLinks.map((item) => (
                <Link
                  className={classNames(
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
              ))
            )}

            {cta ? (
              <Link href={cta.href}>
                <Button
                  compact
                  {...cta.button}
                  className={classNames(cta.button.className, "max-sm:text-sm")}
                  disabled={disableCTA}
                />
              </Link>
            ) : null}
            <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:hidden">
              {({ open }) => (
                <>
                  <span className="sr-only">Open user menu</span>
                  {open ? (
                    <X className="size-5 rounded-full" size={40} />
                  ) : (
                    <List className="size-5 rounded-full" size={40} />
                  )}
                </>
              )}
            </MenuButton>
          </div>
        </nav>
        <Transition
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute inset-x-0 z-10 mt-2 origin-top rounded-xl bg-white py-2 font-medium  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {primaryLinks.map((item) => (
              <MenuItem key={item.href}>
                {({ focus }) =>
                  item.render || (
                    <Link
                      className={classNames(
                        focus ? "bg-gray-100" : "",
                        "block px-4 py-3  text-gray-700",
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
                      className={classNames(
                        focus ? "bg-gray-100" : "",
                        "block px-4 py-3  text-gray-700",
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
    </header>
  );
}

export default Navbar;
