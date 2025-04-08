import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

import type { GetSellerQuery } from "@/__generated__/graphql";
import { MAXIMUM_FILE_SIZE } from "@/constants/file";

const ffmpeg = typeof window !== "undefined" ? new FFmpeg() : null;

export async function getGif(file: File, duration: number) {
  try {
    if (!ffmpeg) return null;
    await ffmpeg.load();
    await ffmpeg.writeFile("video.mp4", await fetchFile(file));
    await ffmpeg.exec([
      "-i",
      "video.mp4",
      "-filter_complex",
      "fps=10, scale=-1:360",
      "-t",
      duration.toString(),
      "-f",
      "gif",
      "out.gif",
    ]);
    const gif = await ffmpeg.readFile("out.gif");
    return new Blob([gif], { type: "image/gif" });
  } catch (e) {
    console.error(e);
  }
}

export async function getProperSizedGif(file: File) {
  for (let currentDuration = 8; currentDuration > 0; currentDuration /= 2) {
    const blob = await getGif(file, currentDuration);
    if (blob && blob.size <= MAXIMUM_FILE_SIZE) return blob;
  }
  return null;
}

export function getPostFrequency(
  postsData: NonNullable<
    NonNullable<GetSellerQuery["getSeller"]>
  >["instagramMedia"],
) {
  if (!postsData || postsData.length < 2) return "NA";
  const posts = postsData
    .map((post) => new Date(post.timestamp).getTime())
    .sort();
  let sum = 0;
  for (let i = 0; i < posts.length - 1; i++) {
    if (i < posts.length - 1) {
      sum += (posts[i + 1] || 0) - (posts[i] || 0);
    }
  }
  sum /= (posts.length - 1) * (1000 * 60 * 60 * 24);
  if (sum <= 1) return "V. High";
  if (sum <= 2) return "Daily";
  if (sum <= 4) return "Bi-weekly";
  if (sum <= 7) return "Weekly";
  if (sum <= 15) return "Fortnightly";
  if (sum <= 28) return "Monthly";
  return "Less";
}
