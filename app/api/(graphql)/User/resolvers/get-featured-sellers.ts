import { db } from "@backend/lib/db";
import {
  and,
  desc,
  eq,
  getTableColumns,
  inArray,
  isNotNull,
} from "drizzle-orm";

import { InstagramDetails } from "../../Instagram/db";
import { UserTable } from "../db";

export async function handleGetFeaturedSellers() {
  return db
    .select(getTableColumns(UserTable))
    .from(UserTable)
    .where(
      and(
        isNotNull(UserTable.photo),
        isNotNull(UserTable.bio),
        isNotNull(UserTable.instagramDetails),
        isNotNull(UserTable.name),
        inArray(
          UserTable.id,
          [372, 605, 458, 748, 747, 760, 750, 459, 930, 1104],
        ),
      ),
    )
    .innerJoin(
      InstagramDetails,
      and(eq(InstagramDetails.id, UserTable.instagramDetails)),
    )
    .orderBy(desc(InstagramDetails.followers))
    .limit(9);
}
