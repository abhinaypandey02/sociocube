import { FieldResolver, Resolver, Root } from "type-graphql";
import { eq } from "drizzle-orm";
import { UserGQL } from "../../../User/type";
import { ApplicationGQL } from "../../type";
import type { ApplicationDB } from "../../db/schema";
import { getCurrentUser } from "../../../User/utils";
import { UserDB } from "../../../User/db/schema";
import { db } from "../../../../../../lib/db";
import { PostingGQL } from "../../../Posting/type";
import { PostingTable } from "../../../Posting/db/schema";

@Resolver(() => ApplicationGQL)
export class ApplicationFieldResolvers {
  @FieldResolver(() => UserGQL, { nullable: true })
  async user(@Root() app: ApplicationDB): Promise<UserDB | undefined | null> {
    const user = await getCurrentUser({
      userId: app.user,
    });
    if (!user?.isOnboarded) return null;
    return user;
  }
  @FieldResolver(() => PostingGQL, { nullable: true })
  async posting(
    @Root() app: ApplicationDB,
  ): Promise<PostingGQL | undefined | null> {
    const [posting] = await db
      .select()
      .from(PostingTable)
      .where(eq(PostingTable.id, app.posting));
    return posting;
  }
}
