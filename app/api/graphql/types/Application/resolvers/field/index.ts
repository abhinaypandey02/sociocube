import { db } from "@backend/lib/db";
import { eq } from "drizzle-orm";
import { FieldResolver, Resolver, Root } from "type-graphql";

import { PostingTable } from "../../../Posting/db/schema";
import { PostingGQL } from "../../../Posting/type";
import type { UserDB } from "../../../User/db/schema";
import { UserGQL } from "../../../User/type";
import { getCurrentUser } from "../../../User/utils";
import type { ApplicationDB } from "../../db/schema";
import { ApplicationGQL } from "../../type";

@Resolver(() => ApplicationGQL)
export class ApplicationFieldResolvers {
  @FieldResolver(() => UserGQL, { nullable: true })
  async user(@Root() app: ApplicationDB): Promise<UserDB | undefined | null> {
    return getCurrentUser({
      userId: app.user,
    });
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
