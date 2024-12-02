"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Dialog, DialogPanel } from "@headlessui/react";
import classNames from "classnames";
import { List, X } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { Button } from "../../atoms/button";
import type { NavbarProps } from "./types";

function Navbar({
  primaryLinks,
  secondaryLinks,
  cta,
  disableCTA,
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
        className="mx-auto flex max-w-7xl items-center justify-between px-3 py-6 sm:gap-x-6 sm:px-6 lg:px-8"
      >
        <div className="flex">
          <Link
            className="-m-1.5 p-1.5 text-2xl font-bold italic text-primary sm:text-3xl"
            href={process.env.NEXT_PUBLIC_FRONTEND_BASE_URL || "/"}
          >
            <h2>freeluencers</h2>
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {primaryLinks.map((item) => (
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
          ))}
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          {secondaryLinks.map((item) => (
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
          ))}
          {cta ? (
            <Link href={cta.href}>
              <Button
                {...cta.button}
                className={classNames(cta.button.className, "max-sm:text-sm")}
                disabled={disableCTA}
              />
            </Link>
          ) : null}
          <button
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 lg:hidden"
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
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-3 py-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between gap-x-6">
            <Link
              className="-m-1.5 p-1.5 text-2xl font-bold italic text-primary sm:text-3xl"
              href="/"
            >
              freeluencers
            </Link>
            <div className="flex gap-4 sm:gap-6 lg:hidden">
              {cta ? (
                <Link href={cta.href}>
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
                {primaryLinks.map((item) => (
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
                ))}
              </div>
              <div className="py-6">
                {secondaryLinks.map((item) => (
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
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default Navbar;
