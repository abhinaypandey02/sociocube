"use client";
import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Minus, Plus, X } from "@phosphor-icons/react";
import type { SearchSellersFilters } from "../../../__generated__/graphql";
import { SEARCH_FILTERS } from "../constants";

export default function MobileFilterPanel({
  isOpen,
  close,
  handleChange,
  variables,
}: {
  isOpen: boolean;
  close: () => void;
  handleChange: (data: SearchSellersFilters) => void;
  variables: SearchSellersFilters;
}) {
  return (
    <Dialog className="relative z-40 lg:hidden" onClose={close} open={isOpen}>
      <DialogBackdrop
        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        transition
      />

      <div className=" fixed inset-0 z-40 flex">
        <DialogPanel
          className="relative ml-auto flex size-full max-w-xs flex-col overflow-y-auto bg-primary-bg py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
          transition
        >
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              className="-mr-2 flex size-10 items-center justify-center rounded-md p-2 text-gray-400"
              onClick={close}
              type="button"
            >
              <span className="sr-only">Close menu</span>
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>

          {/* Filters */}
          <form className="mt-4 border-t border-gray-200">
            {SEARCH_FILTERS.map((section) => (
              <Disclosure
                as="div"
                className="border-t border-gray-200 px-4 py-6"
                key={section.name}
              >
                <h3 className=" flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">
                      {section.name}
                    </span>
                    <span className="ml-6 flex items-center">
                      <Plus
                        aria-hidden="true"
                        className="size-5 group-data-[open]:hidden"
                      />
                      <Minus
                        aria-hidden="true"
                        className="size-5 [.group:not([data-open])_&]:hidden"
                      />
                    </span>
                  </DisclosureButton>
                  <DisclosurePanel className="pt-6">
                    <div className="space-y-4">
                      <section.component
                        onChange={handleChange}
                        variables={variables}
                      />
                    </div>
                  </DisclosurePanel>
                </h3>
              </Disclosure>
            ))}
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
