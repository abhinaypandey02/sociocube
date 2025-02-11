import { Field, InputType } from "type-graphql";
import { Matches, MaxLength } from "class-validator";
import { USERNAME_MAX_LENGTH } from "commons/constraints";
import { and, eq } from "drizzle-orm";
import { USERNAME_REGEX } from "commons/regex";
import { db } from "../../../../../../lib/db";
import { AgencyOnboardingTable } from "../../db/schema";
import { AuthorizedContext } from "../../../../context";
import GQLError from "../../../../constants/errors";
import { handleIsUsernameAvailable } from "../../../User/resolvers/queries/is-username-available";

@InputType("AgencyUsernameInput")
export class AgencyUsernameInput {
  @Field()
  @Matches(USERNAME_REGEX)
  @MaxLength(USERNAME_MAX_LENGTH)
  username: string;
}

export async function addAgencyUsername(
  ctx: AuthorizedContext,
  { username: usernameRaw }: AgencyUsernameInput,
): Promise<boolean> {
  const username = usernameRaw.toLowerCase();

  const [onboardingDetails] = await db
    .select()
    .from(AgencyOnboardingTable)
    .where(and(eq(AgencyOnboardingTable.user, ctx.userId)));
  if (!onboardingDetails?.name)
    throw GQLError(400, "Please complete previous steps first");

  if (!(await handleIsUsernameAvailable(username)))
    throw GQLError(400, "Username taken");
  await db
    .update(AgencyOnboardingTable)
    .set({
      username,
    })
    .where(eq(AgencyOnboardingTable.id, onboardingDetails.id));
  return true;
}
