import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { getValidPostings } from "@graphql/Posting/resolvers/get-all-postings";
import { eq } from "drizzle-orm";
import { ArgsType, Field } from "type-graphql";

import { getAge } from "@/constants/age";

import { InstagramDetails } from "../../Instagram/db";
import { UserTable } from "../../User/db";
import { getIsOnboarded } from "../../User/resolvers/onboarding-data";
import { ApplicationTable } from "../db";

@ArgsType()
export class ApplyToPostingArgs {
  @Field()
  postingID: number;
  @Field(() => String, { nullable: true })
  comment: string | null;
}

export async function applyToPosting(
  ctx: AuthorizedContext,
  postingID: number,
  comment: string | null,
) {
  const [user] = await db
    .select()
    .from(UserTable)
    .where(eq(UserTable.id, ctx.userId))
    .innerJoin(
      InstagramDetails,
      eq(InstagramDetails.id, UserTable.instagramDetails),
    );
  if (!user) throw GQLError(404, "User details not found");
  if (!getIsOnboarded(user.user)) throw GQLError(404, "User not onboarded");
  const age = user.user.dob ? getAge(new Date(user.user.dob)) : 0;
  const [posting] = await getValidPostings({
    userId: ctx.userId,
    age,
    followers: user.instagram_data.followers,
    postingID,
  });
  if (!posting) throw GQLError(404, "Posting not found");
  await db.insert(ApplicationTable).values({
    posting: postingID,
    comment,
    external: Boolean(posting.externalLink),
    user: ctx.userId,
    referralEarnings: 0,
  });
  return true;
}
