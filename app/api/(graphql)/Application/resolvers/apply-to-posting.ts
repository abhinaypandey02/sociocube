import type { AuthorizedContext } from "@backend/lib/auth/context";
import GQLError from "@backend/lib/constants/errors";
import { db } from "@backend/lib/db";
import { sendTemplateEmail } from "@backend/lib/email/send-template";
import { getValidPostings } from "@graphql/Posting/resolvers/get-all-postings";
import { waitUntil } from "@vercel/functions";
import { count, eq } from "drizzle-orm";
import { ArgsType, Field } from "type-graphql";

import { getAge } from "@/constants/age";

import { InstagramDetails } from "../../Instagram/db";
import { CityTable } from "../../Map/db";
import { PostingTable } from "../../Posting/db";
import { LocationTable, UserTable } from "../../User/db";
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
    .innerJoin(LocationTable, eq(LocationTable.id, UserTable.location))
    .innerJoin(CityTable, eq(CityTable.id, LocationTable.city))
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
    gender: user.user.gender ?? "",
    country: user.location.country ?? 0,
    city: user.location.city ?? 0,
    state: user.cities.stateId ?? 0,
  });
  if (!posting) throw GQLError(404, "Posting not found");
  await db.insert(ApplicationTable).values({
    posting: postingID,
    comment,
    external: Boolean(posting.externalLink),
    user: ctx.userId,
    referralEarnings: 0,
  });

  // Send email notification if application count reaches a threshold
  waitUntil(
    (async () => {
      // Count total applications for this posting
      const [result] = await db
        .select({ total: count() })
        .from(ApplicationTable)
        .where(eq(ApplicationTable.posting, postingID));

      const applicationCount = result?.total || 0;

      // Check if count matches thresholds: 1, 5, 8, 16, 32, 64, etc.
      // After 5, it follows powers of 2 starting from 2^3 (8)
      const isThreshold =
        applicationCount === 1 ||
        applicationCount === 5 ||
        (applicationCount >= 8 &&
          (applicationCount & (applicationCount - 1)) === 0); // Power of 2 check

      if (isThreshold) {
        // Get posting details to get the campaign name and owner's email
        const [postingDetails] = await db
          .select({
            title: PostingTable.title,
            agencyId: PostingTable.agency,
          })
          .from(PostingTable)
          .where(eq(PostingTable.id, postingID));

        if (postingDetails) {
          // Get agency/owner's email
          const [agency] = await db
            .select({
              email: UserTable.email,
              emailVerified: UserTable.emailVerified,
            })
            .from(UserTable)
            .where(eq(UserTable.id, postingDetails.agencyId));

          if (
            agency?.email &&
            agency?.emailVerified &&
            !agency.email.includes("sociocube.com")
          ) {
            // Send email notification
            await sendTemplateEmail(agency.email, "ApplicationReceived", {
              campaignName: postingDetails.title,
              campaignID: postingID,
              applicationCount,
            });
          }
        }
      }
    })(),
  );

  return true;
}
