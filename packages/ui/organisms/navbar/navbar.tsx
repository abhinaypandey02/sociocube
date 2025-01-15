"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import classNames from "classnames";
import { List, User, X } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { Button } from "../../atoms/button";
import type { NavbarProps } from "./types";

function Navbar({
  primaryLinks,
  secondaryLinks,
  cta,
  disableCTA,
  userImage,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeHref = usePathname();

  const handleClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-primary-bg">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between py-6 pl-6 pr-3 sm:gap-x-6 sm:pr-6 lg:px-8"
      >
        <div className="flex">
          <Link
            className="-m-1.5 p-1.5 text-xl font-bold italic text-primary sm:text-3xl"
            href={process.env.NEXT_PUBLIC_FRONTEND_BASE_URL || "/"}
          >
            <h1 className="lowercase">SocioCube</h1>
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {primaryLinks.map(
            (item) =>
              item.render || (
                <Link
                  className={classNames(
                    "text-base font-medium leading-6 text-gray-900 hover:underline  hover:underline-offset-8 ",
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
        <div className="flex items-center gap-4 ">
          {cta ? (
            <Link href={cta.href}>
              <Button
                {...cta.button}
                className={classNames(cta.button.className, "max-sm:text-sm")}
                disabled={disableCTA}
              />
            </Link>
          ) : null}

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
                      className="size-8 rounded-full"
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
          <button
            className="z-10 -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 lg:hidden"
            onClick={() => {
              setMobileMenuOpen(true);
            }}
            type="button"
          >
            <span className="sr-only">Open main menu</span>
            <List aria-hidden="true" className="size-6" />
          </button>
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        onClose={setMobileMenuOpen}
        open={mobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white py-6 pl-6 pr-3 sm:max-w-sm sm:pr-6 sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between gap-x-6">
            <Link
              className="-m-1.5 p-1.5 text-xl font-bold italic text-primary sm:text-3xl"
              href="/"
            >
              sociocube
            </Link>
            <div className="flex gap-4 sm:gap-6 lg:hidden">
              {cta ? (
                <Link href={cta.href} onClick={handleClose}>
                  <Button
                    {...cta.button}
                    className={classNames(
                      cta.button.className,
                      " max-sm:text-sm",
                    )}
                    disabled={disableCTA}
                  />
                </Link>
              ) : null}
              <button
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={handleClose}
                type="button"
              >
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="size-6" />
              </button>
            </div>
          </div>
          <div className="mt-6 flow-root max-sm:px-3">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {primaryLinks.map(
                  (item) =>
                    item.render || (
                      <Link
                        className={classNames(
                          "-mx-3 block rounded-lg px-3 py-2 text-base font-medium leading-7 hover:bg-gray-50 hover:underline  hover:underline-offset-8 ",
                          activeHref === item.href
                            ? "pointer-events-none underline-offset-8 underline"
                            : "",
                        )}
                        href={item.href}
                        key={item.label}
                        onClick={handleClose}
                      >
                        {item.label}
                      </Link>
                    ),
                )}
              </div>
              <div className="py-6">
                {secondaryLinks.map(
                  (item) =>
                    item.render || (
                      <Link
                        className={classNames(
                          "-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-gray-900 hover:bg-gray-50 hover:underline  hover:underline-offset-8 ",
                          activeHref === item.href
                            ? "pointer-events-none underline-offset-8 underline"
                            : "",
                        )}
                        href={item.href}
                        key={item.label}
                        onClick={handleClose}
                      >
                        {item.label}
                      </Link>
                    ),
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default Navbar;
