import { eq, getTableColumns, or } from "drizzle-orm";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { ConversationTable } from "../../db/schema";
import { ConversationGQL } from "../../type";
import { AgencyMember } from "../../../Agency/db/schema";

export async function handleGetChats(
  ctx: AuthorizedContext,
): Promise<ConversationGQL[]> {
  return db
    .select(getTableColumns(ConversationTable))
    .from(ConversationTable)
    .innerJoin(AgencyMember, eq(AgencyMember.agency, ConversationTable.agency))
    .where(
      or(
        eq(AgencyMember.user, ctx.userId),
        eq(ConversationTable.user, ctx.userId),
      ),
    );
}
