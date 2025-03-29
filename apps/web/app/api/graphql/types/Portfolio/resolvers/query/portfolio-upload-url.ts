import { v4 } from "uuid";
import {
  getFileURL,
  getUploadFileURL,
} from "../../../../../../../lib/storage/aws-s3";
import type { AuthorizedContext } from "../../../../context";

export async function getPortfolioUploadURL(ctx: AuthorizedContext) {
  if (!ctx.userId) return null;
  const id = v4();
  return {
    uploadURL: await getUploadFileURL(
      ["User", ctx.userId.toString(), "portfolio", id],
      true,
    ),
    url: getFileURL(["User", ctx.userId.toString(), "portfolio", id]),
  };
}
