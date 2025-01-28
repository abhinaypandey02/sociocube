import {
  and,
  or,
  eq,
  isNotNull,
  getTableColumns,
  desc,
  gt,
  arrayContains,
} from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { UserTable } from "../../db/schema";
import { InstagramDetails } from "../../../Instagram/db/schema";
import { Roles } from "../../../../constants/roles";

export async function handleGetFeaturedSellers() {
  return db
    .select(getTableColumns(UserTable))
    .from(UserTable)
    .where(
      and(
        eq(UserTable.isOnboarded, true),
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
        or(
          isNotNull(InstagramDetails.accessToken),
          arrayContains(UserTable.roles, [Roles.ManuallyVerified]),
        ),
      ),
    )
    .orderBy(desc(InstagramDetails.followers))
    .limit(9);
}
