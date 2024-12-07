import { Field, InputType } from "type-graphql";
import { db } from "../../../../../../lib/db";
import { PostingTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";

@InputType("NewPostingInput")
export class NewPostingInput {
  @Field()
  title: string;
  @Field()
  description: string;
}
export async function createPosting(
  ctx: AuthorizedContext,
  newPosting: NewPostingInput,
): Promise<number | null> {
  const [posting] = await db
    .insert(PostingTable)
    .values({ ...newPosting, user: ctx.userId })
    .returning({ id: PostingTable.id });
  return posting?.id || null;
}
