import { ArrowSquareOut, Dot } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React, { ReactNode } from "react";

import { GetAccountProfileDetailsQuery, Roles } from "@/__generated__/graphql";
import { Button } from "@/components/button";
import CopyText from "@/components/copy-link";
import { getMeURL } from "@/constants/routes";

import AccountCard from "./account-card";
export default function ProfileSection({
  user,
  VerifiedBadge,
}: {
  user: NonNullable<GetAccountProfileDetailsQuery["user"]>;
  VerifiedBadge: ReactNode;
}) {
  return (
    <AccountCard>
      <div className="flex items-start gap-2">
        {user.photo && (
          <Image
            src={user.photo}
            alt={user.name || ""}
            height={48}
            width={48}
            className="w-24 h-24 rounded-full"
          />
        )}
        <div>
          <h2 className="text-xl flex gap-x-2 gap-y-1 items-center flex-wrap">
            <span className="font-poppins">{user.name}</span>
            {user.role === Roles.Creator ? (
              VerifiedBadge
            ) : (
              <span
                className={`text-xs text-white px-1.5 py-0.5 rounded-full bg-accent`}
              >
                {user.role}
              </span>
            )}

            {user.username && (
              <CopyText
                text={getMeURL(user.username, true)}
                toastMessage="Profile link copied!"
              />
            )}
          </h2>

          <p className="flex mb-2 mt-1 text-sm items-center text-gray-500 pl-[1px]">
            {user.category} <Dot /> {user.location?.city}
          </p>
          <div className="flex gap-2 items-stretch">
            <Button invert compact className="text-xs gap-1.5">
              Edit Profile
            </Button>
            {user.username && (
              <a target="_blank" href={getMeURL(user.username)} className="">
                <Button borderless invert compact className="h-full gap-1 px-1">
                  <ArrowSquareOut />
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-3">{user.bio}</p>
    </AccountCard>
  );
}
