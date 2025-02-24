import { and, eq, gt, isNull } from "drizzle-orm";
import { Field, InputType } from "type-graphql";
import { Min } from "class-validator";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { ReviewTable } from "../../db/schema";
import { getReviewDeadline } from "../../utils";

@InputType("SendReviewByUserArgs")
export class SendReviewByUserArgs {
  @Field()
  @Min(1)
  agencyRating: number;
  @Field({ nullable: true })
  agencyFeedback: string;
  @Field({ nullable: true })
  portfolio: number;
  @Field()
  posting: number;
}

export async function sendReviewByUser(
  ctx: AuthorizedContext,
  args: SendReviewByUserArgs,
) {
  const res = await db
    .update(ReviewTable)
    .set({
      agencyRating: args.agencyRating,
      agencyFeedback: args.agencyFeedback,
      portfolio: args.portfolio,
    })
    .where(
      and(
        eq(ReviewTable.posting, args.posting),
        eq(ReviewTable.user, ctx.userId),
        isNull(ReviewTable.agencyRating),
        gt(ReviewTable.createdAt, getReviewDeadline()),
      ),
    );
  return res.length === 1;
}
