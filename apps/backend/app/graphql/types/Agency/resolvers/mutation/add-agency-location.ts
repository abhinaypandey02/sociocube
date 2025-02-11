import { Field, InputType } from "type-graphql";
import { and, eq } from "drizzle-orm";
import { db } from "../../../../../../lib/db";
import {
  AgencyMember,
  AgencyOnboardingTable,
  AgencyTable,
} from "../../db/schema";
import { AuthorizedContext } from "../../../../context";
import GQLError from "../../../../constants/errors";
import { LocationTable } from "../../../User/db/schema";
import { getPosts } from "../../../User/resolvers/field/instagram";
import { InstagramMediaTable } from "../../../Instagram/db/schema2";
import { InstagramDetails } from "../../../Instagram/db/schema";
import { AgencyMemberType } from "../../../../constants/agency-member-type";

@InputType("AgencyLocationInput")
export class AgencyLocationInput {
  @Field({ nullable: true })
  city?: number;
  @Field()
  state: number;
  @Field()
  country: number;
}
export async function addAgencyLocation(
  ctx: AuthorizedContext,
  args: AgencyLocationInput,
): Promise<string> {
  const [onboardingDetails] = await db
    .select()
    .from(AgencyOnboardingTable)
    .where(and(eq(AgencyOnboardingTable.user, ctx.userId)));
  if (!onboardingDetails?.name)
    throw GQLError(400, "Please complete previous steps first");

  if (
    !onboardingDetails.name ||
    !onboardingDetails.username ||
    !onboardingDetails.photo ||
    !onboardingDetails.contactEmail
  )
    throw GQLError(400, "Please complete previous steps first");
  const [location] = await db.insert(LocationTable).values(args).returning();
  if (!location) throw GQLError(400, "Error in saving location");
  const [agency] = await db
    .insert(AgencyTable)
    .values({
      ...onboardingDetails,
      name: onboardingDetails.name,
      photo: onboardingDetails.photo,
      contactEmail: onboardingDetails.contactEmail,
      username: onboardingDetails.username,
      location: location.id,
      roles: [],
    })
    .returning();
  if (!agency) throw GQLError(400, "Error in creating location");

  await db.insert(AgencyMember).values({
    agency: agency.id,
    user: ctx.userId,
    type: AgencyMemberType.Owner,
  });
  await db
    .delete(AgencyOnboardingTable)
    .where(eq(AgencyOnboardingTable.user, ctx.userId));
  const [instagramDetails] = await db
    .select()
    .from(InstagramDetails)
    .where(eq(InstagramDetails.id, onboardingDetails.instagramDetails));
  if (instagramDetails) {
    const { posts, stats } = await getPosts(
      instagramDetails.followers,
      agency.id,
      instagramDetails.accessToken,
      instagramDetails.username,
      true,
    );
    await db.insert(InstagramMediaTable).values(posts).onConflictDoNothing();
    await db
      .update(InstagramDetails)
      .set(stats)
      .where(eq(InstagramDetails.id, instagramDetails.id));
  }
  return agency.username;
}
