import type { AuthorizedContext } from "@backend/lib/auth/context";
import { PostingPlatforms } from "@backend/lib/constants/platforms";
import { db } from "@backend/lib/db";
import { IsEnum, MaxLength } from "class-validator";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import type { PostgresError } from "postgres";
import { Field, InputType, Int } from "type-graphql";

import {
  BIO_MAX_LENGTH,
  POSTING_BIO_MAX_LENGTH,
} from "@/constants/constraints";
import { getPostingCacheTag } from "@/constants/revalidate";

import { PostingTable } from "../db";
import { getCleanExternalLink, handleDuplicateLinkError } from "../utils";

@InputType("UpdatePostingInput")
export class UpdatePostingInput {
  @MaxLength(POSTING_BIO_MAX_LENGTH)
  @Field({ nullable: true })
  description?: string;
  @MaxLength(BIO_MAX_LENGTH, { each: true })
  @Field(() => [String], { nullable: true })
  deliverables: string[] | null;
  @Field(() => String, { nullable: true })
  externalLink: string | null;
  @Field(() => String, { nullable: true })
  extraDetails: string | null;
  @Field(() => Int, { nullable: true })
  price: number | null;
  @Field({ nullable: true })
  barter?: boolean;
  @Field(() => [PostingPlatforms], { nullable: true })
  @IsEnum(PostingPlatforms, { each: true })
  platforms?: PostingPlatforms[];
  @Field({ nullable: true })
  minimumAge: number;
  @Field({ nullable: true })
  maximumAge: number;
  @Field({ nullable: true })
  minimumFollowers: number;
  @Field(() => Int, { nullable: true })
  currencyCountry: number | null;
  @Field(() => [Int], { nullable: true })
  countries: number[] | null;
  @Field(() => [Int], { nullable: true })
  cities: number[] | null;
  @Field(() => [Int], { nullable: true })
  states: number[] | null;
  @Field(() => String, { nullable: true })
  gender: string | null;
}
export async function updatePosting(
  ctx: AuthorizedContext,
  id: number,
  updatedPosting: UpdatePostingInput,
): Promise<boolean> {
  try {
    await db
      .update(PostingTable)
      .set({
        ...updatedPosting,
        externalLink: getCleanExternalLink(updatedPosting.externalLink),
      })
      .where(and(eq(PostingTable.id, id), eq(PostingTable.agency, ctx.userId)));
    revalidateTag(getPostingCacheTag(id));
    return true;
  } catch (e) {
    handleDuplicateLinkError(e as PostgresError);
    throw e;
  }
}
