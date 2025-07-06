import { SealCheck } from "@phosphor-icons/react";
import Image from "next/image";

interface CardProps {
  category: string;
  name: string;
  bio: string;
  photo: string;
  isVerified: boolean;
}

export default function AgencyCard({
  category,
  name,
  bio,
  photo,
  isVerified,
}: CardProps) {
  return (
    <div className="bg-white overflow-hidden">
      <div className="relative w-full h-48">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src={photo}
            alt={name}
            fill
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="pt-4 space-y-1">
        <p className="text-sm font-semibold text-accent uppercase">
          {category}
        </p>
        <div className="flex items-center gap-2 overflow-hidden text-lg sm:text-2xl">
          <h3 className=" truncate font-poppins  font-semibold  ">{name} </h3>
          {isVerified ? (
            <SealCheck className="shrink-0 text-primary" weight="fill" />
          ) : null}
        </div>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
          {bio}
        </p>
      </div>
    </div>
  );
}
