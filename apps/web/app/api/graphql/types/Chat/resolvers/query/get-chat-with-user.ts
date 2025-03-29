import { and, eq, getTableColumns } from "drizzle-orm";
import type { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../../lib/db";
import type { ConversationDB } from "../../db/schema";
import { ConversationTable } from "../../db/schema";
import { UserTable } from "../../../User/db/schema";
import GQLError from "../../../../constants/errors";

export async function handleGetChatWithUser(
  ctx: AuthorizedContext,
  username: string,
): Promise<ConversationDB> {
  const [user] = await db
    .select({
      id: UserTable.id,
    })
    .from(UserTable)
    .where(eq(UserTable.username, username));
  if (!user?.id) throw GQLError(404, "Username does not exist");
  const [conversation] = await db
    .select(getTableColumns(ConversationTable))
    .from(ConversationTable)
    .where(
      and(
        eq(ConversationTable.user, user.id),
        eq(ConversationTable.agency, ctx.userId),
      ),
    );

  return (
    conversation || {
      user: user.id,
      agency: -1,
      id: -1,
      hasRead: false,
      createdAt: new Date(),
    }
  );
}
