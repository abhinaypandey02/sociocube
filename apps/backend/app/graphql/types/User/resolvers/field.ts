import { FieldResolver, Resolver, Root } from "type-graphql";
import { eq } from "drizzle-orm";
import { UserGQL } from "../type";
import type { UserDB } from "../db/schema";
import { OnboardingDataTable } from "../db/schema";
import { db } from "../../../../../lib/db";
import { FileGQL } from "../../File/type";
import {
  getFileURL,
  getUploadFileURL,
} from "../../../../../lib/storage/aws-s3";

@Resolver(() => UserGQL)
export class UserFieldResolver {
  @FieldResolver(() => UserGQL)
  async onboardingData(@Root() user: UserDB) {
    if (!user.onboardingData) return null;
    const [data] = await db
      .select()
      .from(OnboardingDataTable)
      .where(eq(OnboardingDataTable.id, user.onboardingData));
    return data;
  }
  @FieldResolver(() => FileGQL)
  async pictureUploadURL(@Root() user: UserDB): Promise<FileGQL> {
    return {
      uploadURL: await getUploadFileURL(
        ["User", user.id.toString(), "photo"],
        true,
      ),
      url: getFileURL(["User", user.id.toString(), "photo"]),
    };
  }
}
