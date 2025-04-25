"use client";
import Image from "next/image";
import {
  ChangeEvent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-hot-toast";

import { ALLOWED_IMAGE_TYPES, MAXIMUM_FILE_SIZE } from "@/constants/file";
import { useToken } from "@/lib/auth-client";
import { handleImageUpload } from "@/lib/utils";

interface ImageUploaderProps {
  defaultPhoto?: string | null;
  size?: number;
  className?: string;
  showRemoveButton?: boolean;
  onChange?: (formData?: FormData) => void;
  onUpload?: (url?: string | null) => void;
  onNewURL?: (url?: string | null) => void;
}

export default function ImageUploader({
  defaultPhoto,
  size = 128,
  className = "mx-auto block",
  showRemoveButton = true,
  children,
  onChange,
  onNewURL,
  onUpload,
}: PropsWithChildren<ImageUploaderProps>) {
  const token = useToken();
  const ref = useRef<HTMLInputElement>(null);
  const [profilePictureURL, setProfilePictureURL] = useState(defaultPhoto);

  useEffect(() => {
    if (onNewURL) onNewURL(profilePictureURL);
  }, [profilePictureURL]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && token) {
      if (file.size > MAXIMUM_FILE_SIZE) {
        toast.error(
          `Maximum file size is ${MAXIMUM_FILE_SIZE / 1024 / 1024}mb`,
        );
      } else if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        toast.error(`Only png and jpeg image types are allowed`);
      } else {
        setProfilePictureURL(URL.createObjectURL(file));
        const formData = new FormData();
        formData.set("file", file);
        if (onChange) onChange(formData);
        else
          handleImageUpload(formData, token).then((photo) => {
            if (onUpload) onUpload(photo);
          });
      }
    }
  };

  const handleRemove = () => {
    setProfilePictureURL(undefined);
    if (onChange) return onChange(undefined);
    else if (token) {
      handleImageUpload(new FormData(), token).then((photo) => {
        if (onUpload) onUpload(photo);
      });
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className={className}
      >
        {profilePictureURL ? (
          <Image
            src={profilePictureURL}
            alt="Profile"
            width={size}
            height={size}
            className="object-cover h-full w-full"
          />
        ) : (
          children
        )}
      </button>
      {showRemoveButton && profilePictureURL && (
        <button
          type="button"
          onClick={handleRemove}
          className="text-sm mx-auto block text-red-600 mt-1"
        >
          Remove photo
        </button>
      )}
      <input
        accept={ALLOWED_IMAGE_TYPES.join(", ")}
        className="hidden"
        onChange={handleFileChange}
        ref={ref}
        type="file"
      />
    </div>
  );
}
