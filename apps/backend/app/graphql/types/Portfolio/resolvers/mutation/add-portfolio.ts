import { and, count, eq, isNotNull, isNull } from "drizzle-orm";
import { Field, InputType } from "type-graphql";
import { IsUrl, MaxLength } from "class-validator";
import {
  MAX_CAMPAIGNS,
  PORTFOLIO_CAPTION_MAX_LENGTH,
} from "commons/constraints";
import { v4 } from "uuid";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { PortfolioTable } from "../../db/schema";
import GQLError from "../../../../constants/errors";
import { AgencyMember } from "../../../Agency/db/schema";
import { instagramRapidAPI } from "../../../../../../lib/rapidapi/instagram";
import {
  getFileURL,
  getUploadFileURL,
  uploadImage,
} from "../../../../../../lib/storage/aws-s3";

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
  @Field(() => Number, { nullable: true })
  agency: number | null;
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
  if (args.agency && !forReview) {
    const [user] = await db
      .select()
      .from(AgencyMember)
      .where(
        and(
          eq(AgencyMember.user, ctx.userId),
          eq(AgencyMember.agency, args.agency),
        ),
      );
    if (!user) throw GQLError(403, "You dont have permission for this agency");
  }
  if (!forReview) {
    const [portfolioCount] = await db
      .select({ count: count(PortfolioTable.id) })
      .from(PortfolioTable)
      .where(
        and(
          args.agency
            ? eq(PortfolioTable.agency, args.agency)
            : eq(PortfolioTable.user, ctx.userId),
          args.agency
            ? isNull(PortfolioTable.user)
            : isNull(PortfolioTable.agency),
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
      user: args.agency && !forReview ? undefined : ctx.userId,
      agency: args.agency,
    })
    .returning({ id: PortfolioTable.id });
  return portfolio?.id;
}
