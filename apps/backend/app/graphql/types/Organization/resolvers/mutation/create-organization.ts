import { Field, InputType } from "type-graphql";
import { IsMobilePhone, IsUrl } from "class-validator";
import { Context } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { OrganizationTable } from "../../db/schema";
import { handleCreateAddress } from "../../../Address/db/utils";
import { CreateAddressGQLInput } from "../../../Address/types";
import GQLError from "../../../../constants/errors";

@InputType("CreateOrganizationInput")
export class CreateOrganizationInput {
  @Field()
  name: string;
  @IsUrl()
  @Field({ nullable: true })
  logo?: string;
  @IsMobilePhone()
  @Field()
  mobile: string;
  @Field(() => CreateAddressGQLInput)
  address: CreateAddressGQLInput;
}

export async function handleCreateOrganization(
  data: CreateOrganizationInput,
  ctx: Context,
): Promise<number | null> {
  if (!ctx.userId) return null;
  const address = await handleCreateAddress(data.address);
  if (!address) throw GQLError(404, "Address not found");
  const [organization] = await db
    .insert(OrganizationTable)
    .values({
      name: data.name,
      mobile: data.mobile,
      admin: ctx.userId,
      address: address.id,
      logo: data.logo,
    })
    .returning();
  return organization?.id || null;
}
