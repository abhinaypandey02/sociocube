import { fetchFile } from "@ffmpeg/util";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { MAXIMUM_FILE_SIZE } from "commons/file";

const ffmpeg = new FFmpeg();

export async function getGif(file: File, duration: number) {
  try {
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
    // eslint-disable-next-line no-await-in-loop -- wtf
    const blob = await getGif(file, currentDuration);
    if (blob && blob.size <= MAXIMUM_FILE_SIZE) return blob;
  }
  return null;
}
