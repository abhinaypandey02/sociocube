import { db } from "@backend/lib/db";
import { withPagination } from "@backend/lib/utils/pagination";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";

import { Roles } from "@/app/api/lib/constants/roles";

import { ApplicationTable } from "../../Application/db";
import { PostingTable } from "../../Posting/db";
import { UserTable } from "../db";

export async function handleGetAgencyRank(page: number) {
  return withPagination(
    db
      .select(getTableColumns(UserTable))
      .from(UserTable)
      .leftJoin(PostingTable, eq(PostingTable.agency, UserTable.id))
      .leftJoin(ApplicationTable, eq(ApplicationTable.posting, PostingTable.id))
      .where(eq(UserTable.role, Roles.Agency))
      .groupBy(UserTable.id)
      .orderBy(desc(sql`COALESCE(COUNT(${ApplicationTable.id}), 0)`)),
    {
      page,
      pageSize: 10,
    },
  );
}
