import { Field, InputType, Int } from "type-graphql";
import { IsEnum, MaxLength } from "class-validator";
import { and, eq } from "drizzle-orm";
import { BIO_MAX_LENGTH, POSTING_BIO_MAX_LENGTH } from "commons/constraints";
import { PostgresError } from "postgres";
import { db } from "../../../../../../lib/db";
import { PostingTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";
import { PostingPlatforms } from "../../../../constants/platforms";
import { getCleanExternalLink, handleDuplicateLinkError } from "../../utils";
// import { InstagramDetails } from "../../../Instagram/db/schema";
// import { UserTable } from "../../../User/db/schema";
// import GQLError from "../../../../constants/errors";

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
  // const [user] = await db
  //   .select({ token: InstagramDetails.accessToken })
  //   .from(UserTable)
  //   .where(eq(UserTable.id, ctx.userId))
  //   .innerJoin(
  //     InstagramDetails,
  //     eq(InstagramDetails.id, UserTable.instagramDetails),
  //   );
  // if (!user?.token)
  //   throw GQLError(
  //     403,
  //     "Only verified users can update a posting. Please verify yourself from the menu.",
  //   );
  try {
    await db
      .update(PostingTable)
      .set({
        ...updatedPosting,
        externalLink: getCleanExternalLink(updatedPosting.externalLink),
      })
      .where(and(eq(PostingTable.user, ctx.userId), eq(PostingTable.id, id)));
    return true;
  } catch (e) {
    handleDuplicateLinkError(e as PostgresError);
    throw e;
  }
}
