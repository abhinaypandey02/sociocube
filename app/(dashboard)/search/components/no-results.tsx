import { SmileyXEyes } from "@phosphor-icons/react";
import React from "react";

export default function NoResults({ errorMessage }: { errorMessage?: string }) {
  return (
    <div className="relative flex w-full flex-col items-center rounded-lg p-12 text-center hover:border-gray-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      <SmileyXEyes size={30} />
      <span className="mt-2 block text-lg font-semibold text-gray-900">
        No results
      </span>
      <span className="mt-2 block text-sm font-medium text-gray-600">
        {errorMessage || "Add less filters and search query to get results"}
      </span>
    </div>
  );
}