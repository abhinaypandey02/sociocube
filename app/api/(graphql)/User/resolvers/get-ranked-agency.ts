import { db } from "@backend/lib/db";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { and, isNotNull, ne, or } from "drizzle-orm";

import { Roles } from "@/app/api/lib/constants/roles";
import { withPagination } from "@/app/api/lib/utils/pagination";

import { ApplicationTable } from "../../Application/db";
import { PostingTable } from "../../Posting/db";
import { UserTable } from "../db";

export async function handleGetRankedAgency(page: number) {
  return withPagination(
    db
      .select(getTableColumns(UserTable))
      .from(UserTable)
      .leftJoin(PostingTable, eq(PostingTable.agency, UserTable.id))
      .innerJoin(
        ApplicationTable,
        eq(ApplicationTable.posting, PostingTable.id),
      )
      .where(
        and(
          isNotNull(UserTable.photo),
          isNotNull(UserTable.bio),
          isNotNull(UserTable.instagramDetails),
          isNotNull(UserTable.name),
          isNotNull(UserTable.username),
          isNotNull(UserTable.location),
          ne(UserTable.id, 134),
          or(eq(UserTable.role, Roles.Agency), eq(UserTable.role, Roles.Brand)),
        ),
      )
      .groupBy(UserTable.id)
      .orderBy(desc(sql`COUNT(${ApplicationTable.id})`), UserTable.id),
    {
      page,
      pageSize: 9,
    },
  );
}
