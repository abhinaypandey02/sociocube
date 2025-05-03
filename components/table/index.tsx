import { ArrowDown, ArrowUp } from "@phosphor-icons/react";
import {
  AccessorColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDownUp } from "lucide-react";
import React, { ReactNode } from "react";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { cn } from "@/lib/utils";

export default function Table<T>({
  data,
  columns,
  pageSize = 25,
  cta,
}: {
  data: T[];
  // eslint-disable-next-line -- needed package deps
  columns: AccessorColumnDef<T, any>[];
  pageSize?: number;
  cta?: ReactNode;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const table = useReactTable({
    data,
    columns: columns.map((col) => ({
      enableColumnFilter: false,
      enableSorting: false,
      ...col,
    })),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-center py-4 justify-between">
        <div className={"w-full max-w-sm"}>
          <Input
            name={""}
            placeholder="Search"
            className="text-sm py-1.5"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              table.getAllColumns().forEach((col) => {
                if (col.getCanFilter()) col.setFilterValue(event.target.value);
              });
            }}
          />
        </div>
        {cta}
      </div>
      <table className={cn("w-full caption-bottom text-sm")}>
        <thead className={cn("")}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              className={cn(
                "border-b border-gray-300 hover:bg-muted/50 data-[state=selected]:bg-muted transition-colors",
              )}
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    onClick={() => header.column.toggleSorting()}
                    key={header.id}
                    className={cn(
                      "text-foreground h-10 px-2 py-3 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
                    )}
                  >
                    <button
                      disabled={!header.column.getCanSort()}
                      className={cn("flex items-center gap-0.5 ")}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      {header.column.getIsSorted() === "desc" ? (
                        <ArrowDown size={12} />
                      ) : header.column.getIsSorted() === "asc" ? (
                        <ArrowUp size={12} />
                      ) : (
                        header.column.getCanSort() && <ArrowDownUp size={12} />
                      )}
                    </button>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, i) => (
              <tr
                className={cn(
                  "hover:bg-muted/100 data-[state=selected]:bg-muted  transition-colors",
                  i % 2 === 0 ? "" : "bg-muted/50",
                )}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    className={cn(
                      "px-2 py-4 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
                    )}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <td
              colSpan={columns.length}
              className="h-24 text-center w-full mt-10"
            >
              No results.
            </td>
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-end space-x-2 py-4">
        {table.getCanPreviousPage() && (
          <Button
            invert
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
        )}
        {table.getCanNextPage() && (
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
