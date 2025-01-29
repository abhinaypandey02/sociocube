import {
  and,
  or,
  eq,
  isNotNull,
  getTableColumns,
  desc,
  arrayContains,
  gte,
  inArray,
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
        inArray(UserTable.id, [372, 541, 458, 361, 556, 422, 408, 469, 450]),
      ),
    )
    .innerJoin(
      InstagramDetails,
      and(
        eq(InstagramDetails.id, UserTable.instagramDetails),
        gte(InstagramDetails.er, 1),
        or(
          isNotNull(InstagramDetails.accessToken),
          arrayContains(UserTable.roles, [Roles.ManuallyVerified]),
        ),
      ),
    )
    .orderBy(desc(InstagramDetails.followers))
    .limit(9);
}
