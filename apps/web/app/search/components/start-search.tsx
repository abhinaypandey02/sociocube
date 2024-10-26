import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";

export default function StartSearch() {
  return (
    <div className="relative flex w-full flex-col items-center rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
      <MagnifyingGlass size={30} />
      <span className="mt-2 block text-lg font-semibold text-gray-900">
        Start searching
      </span>
      <span className="mt-2 block text-sm font-medium text-gray-600">
        Add filters and search query to get personalised results
      </span>
    </div>
  );
}
