import { Arg, Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { desc, eq } from "drizzle-orm";
import { ConversationGQL, MessageGQL } from "../type";
import { db } from "../../../../lib/db";
import { UserGQL } from "../../User/type";
import { getUser } from "../../User/db/utils";
import { UserTable } from "../../User/db/schema";
import { ConversationMessageTable } from "../db/schema";
import type { ConversationDB } from "../db/schema";
import type { AuthorizedContext } from "../../../context";

const CHAT_PAGE_SIZE = 20;

@Resolver(() => ConversationGQL)
export class ChatFieldResolvers {
  @FieldResolver(() => [MessageGQL])
  async messages(
    @Root() chat: ConversationGQL,
    @Arg("page", { nullable: true }) page?: number,
  ) {
    return db
      .select()
      .from(ConversationMessageTable)
      .where(eq(ConversationMessageTable.conversation, chat.id))
      .orderBy(desc(ConversationMessageTable.id))
      .offset((page || 0) * CHAT_PAGE_SIZE)
      .limit(CHAT_PAGE_SIZE);
  }
  @FieldResolver(() => String, { nullable: true })
  async preview(@Root() chat: ConversationDB) {
    const [latestMessage] = await db
      .select()
      .from(ConversationMessageTable)
      .where(eq(ConversationMessageTable.conversation, chat.id));
    return latestMessage?.body;
  }
  @FieldResolver(() => UserGQL, { nullable: true })
  async user(@Ctx("ctx") ctx: AuthorizedContext, @Root() chat: ConversationDB) {
    if (chat.user === ctx.userId) return null;
    return getUser(eq(UserTable.id, chat.user));
  }
  @FieldResolver(() => UserGQL, { nullable: true })
  async agency(
    @Ctx("ctx") ctx: AuthorizedContext,
    @Root() chat: ConversationDB,
  ) {
    if (chat.agency === ctx.userId) return null;
    return getUser(eq(UserTable.id, chat.agency));
  }
}
