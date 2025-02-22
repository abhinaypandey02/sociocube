import { desc, eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import { ApplicationTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";

export function getUserApplications(ctx: AuthorizedContext) {
  return db
    .select()
    .from(ApplicationTable)
    .where(eq(ApplicationTable.user, ctx.userId))
    .orderBy(desc(ApplicationTable.id));
}
