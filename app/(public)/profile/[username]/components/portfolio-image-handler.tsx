"use client";
import type { ChangeEvent, LegacyRef } from "react";
import React from "react";
import { toast } from "react-hot-toast";

import { ALLOWED_IMAGE_TYPES, MAXIMUM_FILE_SIZE } from "@/constants/file";

import { getProperSizedGif } from "./utils";

export default function PortfolioImageHandler({
  ref,
  onChange,
  onGifLoadStart,
}: {
  ref: LegacyRef<HTMLInputElement> | null;
  onChange: (file: File | Blob | null) => void;
  onGifLoadStart: () => void;
}) {
  return (
    <input
      accept={[...ALLOWED_IMAGE_TYPES, "image/gif", "video/*"].join(", ")}
      className="hidden"
      onChange={async (e) => {
        const event = e as unknown as ChangeEvent<HTMLInputElement>;
        const file = event.target.files?.[0];
        if (file) {
          if (file.type.startsWith("video/")) {
            onGifLoadStart();
            const blob = await getProperSizedGif(file);
            if (blob) {
              onChange(blob);
            } else {
              onChange(null);
              toast.error(
                `Cannot process video file, Please use a shorter video.`,
              );
            }
          } else if (file.size > MAXIMUM_FILE_SIZE) {
            onChange(null);
            toast.error(
              `Maximum file size is ${MAXIMUM_FILE_SIZE / 1024 / 1024}mb`,
            );
          } else if (
            ![...ALLOWED_IMAGE_TYPES, "image/gif"].includes(file.type)
          ) {
            onChange(null);
            toast.error(`Only png and jpeg image types are allowed`);
          } else {
            onChange(file);
          }
        }
      }}
      ref={ref}
      type="file"
    />
  );
}
