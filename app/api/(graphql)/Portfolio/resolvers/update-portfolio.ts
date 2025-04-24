import type { AuthorizedContext } from "@backend/lib/auth/context";
import { db } from "@backend/lib/db";
import { waitUntil } from "@vercel/functions";
import { IsUrl, MaxLength } from "class-validator";
import { and, eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { Field, InputType } from "type-graphql";

import { PORTFOLIO_CAPTION_MAX_LENGTH } from "@/constants/constraints";

import { getCurrentUser } from "../../User/utils";
import { PortfolioTable } from "../db";
@InputType("UpdatePortfolioArgs")
export class UpdatePortfolioArgs {
  @Field()
  id: number;
  @Field(() => String, { nullable: true })
  @MaxLength(PORTFOLIO_CAPTION_MAX_LENGTH)
  caption: string | null;
  @Field(() => String, { nullable: true })
  @IsUrl(undefined, { message: "Invalid URL" })
  link: string | null;
}

export async function updatePortfolio(
  ctx: AuthorizedContext,
  args: UpdatePortfolioArgs,
) {
  await db
    .update(PortfolioTable)
    .set({
      caption: args.caption,
      link: args.link,
    })
    .where(
      and(eq(PortfolioTable.id, args.id), eq(PortfolioTable.user, ctx.userId)),
    );
  waitUntil(
    (async () => {
      const user = await getCurrentUser(ctx);
      if (user) revalidateTag(`profile-${user.username}`);
    })(),
  );
  return true;
}
