import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { IsEmail, IsNumberString, MaxLength } from "class-validator";
import { eq } from "drizzle-orm";
import { ArgsType, Field } from "type-graphql";

import { getAge } from "@/constants/age";

import { InstagramDetails } from "../../Instagram/db";
import { PostingTable } from "../../Posting/db";
import { UserTable } from "../../User/db";
import { getIsOnboarded } from "../../User/resolvers/onboarding-data";
import { ApplicationTable } from "../db";

@ArgsType()
export class ApplyToPostingArgs {
  @Field()
  postingID: number;
  @Field(() => String, { nullable: true })
  comment: string | null;
  @Field()
  @IsEmail()
  email: string;
  @Field(() => String, { nullable: true })
  @MaxLength(15)
  @IsNumberString()
  phone: string | null;
}

export async function applyToPosting(
  ctx: AuthorizedContext,
  postingID: number,
  email: string,
  comment: string | null,
  phone: string | null,
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
  const [posting] = await db
    .select()
    .from(PostingTable)
    .where(eq(PostingTable.id, postingID));
  if (!posting) throw GQLError(404, "Posting not found");
  if (!posting.open) throw GQLError(404, "Posting closed");
  if (
    posting.minimumFollowers &&
    user.instagram_data.followers < posting.minimumFollowers
  )
    throw GQLError(400, "Not enough followers");
  if (posting.minimumAge || posting.maximumAge) {
    if (!user.user.dob) throw GQLError(400, "No Date of birth added by user");
    const age = getAge(new Date(user.user.dob));
    if (posting.minimumAge && age < posting.minimumAge)
      throw GQLError(400, "Not in age range");
    if (posting.maximumAge && age > posting.maximumAge)
      throw GQLError(400, "Not in age range");
  }
  await db
    .update(UserTable)
    .set({ contactEmail: email, phone: phone || undefined })
    .where(eq(UserTable.id, ctx.userId));
  await db.insert(ApplicationTable).values({
    posting: postingID,
    comment,
    email,
    phone,
    external: Boolean(posting.externalLink),
    user: ctx.userId,
    referralEarnings: 0,
  });
  return true;
}
