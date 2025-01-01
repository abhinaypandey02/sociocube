import { and, or, eq, isNotNull, getTableColumns, desc, gt } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { UserTable } from "../../db/schema";
import { InstagramDetails } from "../../../Instagram/db/schema";

export async function handleGetFeaturedSellers() {
  return db
    .select(getTableColumns(UserTable))
    .from(UserTable)
    .where(
      and(
        or(eq(UserTable.isOnboarded, true)),
        isNotNull(UserTable.photo),
        isNotNull(UserTable.bio),
        isNotNull(UserTable.instagramDetails),
        isNotNull(UserTable.name),
      ),
    )
    .innerJoin(
      InstagramDetails,
      and(
        eq(InstagramDetails.id, UserTable.instagramDetails),
        gt(InstagramDetails.er, 1),
      ),
    )
    .orderBy(desc(InstagramDetails.followers))
    .limit(9);
}
