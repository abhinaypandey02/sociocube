import type { AuthorizedContext } from "@backend/lib/auth/context";
import { PostingPlatforms } from "@backend/lib/constants/platforms";
import { db } from "@backend/lib/db";
import { IsEnum, MaxLength } from "class-validator";
import { eq } from "drizzle-orm";
import type { PostgresError } from "postgres";
import { Field, InputType, Int } from "type-graphql";

import {
  BIO_MAX_LENGTH,
  POSTING_BIO_MAX_LENGTH,
} from "@/constants/constraints";

import { PostingTable } from "../db";
import {
  checkPermission,
  getCleanExternalLink,
  handleDuplicateLinkError,
} from "../utils";

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
  await checkPermission(ctx, id);

  try {
    await db
      .update(PostingTable)
      .set({
        ...updatedPosting,
        externalLink: getCleanExternalLink(updatedPosting.externalLink),
      })
      .where(eq(PostingTable.id, id));
    return true;
  } catch (e) {
    handleDuplicateLinkError(e as PostgresError);
    throw e;
  }
}
