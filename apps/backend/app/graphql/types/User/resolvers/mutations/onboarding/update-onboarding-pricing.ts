import { Field, InputType } from "type-graphql";
import { and, eq, isNotNull } from "drizzle-orm";
import { AuthorizedContext } from "../../../../../context";
import { db } from "../../../../../../../lib/db";
import { LocationTable, PricingTable, UserTable } from "../../../db/schema";
import GQLError from "../../../../../constants/errors";

@InputType("OnboardingPriceInput")
export class OnboardingPriceInput {
  @Field()
  starting: number;
}
export async function handleUpdateOnboardingPricing(
  ctx: AuthorizedContext,
  { starting }: OnboardingPriceInput,
) {
  const [res] = await db
    .select()
    .from(UserTable)
    .where(
      and(
        eq(UserTable.id, ctx.userId),
        eq(UserTable.isOnboarded, false),
        isNotNull(UserTable.instagramDetails),
      ),
    )
    .leftJoin(LocationTable, eq(UserTable.location, LocationTable.id));
  if (!res?.location?.city)
    throw GQLError(400, "Please add a city to continue");
  await db.insert(PricingTable).values({ starting, user: ctx.userId });
  return true;
}
