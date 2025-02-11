import { eq, getTableColumns } from "drizzle-orm";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { PostingTable } from "../../db/schema";
import { AgencyMember } from "../../../Agency/db/schema";

export async function getUserPostings(ctx: AuthorizedContext) {
  return db
    .select(getTableColumns(PostingTable))
    .from(AgencyMember)
    .where(eq(AgencyMember.user, ctx.userId))
    .innerJoin(PostingTable, eq(PostingTable.agency, AgencyMember.agency));
}
