import { db } from "@backend/lib/db";
import { instagramRapidAPI } from "@backend/lib/rapidapi/instagram";
import {
  getFileURL,
  getUploadFileURL,
  uploadImage,
} from "@backend/lib/storage/aws-s3";
import type { AuthorizedContext } from "@graphql/context";
import { IsUrl, MaxLength } from "class-validator";
import { and, count, eq, isNotNull, isNull } from "drizzle-orm";
import { Field, InputType } from "type-graphql";
import { v4 } from "uuid";

import {
  MAX_CAMPAIGNS,
  PORTFOLIO_CAPTION_MAX_LENGTH,
} from "@/constants/constraints";

import GQLError from "../../../../constants/errors";
import { PortfolioTable } from "../../db/schema";

@InputType("AddPortfolioArgs")
export class AddPortfolioArgs {
  @Field()
  imageURL: string;
  @Field(() => String, { nullable: true })
  @MaxLength(PORTFOLIO_CAPTION_MAX_LENGTH)
  caption: string | null;
  @Field(() => String, { nullable: true })
  @IsUrl(undefined, { message: "Invalid URL" })
  link: string | null;
}

async function getInstagramMediaURL(url: string, userId: string) {
  const res = (await instagramRapidAPI(
    `post_info?code_or_id_or_url=${encodeURIComponent(url)}`,
  )) as {
    data: {
      video_url?: string;
      thumbnail_url: string;
    };
  };
  if (res.data.video_url) {
    const key = ["User", userId, "portfolio", v4()];
    const stream = await fetch("https://strapi.cbtproxy.com:8080/vouchers", {
      method: "POST",
      body: JSON.stringify({
        url: res.data.video_url,
        uploadURL: await getUploadFileURL(key, true),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      console.error(err);
    });
    if (stream) {
      return getFileURL(key);
    }
  } else if (res.data.thumbnail_url) {
    return uploadImage(res.data.thumbnail_url, [
      "User",
      userId,
      "portfolio",
      v4(),
    ]);
  }
}

export async function addPortfolio(
  ctx: AuthorizedContext,
  args: AddPortfolioArgs,
  forReview?: true,
) {
  if (!forReview) {
    const [portfolioCount] = await db
      .select({ count: count(PortfolioTable.id) })
      .from(PortfolioTable)
      .where(
        and(
          eq(PortfolioTable.user, ctx.userId),
          isNull(PortfolioTable.agency),
          isNotNull(PortfolioTable.imageURL),
        ),
      );
    if (!portfolioCount)
      throw GQLError(500, "Internal error! Please try again!");

    if (portfolioCount.count >= MAX_CAMPAIGNS)
      throw GQLError(400, "Maximum no. of campaigns reached");
  }
  const isInstagramMediaURL = args.imageURL.includes("instagram.com");
  if (isInstagramMediaURL) {
    args.link = args.imageURL;
    const newImageURL = await getInstagramMediaURL(
      args.imageURL,
      ctx.userId.toString(),
    );
    if (!newImageURL)
      throw GQLError(500, "Unable to parse the URL. Please add video directly");
    args.imageURL = newImageURL;
  }

  const [portfolio] = await db
    .insert(PortfolioTable)
    .values({
      imageURL: args.imageURL,
      caption: args.caption,
      link: args.link,
      user: ctx.userId,
    })
    .returning({ id: PortfolioTable.id });
  return portfolio?.id;
}
