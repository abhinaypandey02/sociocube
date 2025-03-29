import { and, eq, gt, isNull } from "drizzle-orm";
import { Field, InputType } from "type-graphql";
import { IsUrl, MaxLength, Min } from "class-validator";
import { PORTFOLIO_CAPTION_MAX_LENGTH } from "@/constants/constraints";
import type { AuthorizedContext } from "@graphql/context";
import { db } from "@backend/lib/db";
import { ReviewTable } from "../../db/schema";
import { getReviewDeadline } from "../../utils";
import { addPortfolio } from "../../../Portfolio/resolvers/mutation/add-portfolio";
import GQLError from "../../../../constants/errors";
import { PostingTable } from "../../../Posting/db/schema";
import { getCurrentUser } from "../../../User/utils";
import { UserTable } from "../../../User/db/schema";

@InputType("SendReviewByUserArgs")
export class SendReviewByUserArgs {
  @Field()
  @Min(1)
  agencyRating: number;
  @Field({ nullable: true })
  agencyFeedback: string;
  @Field()
  imageURL: string;
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
  const portfolio = await addPortfolio(
    ctx,
    {
      imageURL: args.imageURL,
      caption: args.caption,
      link: args.link,
    },
    true,
  );
  if (!portfolio) throw GQLError(500, "Error saving your work");
  await db
    .update(ReviewTable)
    .set({
      agencyRating: args.agencyRating,
      agencyFeedback: args.agencyFeedback,
      portfolio,
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate-profile?username=${posting.user.username},${user.username}`,
      );
  });
  return true;
}
