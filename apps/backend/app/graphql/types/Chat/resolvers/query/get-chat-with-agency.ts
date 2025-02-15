import { and, eq, getTableColumns } from "drizzle-orm";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { ConversationDB, ConversationTable } from "../../db/schema";
import { AgencyTable } from "../../../Agency/db/schema";
import GQLError from "../../../../constants/errors";

export async function handleGetChatWithAgency(
  ctx: AuthorizedContext,
  username: string,
): Promise<ConversationDB> {
  const [agency] = await db
    .select({
      id: AgencyTable.id,
    })
    .from(AgencyTable)
    .where(eq(AgencyTable.username, username));
  if (!agency?.id) throw GQLError(404, "Username does not exist");
  const [conversation] = await db
    .select(getTableColumns(ConversationTable))
    .from(ConversationTable)
    .where(
      and(
        eq(ConversationTable.agency, agency.id),
        eq(ConversationTable.user, ctx.userId),
      ),
    );

  return (
    conversation || {
      id: -1,
      hasRead: true,
      user: ctx.userId,
      agency: agency.id,
      createdAt: new Date(),
    }
  );
}
