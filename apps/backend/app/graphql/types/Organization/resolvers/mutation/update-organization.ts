import { and, eq } from "drizzle-orm";
import { Field, InputType, Int } from "type-graphql";
import { IsMobilePhone, IsUrl } from "class-validator";
import { db } from "../../../../../../lib/db";
import { Context } from "../../../../context";
import { OrganizationTable } from "../../db/schema";
import GQLError from "../../../../constants/errors";
import {
  handleGetAddress,
  handleUpdateAddress,
} from "../../../Address/db/utils";
import { CreateAddressGQLInput } from "../../../Address/types";

@InputType("UpdateOrganizationInput")
export class UpdateOrganizationInput {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  name?: string;
  @IsUrl()
  @Field({ nullable: true })
  logo?: string;
  @IsMobilePhone()
  @Field({ nullable: true })
  mobile?: string;
  @Field(() => CreateAddressGQLInput, { nullable: true })
  address: CreateAddressGQLInput | null;
}
export async function handleUpdateOrganization(
  data: UpdateOrganizationInput,
  ctx: Context,
): Promise<boolean> {
  if (!ctx.userId) return false;
  const [organization] = await db
    .select()
    .from(OrganizationTable)
    .where(eq(OrganizationTable.admin, ctx.userId));

  if (!organization?.address) return false;

  const address = await handleGetAddress(organization.address);

  if (!address) throw GQLError(404, "Address not found");

  await db
    .update(OrganizationTable)
    .set({
      ...data,
      address: organization.address,
    })
    .where(
      and(
        eq(OrganizationTable.id, data.id),
        eq(OrganizationTable.admin, ctx.userId),
      ),
    );
  if (data.address)
    await handleUpdateAddress(organization.address, data.address);
  return true;
}
