import { SealCheck } from "@phosphor-icons/react";
import { TrendUp } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { useVisibility } from "@/lib/hooks";
import { convertToAbbreviation } from "@/lib/utils";
interface CardProps {
  category: string;
  name: string;
  bio: string;
  photo: string;
  isVerified: boolean;
  fetchMore?: () => void;
  totalApplications: number;
}

export default function AgencyCard({
  category,
  name,
  bio,
  photo,
  isVerified,
  fetchMore,
  totalApplications,
}: CardProps) {
  const mainRef = useVisibility(fetchMore);

  return (
    <div ref={fetchMore ? mainRef : null} className="bg-white overflow-hidden">
      <div className="relative w-full h-48">
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <Image
            src={photo}
            alt={name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="pt-4 space-y-1">
        <div className={"flex justify-between"}>
          <p className="text-sm font-semibold text-accent uppercase">
            {category}
          </p>

          <div className="flex text-xs items-center gap-1">
            <TrendUp />
            <p className={"font-medium text-gray-800"}>
              {convertToAbbreviation(totalApplications)}
            </p>
          </div>
        </div>
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
