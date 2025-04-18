"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import type { GetAccountDetailsQuery } from "@/__generated__/graphql";
import { getRoute } from "@/constants/routes";
import { cn } from "@/lib/utils";

import { useAccountSections } from "../constants";

export type AccountSectionData = NonNullable<GetAccountDetailsQuery["user"]>;

export default function AccountView({
  defaultSection,
  data,
}: {
  defaultSection: number;
  data: AccountSectionData;
}) {
  const [selectedSection, setSelectedSection] = useState(
    isNaN(defaultSection) ? 0 : defaultSection,
  );
  const router = useRouter();
  const ACCOUNT_SECTIONS = useAccountSections();
  const SelectedComponent = ACCOUNT_SECTIONS[selectedSection]?.component;
  return (
    <div className="pb-10">
      <h2 className="sr-only">General Settings</h2>

      <aside className="flex overflow-x-auto border-b border-gray-900/5 py-4 mb-5">
        <nav className="flex-none">
          <ul className="flex gap-x-3 gap-y-1 whitespace-nowrap">
            {ACCOUNT_SECTIONS.map((item, i) => (
              <li key={item.title}>
                <button
                  className={cn(
                    selectedSection === i
                      ? "bg-gray-50 text-accent"
                      : "text-gray-700 hover:text-accent hover:bg-gray-50",
                    "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold",
                  )}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    } else {
                      setSelectedSection(i);
                      router.push(`${getRoute("Profile")}/?section=${i}`);
                    }
                  }}
                  type="button"
                >
                  <item.icon
                    aria-hidden="true"
                    className={cn(
                      selectedSection === i
                        ? "text-accent"
                        : "text-gray-400 group-hover:text-accent",
                      "h-6 w-6 shrink-0",
                    )}
                  />
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {SelectedComponent ? <SelectedComponent data={data} /> : null}
    </div>
  );
}
