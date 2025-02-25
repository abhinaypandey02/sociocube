import { Field, InputType, Int } from "type-graphql";
import { IsEnum, MaxLength } from "class-validator";
import {
  BIO_MAX_LENGTH,
  NAME_MAX_LENGTH,
  POSTING_BIO_MAX_LENGTH,
} from "commons/constraints";
import { and, eq, gte } from "drizzle-orm";
import { PostgresError } from "postgres";
import { db } from "../../../../../../lib/db";
import { PostingTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";
import { PostingPlatforms } from "../../../../constants/platforms";
import { getCleanExternalLink, handleDuplicateLinkError } from "../../utils";
import GQLError from "../../../../constants/errors";
import { AgencyMember } from "../../../Agency/db/schema";

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

const MAXIMUM_POSTINGS_DAY = 40;

export async function createPosting(
  ctx: AuthorizedContext,
  agency: number,
  newPosting: NewPostingInput,
): Promise<number | null> {
  const [user] = await db
    .select()
    .from(AgencyMember)
    .where(
      and(eq(AgencyMember.user, ctx.userId), eq(AgencyMember.agency, agency)),
    );
  if (!user) throw GQLError(403, "You dont have permission for this agency");

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const postings = await db
    .select({ createdAt: PostingTable.createdAt })
    .from(PostingTable)
    .where(
      and(
        eq(PostingTable.agency, agency),
        gte(PostingTable.createdAt, yesterday),
      ),
    );
  if (postings.length > MAXIMUM_POSTINGS_DAY) {
    const nextDate = postings.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )[MAXIMUM_POSTINGS_DAY - 1]?.createdAt;
    if (nextDate) nextDate.setHours(nextDate.getHours() + 24);
    const diff = Math.round(
      ((nextDate?.getTime() || 0) - new Date().getTime()) / (1000 * 60 * 60),
    );
    throw GQLError(
      400,
      `Only ${MAXIMUM_POSTINGS_DAY} allowed in 24 hours. You can create new posting after ${diff} hours.`,
    );
  }
  try {
    const [posting] = await db
      .insert(PostingTable)
      .values({
        ...newPosting,
        externalLink: getCleanExternalLink(newPosting.externalLink),
        agency,
      })
      .returning({ id: PostingTable.id });
    return posting?.id || null;
  } catch (e: unknown) {
    handleDuplicateLinkError(e as PostgresError);
    throw e;
  }
}
