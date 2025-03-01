import { Arg, Authorized, Ctx, Query, Resolver } from "type-graphql";
import type { AuthorizedContext } from "../../../../context";
import { InviteDetails, inviteDetails } from "./invite-details";

@Resolver()
export class InviteQueryResolver {
  @Authorized()
  @Query(() => InviteDetails)
  inviteDetails(@Ctx() ctx: AuthorizedContext, @Arg("token") token: string) {
    return inviteDetails(ctx, token);
  }
}
