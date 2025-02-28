import {and, eq, getTableColumns} from "drizzle-orm";
import {db} from "../../../../../../lib/db";
import {AgencyMember, AgencyTable} from "../../db/schema";
import {AuthorizedContext} from "../../../../context";

export async function getCurrentUserAgency(
  ctx: AuthorizedContext,
  username?: string,
) {
  const [agency] = await db
    .select(getTableColumns(AgencyTable))
    .from(AgencyMember)
    .where(and(eq(AgencyMember.user, ctx.userId)))
    .innerJoin(
      AgencyTable,
      and(
        eq(AgencyTable.id, AgencyMember.agency),
        username ? eq(AgencyTable.username, username) : undefined,
      ),
    )
    .limit(1);
  return agency;
}
