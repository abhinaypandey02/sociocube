import { Field, InputType } from "type-graphql";
import { IsUrl } from "class-validator";
import { Context } from "../../../../../context";
import { getCurrentUser } from "../../../utils";

@InputType("UpdateBuyerBasicDetailsArgs")
export class UpdateBuyerBasicDetailsArgs {
  @Field()
  companyName: string;
  @Field()
  name: string;
  @IsUrl()
  @Field({ nullable: true })
  imageURL: string;
}
export async function handleUpdateOnboardingBuyerBasicDetails(
  args: UpdateBuyerBasicDetailsArgs,
  ctx: Context,
) {
  return getCurrentUser(ctx);
}
