import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { waitUntil } from "@vercel/functions";
import { IsUrl, MaxLength } from "class-validator";
import { and, count, eq, isNull } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { Field, InputType } from "type-graphql";

import { PORTFOLIO_CAPTION_MAX_LENGTH } from "@/constants/constraints";

import { getCurrentUser } from "../../User/utils";
import { PortfolioTable } from "../db";

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
  waitUntil(
    (async () => {
      const user = await getCurrentUser(ctx);
      if (user) revalidateTag(`profile-${user.username}`);
    })(),
  );
  return true;
}
