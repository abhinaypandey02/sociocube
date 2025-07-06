import { db } from "@backend/lib/db";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { and, isNotNull } from "drizzle-orm";

import { Roles } from "@/app/api/lib/constants/roles";

import { ApplicationTable } from "../../Application/db";
import { PostingTable } from "../../Posting/db";
import { UserTable } from "../db";

export async function handleGetAgencyRank(page: number) {
  // return withPagination(
  //   db
  //     .select(getTableColumns(UserTable))
  //     .from(UserTable)
  //     .leftJoin(PostingTable, eq(PostingTable.agency, UserTable.id))
  //     .leftJoin(ApplicationTable, eq(ApplicationTable.posting, PostingTable.id))
  //     .where(
  //       and(
  //         isNotNull(UserTable.photo),
  //         isNotNull(UserTable.bio),
  //         isNotNull(UserTable.instagramDetails),
  //         isNotNull(UserTable.name),
  //         isNotNull(UserTable.username),
  //         eq(UserTable.role, Roles.Agency)
  //       )
  //     )
  //     .groupBy(UserTable.id)
  //     .orderBy(
  //       desc(sql`COUNT(${ApplicationTable.id})`),
  //       UserTable.id
  //     ),
  //   {
  //     page,
  //     pageSize: 9,
  //   }
  // );

  const featured = db
    .select(getTableColumns(UserTable))
    .from(UserTable)
    .leftJoin(PostingTable, eq(PostingTable.agency, UserTable.id))
    .leftJoin(ApplicationTable, eq(ApplicationTable.posting, PostingTable.id))
    .where(
      and(
        isNotNull(UserTable.photo),
        isNotNull(UserTable.bio),
        isNotNull(UserTable.instagramDetails),
        isNotNull(UserTable.name),
        isNotNull(UserTable.username),
        eq(UserTable.role, Roles.Agency),
      ),
    )
    .groupBy(UserTable.id)
    .orderBy(desc(sql`COUNT(${ApplicationTable.id})`), UserTable.id)
    .limit(8);
  return featured;
}
