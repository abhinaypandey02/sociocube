import { and, eq, getTableColumns } from "drizzle-orm";
import type { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../lib/db";
import type { ConversationDB } from "../../db/schema";
import { ConversationTable } from "../../db/schema";
import GQLError from "../../../../constants/errors";
import { UserTable } from "../../../User/db/schema";

export async function handleGetChatWithAgency(
  ctx: AuthorizedContext,
  username: string,
): Promise<ConversationDB> {
  const [agency] = await db
    .select({
      id: UserTable.id,
    })
    .from(UserTable)
    .where(eq(UserTable.username, username));
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
