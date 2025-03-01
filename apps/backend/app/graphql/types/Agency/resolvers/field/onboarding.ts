import { FieldResolver, Resolver, Root } from "type-graphql";
import { AgencyOnboardingGQL } from "../../type";
import { FileGQL } from "../../../File/type";
import { getPictureUploadURL } from "../../../User/resolvers/field/picture-upload-url";
import type { AgencyMemberDB } from "../../db/schema";

@Resolver(() => AgencyOnboardingGQL)
export class AgencyOnboardingFieldResolver {
  @FieldResolver(() => FileGQL)
  async pictureUploadURL(@Root() user: AgencyMemberDB): Promise<FileGQL> {
    return getPictureUploadURL(user);
  }
}
