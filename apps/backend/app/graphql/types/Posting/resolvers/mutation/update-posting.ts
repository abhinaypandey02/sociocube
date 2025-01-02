import { Field, InputType, Int } from "type-graphql";
import { IsEnum, MaxLength } from "class-validator";
import { and, eq } from "drizzle-orm";
import { BIO_MAX_LENGTH, POSTING_BIO_MAX_LENGTH } from "commons/constraints";
import { db } from "../../../../../../lib/db";
import { PostingTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";
import { PostingPlatforms } from "../../../../constants/platforms";

@InputType("UpdatePostingInput")
export class UpdatePostingInput {
  @MaxLength(POSTING_BIO_MAX_LENGTH)
  @Field()
  description: string;
  @MaxLength(BIO_MAX_LENGTH, { each: true })
  @Field(() => [String], { nullable: true })
  deliverables: string[] | null;
  @Field(() => String, { nullable: true })
  externalLink: string | null;
  @Field(() => String, { nullable: true })
  extraDetails: string | null;
  @Field(() => Int, { nullable: true })
  price: number | null;
  @Field()
  barter: boolean;
  @Field(() => [PostingPlatforms])
  @IsEnum(PostingPlatforms, { each: true })
  platforms: PostingPlatforms[];
  @Field({ nullable: true })
  minimumAge: number;
  @Field({ nullable: true })
  maximumAge: number;
  @Field({ nullable: true })
  minimumFollowers: number;
  @Field(() => Int, { nullable: true })
  currencyCountry: number | null;
}
export async function updatePosting(
  ctx: AuthorizedContext,
  id: number,
  updatedPosting: UpdatePostingInput,
): Promise<boolean> {
  await db
    .update(PostingTable)
    .set(updatedPosting)
    .where(and(eq(PostingTable.user, ctx.userId), eq(PostingTable.id, id)));
  return true;
}
