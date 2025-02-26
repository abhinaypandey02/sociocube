import { Readable } from "node:stream";
import { and, count, eq, isNotNull, isNull } from "drizzle-orm";
import { Field, InputType } from "type-graphql";
import { IsUrl, MaxLength } from "class-validator";
import {
  MAX_CAMPAIGNS,
  PORTFOLIO_CAPTION_MAX_LENGTH,
} from "commons/constraints";
import ffmpeg from "fluent-ffmpeg";
import { v4 } from "uuid";
import { MAXIMUM_FILE_SIZE } from "commons/file";
import { AuthorizedContext } from "../../../../context";
import { db } from "../../../../../../lib/db";
import { PortfolioTable } from "../../db/schema";
import GQLError from "../../../../constants/errors";
import { AgencyMember } from "../../../Agency/db/schema";
import { instagramRapidAPI } from "../../../../../../lib/rapidapi/instagram";
import { uploadImage } from "../../../../../../lib/storage/aws-s3";
import { ReviewTable } from "../../../Review/db/schema";

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

function createGif(file: Readable, duration: number): Promise<Buffer | null> {
  return new Promise((resolve) => {
    const command = ffmpeg(file)
      .format("gif")
      .duration(duration)
      .fpsOutput(10)
      .complexFilter("scale=-1:360")
      .pipe();

    const _buf = Array<Uint8Array>();

    command.on("data", (chunk: Uint8Array) => _buf.push(chunk));
    command.on("end", () => {
      resolve(Buffer.concat(_buf));
    });
    command.on("error", () => {
      resolve(null);
    });
  });
}

async function getProperSizedGif(file: Readable) {
  for (let currentDuration = 8; currentDuration > 0; currentDuration /= 2) {
    // eslint-disable-next-line no-await-in-loop -- fu
    const gif = await createGif(file, currentDuration);
    if (gif) {
      const blob = new Blob([gif]);
      if (blob.size <= MAXIMUM_FILE_SIZE) return blob;
    }
  }
  return null;
}

async function getInstagramMediaURL(url: string, userId: string) {
  const res = (await instagramRapidAPI(
    `post_info?code_or_id_or_url=${url}`,
  )) as {
    data: {
      video_url?: string;
      thumbnail_url: string;
    };
  };
  if (res.data.video_url) {
    const stream = await fetch(res.data.video_url).then(({ body }) => body);
    if (stream) {
      // @ts-expect-error -- needed
      const gif = await getProperSizedGif(Readable.fromWeb(stream));
      if (gif) {
        return uploadImage("", ["User", userId, "portfolio", v4()], gif);
      }
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
          isNull(ReviewTable.portfolio),
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
