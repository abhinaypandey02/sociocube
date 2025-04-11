import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
} from "@phosphor-icons/react";
import type { AccessorColumnDef, PaginationState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

export default function Table<T>({
  data,
  columns,
  pageSize = 25,
}: {
  data: T[];
  // eslint-disable-next-line -- needed package deps
  columns: AccessorColumnDef<T, any>[];
  pageSize?: number;
}) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  const totalPages = table.getPageCount();

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className={cn(
                      "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3",
                      !header.column.getCanSort() && "cursor-default",
                    )}
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    scope="col"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {{
                      asc: <ArrowUp className="ml-2 inline" />,
                      desc: <ArrowDown className="ml-2 inline" />,
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="border-y border-gray-300 bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr className="even:bg-gray-50" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.getRowCount() > pagination.pageSize && (
        <div className="mt-3 flex w-full items-center justify-between gap-8 p-3">
          <p className=" text-sm font-light text-gray-800">
            Showing <b>{pagination.pageIndex * pagination.pageSize + 1}</b> to{" "}
            <b>
              {Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                table.getRowCount(),
              )}
            </b>{" "}
            of <b>{table.getRowCount()}</b>
          </p>
          <p className="flex gap-4">
            {table.getCanPreviousPage() && (
              <button onClick={table.previousPage} type="button">
                <ArrowLeft weight="bold" />
              </button>
            )}
            {pagination.pageIndex > 1 && (
              <button
                className={
                  pagination.pageIndex + 1 === 1 ? "font-semibold" : ""
                }
                onClick={() => {
                  table.setPageIndex(0);
                }}
                type="button"
              >
                1
              </button>
            )}
            {pagination.pageIndex > 2 ? "..." : ""}
            {[
              pagination.pageIndex,
              pagination.pageIndex + 1,
              pagination.pageIndex + 2,
            ].map((page) =>
              page && page <= totalPages ? (
                <button
                  className={
                    pagination.pageIndex + 1 === page
                      ? "font-semibold cursor-default"
                      : ""
                  }
                  key={page}
                  onClick={() => {
                    table.setPageIndex(page - 1);
                  }}
                  type="button"
                >
                  {page}
                </button>
              ) : null,
            )}
            {pagination.pageIndex < totalPages - 3 ? "..." : ""}
            {pagination.pageIndex < totalPages - 2 && (
              <button
                className={
                  pagination.pageIndex + 1 === totalPages
                    ? "font-semibold cursor-default"
                    : ""
                }
                onClick={() => {
                  table.setPageIndex(totalPages - 1);
                }}
                type="button"
              >
                {totalPages}
              </button>
            )}
            {table.getCanNextPage() && (
              <button onClick={table.nextPage} type="button">
                <ArrowRight weight="bold" />
              </button>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
