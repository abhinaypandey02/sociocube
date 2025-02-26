import { and, eq, gt, isNull } from "drizzle-orm";
import { Field, InputType } from "type-graphql";
import { IsUrl, MaxLength, Min } from "class-validator";
import { PORTFOLIO_CAPTION_MAX_LENGTH } from "commons/constraints";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { ReviewTable } from "../../db/schema";
import { getReviewDeadline } from "../../utils";
import { addPortfolio } from "../../../Portfolio/resolvers/mutation/add-portfolio";
import GQLError from "../../../../constants/errors";
import { PostingTable } from "../../../Posting/db/schema";
import { AgencyTable } from "../../../Agency/db/schema";
import { getCurrentUser } from "../../../User/utils";

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
    .innerJoin(AgencyTable, eq(AgencyTable.id, PostingTable.agency));
  if (!posting?.agency) throw GQLError(400, "Invalid posting");

  const portfolio = await addPortfolio(
    ctx,
    {
      imageURL: args.imageURL,
      caption: args.caption,
      link: args.link,
      agency: posting.posting.agency,
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
        `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api/revalidate-profile?username=${posting.agency.username},${user.username}`,
      );
  });
  return true;
}
