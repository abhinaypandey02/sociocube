import { Arg, Authorized, FieldResolver, Resolver, Root } from "type-graphql";
import { desc, eq } from "drizzle-orm";
import { ChatGQL, MessageGQL } from "../type";
import { db } from "../../../../../lib/db";
import { ConversationMessageTable } from "../db/schema";
import { UserGQL } from "../../User/type";
import { getUser } from "../../User/db/utils";
import { UserTable } from "../../User/db/schema";

const CHAT_PAGE_SIZE = 20;

@Resolver(() => ChatGQL)
export class ChatFieldResolvers {
  @FieldResolver(() => [MessageGQL])
  @Authorized()
  async messages(
    @Root() chat: ChatGQL,
    @Arg("page", { nullable: true }) page?: number,
  ) {
    return db
      .select()
      .from(ConversationMessageTable)
      .where(eq(ConversationMessageTable.conversation, chat.conversation))
      .orderBy(desc(ConversationMessageTable.id))
      .offset((page || 0) * CHAT_PAGE_SIZE)
      .limit(CHAT_PAGE_SIZE);
  }
  @FieldResolver(() => UserGQL)
  @Authorized()
  async with(@Root() chat: ChatGQL) {
    return getUser(eq(UserTable.id, chat.with));
  }
}
