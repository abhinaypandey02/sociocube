import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { PostingPlatforms } from "@backend/lib/constants/platforms";
import { db } from "@backend/lib/db";
import { IsEnum, MaxLength } from "class-validator";
import { and, eq, gte } from "drizzle-orm";
import type { PostgresError } from "postgres";
import { Field, InputType, Int } from "type-graphql";

import {
  BIO_MAX_LENGTH,
  NAME_MAX_LENGTH,
  POSTING_BIO_MAX_LENGTH,
} from "@/constants/constraints";

import { PostingTable } from "../db";
import { getCleanExternalLink, handleDuplicateLinkError } from "../utils";

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

const MAXIMUM_POSTINGS_DAY = 1;

export async function createPosting(
  ctx: AuthorizedContext,
  newPosting: NewPostingInput,
  force?: boolean,
): Promise<number | null> {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (!force) {
    const postings = await db
      .select({ createdAt: PostingTable.createdAt })
      .from(PostingTable)
      .where(
        and(
          eq(PostingTable.agency, ctx.userId),
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
  }
  try {
    const [posting] = await db
      .insert(PostingTable)
      .values({
        ...newPosting,
        externalLink: getCleanExternalLink(newPosting.externalLink),
        agency: ctx.userId,
      })
      .returning({ id: PostingTable.id });
    return posting?.id || null;
  } catch (e: unknown) {
    handleDuplicateLinkError(e as PostgresError);
    throw e;
  }
}
