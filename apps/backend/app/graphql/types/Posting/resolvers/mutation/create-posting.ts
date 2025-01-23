import { Field, InputType, Int } from "type-graphql";
import { IsEnum, MaxLength } from "class-validator";
import {
  BIO_MAX_LENGTH,
  NAME_MAX_LENGTH,
  POSTING_BIO_MAX_LENGTH,
} from "commons/constraints";
import { db } from "../../../../../../lib/db";
import { PostingTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";
import { PostingPlatforms } from "../../../../constants/platforms";

@InputType("NewPostingInput")
export class NewPostingInput {
  @Field()
  @MaxLength(NAME_MAX_LENGTH * 2)
  title: string;
  @Field()
  @MaxLength(POSTING_BIO_MAX_LENGTH)
  description: string;
  @Field(() => [String], { nullable: true })
  @MaxLength(BIO_MAX_LENGTH, { each: true })
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
