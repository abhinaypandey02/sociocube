import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { Min } from "class-validator";
import { eq } from "drizzle-orm";
import { Field, InputType } from "type-graphql";

import { ApplicationTable } from "../../Application/db";
import { checkPermission } from "../../Posting/utils";
import { ReviewTable } from "../db";

@InputType("SendReviewByAgencyArgs")
export class SendReviewByAgencyArgs {
  @Field()
  @Min(1)
  userRating: number;
  @Field({ nullable: true })
  userFeedback: string;
  @Field()
  application: number;
}

export async function sendReviewByAgency(
  ctx: AuthorizedContext,
  args: SendReviewByAgencyArgs,
) {
  const [application] = await db
    .select()
    .from(ApplicationTable)
    .where(eq(ApplicationTable.id, args.application));
  if (!application) throw GQLError(404, "Application not found");
  if (!(await checkPermission(ctx, application.posting)))
    throw GQLError(404, "Permission missing");
  const [res] = await db
    .insert(ReviewTable)
    .values({
      user: application.user,
      userRating: args.userRating,
      userFeedback: args.userFeedback,
      agency: ctx.userId,
      posting: application.posting,
    })
    .returning();
  if (res)
    await db
      .update(ApplicationTable)
      .set({
        review: res.id,
      })
      .where(eq(ApplicationTable.id, args.application));
  return true;
}
