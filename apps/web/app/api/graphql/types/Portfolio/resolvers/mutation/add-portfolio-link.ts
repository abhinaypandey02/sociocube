import { and, count, eq, isNull } from "drizzle-orm";
import { Field, InputType } from "type-graphql";
import { IsUrl, MaxLength } from "class-validator";
import { PORTFOLIO_CAPTION_MAX_LENGTH } from "commons/constraints";
import type { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../lib/db";
import { PortfolioTable } from "../../db/schema";
import GQLError from "../../../../constants/errors";

@InputType("AddPortfolioLinkArgs")
export class AddPortfolioLinkArgs {
  @Field(() => String)
  @MaxLength(PORTFOLIO_CAPTION_MAX_LENGTH)
  caption: string;
  @Field(() => String)
  @IsUrl(undefined, { message: "Invalid URL" })
  link: string;
}

export async function addPortfolioLink(
  ctx: AuthorizedContext,
  args: AddPortfolioLinkArgs,
) {
  const [portfolioCount] = await db
    .select({ count: count(PortfolioTable.id) })
    .from(PortfolioTable)
    .where(
      and(eq(PortfolioTable.user, ctx.userId), isNull(PortfolioTable.imageURL)),
    );
  if (!portfolioCount) throw GQLError(500, "Internal error! Please try again!");
  if (portfolioCount.count >= 6)
    throw GQLError(400, "Maximum no. of links created");
  await db.insert(PortfolioTable).values({
    caption: args.caption,
    link: args.link,
    user: ctx.userId,
  });
  return true;
}
