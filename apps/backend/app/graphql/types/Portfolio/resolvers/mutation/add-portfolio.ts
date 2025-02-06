import { count, eq } from "drizzle-orm";
import { Field, InputType } from "type-graphql";
import { IsUrl, MaxLength } from "class-validator";
import { PORTFOLIO_CAPTION_MAX_LENGTH } from "commons/constraints";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { PortfolioTable } from "../../db/schema";
import GQLError from "../../../../constants/errors";

@InputType()
export class AddPortfolioArgs {
  @Field()
  imageURL: string;
  @Field(() => String, { nullable: true })
  @MaxLength(PORTFOLIO_CAPTION_MAX_LENGTH)
  caption: string | null;
  @Field(() => String, { nullable: true })
  @IsUrl(undefined, { message: "Invalid URL" })
  link: string | null;
}

export async function addPortfolio(
  ctx: AuthorizedContext,
  args: AddPortfolioArgs,
) {
  const [portfolioCount] = await db
    .select({ count: count(PortfolioTable.id) })
    .from(PortfolioTable)
    .where(eq(PortfolioTable.user, ctx.userId));
  if (!portfolioCount) throw GQLError(500, "Internal error! Please try again!");
  if (portfolioCount.count >= 6)
    throw GQLError(400, "Maximum no. of postings reached");
  await db.insert(PortfolioTable).values({
    imageURL: args.imageURL,
    caption: args.caption,
    link: args.link,
    user: ctx.userId,
  });
  return true;
}
