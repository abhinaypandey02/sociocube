import { createHash } from "node:crypto";

import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const BUCKET_NAME = process.env.AWS_BUCKET || "";
const REGION_NAME = process.env.AWS_REGION || "";
const client = new S3Client({
  region: REGION_NAME,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const URL_PREFIX = `https://${BUCKET_NAME}.s3.${REGION_NAME}.amazonaws.com/`;

function getHash(keys: string[]) {
  return createHash("sha256").update(keys.join("/")).digest("hex");
}

export async function getUploadFileURL(keys: string[], isPublic?: boolean) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: getHash(keys),
    ACL: isPublic ? "public-read" : undefined,
  });
  return getSignedUrl(client, command, { expiresIn: 300 });
}
export function getFileURL(keys: string[]) {
  return `${URL_PREFIX}${getHash(keys)}`;
}
export async function getSignedFileURL(keys: string[]) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: getHash(keys),
  });
  return getSignedUrl(client, command, { expiresIn: 3600 });
}

export async function uploadImage(url: string, key: string[], blob?: Blob) {
  const photoBlob = blob || (await fetch(url).then((file) => file.blob()));
  const uploadURL = await getUploadFileURL(key, true);
  try {
    const res = await fetch(uploadURL, {
      method: "PUT",
      body: photoBlob,
    });
    if (res.ok) return getFileURL(key);
  } catch (e) {
    return null;
  }
}

export async function deleteImage(url: string) {
  const key = url.split(URL_PREFIX)[1];
  if (key) {
    try {
      await client.send(
        new DeleteObjectCommand({
          Bucket: BUCKET_NAME,
          Key: key,
        }),
      );
      return true;
    } catch (e) {
      console.error("ERROR", url, e);
    }
  }
  return false;
}
