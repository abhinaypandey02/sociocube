import { eq } from "drizzle-orm";
import { Field, InputType } from "type-graphql";
import { Min } from "class-validator";
import type { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../lib/db";
import GQLError from "../../../../constants/errors";
import {
  ApplicationStatus,
  ApplicationTable,
} from "../../../Application/db/schema";
import { checkPermission } from "../../../Posting/utils";
import { ReviewTable } from "../../db/schema";

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
  await db.insert(ReviewTable).values({
    user: application.user,
    userRating: args.userRating,
    userFeedback: args.userFeedback,
    agency: ctx.userId,
    posting: application.posting,
  });
  await db
    .update(ApplicationTable)
    .set({
      status: ApplicationStatus.Completed,
    })
    .where(eq(ApplicationTable.id, args.application));
  return true;
}
