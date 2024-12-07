import { FieldResolver, Resolver, Root } from "type-graphql";
import { UserGQL } from "../../../User/type";
import { PostingGQL } from "../../type";
import type { PostingDB } from "../../db/schema";
import { getCurrentUser } from "../../../User/utils";
import { UserDB } from "../../../User/db/schema";

@Resolver(() => PostingGQL)
export class PostingFieldResolvers {
  @FieldResolver(() => UserGQL, { nullable: true })
  async user(@Root() posting: PostingDB): Promise<UserDB | undefined | null> {
    return getCurrentUser({
      userId: posting.user,
    });
  }
}
