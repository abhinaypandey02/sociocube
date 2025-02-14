import { Query, Resolver } from "type-graphql";
import { AgencyGQL } from "../../type";
import { getFeaturedAgencies } from "./get-featured-agencies";

@Resolver()
export class AgencyQueryResolvers {
  @Query(() => [AgencyGQL])
  async getFeaturedAgencies() {
    return getFeaturedAgencies();
  }
}
