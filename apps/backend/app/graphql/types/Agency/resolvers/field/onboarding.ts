import { FieldResolver, Resolver, Root } from "type-graphql";
import { AgencyOnboardingGQL } from "../../type";
import { FileGQL } from "../../../File/type";
import type { UserDB } from "../../../User/db/schema";
import { getPictureUploadURL } from "../../../User/resolvers/field/picture-upload-url";

@Resolver(() => AgencyOnboardingGQL)
export class AgencyOnboardingFieldResolver {
  @FieldResolver(() => FileGQL)
  async pictureUploadURL(@Root() user: UserDB): Promise<FileGQL> {
    return getPictureUploadURL(user);
  }
}
