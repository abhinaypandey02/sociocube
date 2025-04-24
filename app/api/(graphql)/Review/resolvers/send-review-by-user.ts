import type { AuthorizedContext } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { IsUrl, MaxLength, Min } from "class-validator";
import { and, eq, gt, isNull } from "drizzle-orm";
import { Field, InputType } from "type-graphql";

import { PORTFOLIO_CAPTION_MAX_LENGTH } from "@/constants/constraints";

import { PostingTable } from "../../Posting/db";
import { UserTable } from "../../User/db";
import { getCurrentUser } from "../../User/utils";
import { ReviewTable } from "../db";
import { getReviewDeadline } from "../utils";

@InputType("SendReviewByUserArgs")
export class SendReviewByUserArgs {
  @Field()
  @Min(1)
  agencyRating: number;
  @Field({ nullable: true })
  agencyFeedback: string;
  @Field(() => String, { nullable: true })
  @MaxLength(PORTFOLIO_CAPTION_MAX_LENGTH)
  caption: string | null;
  @Field(() => String, { nullable: true })
  @IsUrl(undefined, { message: "Invalid URL" })
  link: string | null;
  @Field()
  posting: number;
}

export async function sendReviewByUser(
  ctx: AuthorizedContext,
  args: SendReviewByUserArgs,
) {
  const [posting] = await db
    .select()
    .from(PostingTable)
    .where(eq(PostingTable.id, args.posting))
    .innerJoin(UserTable, eq(UserTable.id, PostingTable.agency));
  if (!posting) return null;
  await db
    .update(ReviewTable)
    .set({
      agencyRating: args.agencyRating,
      agencyFeedback: args.agencyFeedback,
    })
    .where(
      and(
        eq(ReviewTable.posting, args.posting),
        eq(ReviewTable.user, ctx.userId),
        isNull(ReviewTable.agencyRating),
        gt(ReviewTable.createdAt, getReviewDeadline()),
      ),
    );

  void getCurrentUser(ctx)?.then((user) => {
    if (user)
      void fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/revalidate-profile?username=${posting.user.username},${user.username}`,
      );
  });
  return true;
}
