import { eq } from "drizzle-orm";
import { getAge } from "commons/age";
import { ArgsType, Field } from "type-graphql";
import { IsEmail, IsNumberString, MaxLength } from "class-validator";
import { REFERRAL_RATES } from "commons/referral";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { ApplicationTable } from "../../db/schema";
import { PostingTable } from "../../../Posting/db/schema";
import GQLError from "../../../../constants/errors";
import { UserTable } from "../../../User/db/schema";
import { InstagramDetails } from "../../../Instagram/db/schema";
import { Roles } from "../../../../constants/roles";
import { AgencyTable } from "../../../Agency/db/schema";
import { getIsOnboarded } from "../../../User/resolvers/field/onboarding-data";

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
  const [result] = await db
    .select()
    .from(PostingTable)
    .where(eq(PostingTable.id, postingID))
    .innerJoin(AgencyTable, eq(PostingTable.agency, AgencyTable.id));
  if (!result) throw GQLError(404, "Posting not found");
  const { posting, agency: owner } = result;
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
  const referralPrice = user.instagram_data.accessToken
    ? REFERRAL_RATES.verified
    : REFERRAL_RATES.others;
  await db.insert(ApplicationTable).values({
    posting: postingID,
    comment,
    email,
    phone,
    external: Boolean(posting.externalLink),
    user: ctx.userId,
    referralEarnings: owner.roles.includes(Roles.ReferralCreator)
      ? referralPrice
      : 0,
  });
  return true;
}
