import { and, count, eq, isNull } from "drizzle-orm";
import { Field, InputType } from "type-graphql";
import { IsUrl, MaxLength } from "class-validator";
import { PORTFOLIO_CAPTION_MAX_LENGTH } from "commons/constraints";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { PortfolioTable } from "../../db/schema";
import GQLError from "../../../../constants/errors";
import { AgencyMember } from "../../../Agency/db/schema";

@InputType("AddPortfolioLinkArgs")
export class AddPortfolioLinkArgs {
  @Field(() => String)
  @MaxLength(PORTFOLIO_CAPTION_MAX_LENGTH)
  caption: string;
  @Field(() => String)
  @IsUrl(undefined, { message: "Invalid URL" })
  link: string;
  @Field(() => Number, { nullable: true })
  agency: number | null;
}

export async function addPortfolioLink(
  ctx: AuthorizedContext,
  args: AddPortfolioLinkArgs,
) {
  if (args.agency) {
    const [user] = await db
      .select()
      .from(AgencyMember)
      .where(
        and(
          eq(AgencyMember.user, ctx.userId),
          eq(AgencyMember.agency, args.agency),
        ),
      );
    if (!user) throw GQLError(403, "You dont have permission for this agency");
  }
  const [portfolioCount] = await db
    .select({ count: count(PortfolioTable.id) })
    .from(PortfolioTable)
    .where(
      and(
        args.agency
          ? eq(PortfolioTable.agency, args.agency)
          : eq(PortfolioTable.user, ctx.userId),
        isNull(PortfolioTable.imageURL),
      ),
    );
  if (!portfolioCount) throw GQLError(500, "Internal error! Please try again!");
  if (portfolioCount.count >= 6)
    throw GQLError(400, "Maximum no. of links created");
  await db.insert(PortfolioTable).values({
    caption: args.caption,
    link: args.link,
    user: args.agency ? undefined : ctx.userId,
    agency: args.agency,
  });
  return true;
}
