import { Arg, Query, Resolver } from "type-graphql";
import { getInviteDetails, InviteDetails } from "./invite-details";

@Resolver()
export class InviteQueryResolver {
  @Query(() => InviteDetails)
  getInviteDetails(@Arg("token") token: string) {
    return getInviteDetails(token);
  }
}
