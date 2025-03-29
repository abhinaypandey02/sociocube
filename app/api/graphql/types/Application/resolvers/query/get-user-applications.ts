import { desc, eq } from "drizzle-orm";
import { db } from "@backend/lib/db";
import { ApplicationTable } from "../../db/schema";
import type { AuthorizedContext } from "@graphql/context";

export function getUserApplications(ctx: AuthorizedContext) {
  return db
    .select()
    .from(ApplicationTable)
    .where(eq(ApplicationTable.user, ctx.userId))
    .orderBy(desc(ApplicationTable.id));
}
