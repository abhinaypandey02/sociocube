import { UserDB } from "../../db/schema";
import {
  getFileURL,
  getUploadFileURL,
} from "../../../../../../lib/storage/aws-s3";
import { AgencyDB } from "../../../Agency/db/schema";

export async function getPictureUploadURL(user: UserDB | AgencyDB) {
  return {
    uploadURL: await getUploadFileURL(
      ["User", user.id.toString(), "photo"],
      true,
    ),
    url: getFileURL(["User", user.id.toString(), "photo"]),
  };
}
