import {
  EnvelopeSimple,
  InstagramLogo,
  Link,
  SealCheck,
  SealQuestion,
} from "@phosphor-icons/react/dist/ssr";
import React from "react";

import {
  GetAccountProfileDetailsQuery,
  GetAccountSocialDetailsQuery,
  Roles,
} from "@/__generated__/graphql";
import { getRoute } from "@/constants/routes";

import AccountCard from "./account-card";
export default function ConnectionsSection({
  data,
  profile,
}: {
  data?: GetAccountSocialDetailsQuery;
  profile: NonNullable<GetAccountProfileDetailsQuery["user"]>;
}) {
  const user = data?.user;
  if (!user) return null;
  return (
    <AccountCard title="Connections" subtitle="Your social connections">
      <div className="flex gap-1 justify-between items-start">
        <div className="flex gap-2 items-center  font-poppins">
          <EnvelopeSimple size={18} />
          <p>Email</p>
        </div>
        <div>
          <span className="flex gap-1 items-center font-light">
            {profile.email}
            {!profile.emailVerified && (
              <SealQuestion className="text-yellow-600" size={14} />
            )}
          </span>
          {!profile.emailVerified && (
            <div
              className={
                "flex gap-1 justify-end items-center text-xs " +
                "text-accent underline"
              }
            >
              Verify now
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-1 justify-between items-start mt-4">
        <div className="flex gap-2 items-center font-poppins">
          <InstagramLogo size={18} />
          <p>Instagram</p>
        </div>
        {user.instagramStats ? (
          <div>
            <span className="flex gap-1 items-center font-light">
              @{user.instagramStats.username}
              {user.instagramStats.isVerified ? (
                <SealCheck
                  weight="fill"
                  className={
                    profile.role === Roles.Creator
                      ? "text-primary"
                      : "text-accent"
                  }
                  size={14}
                />
              ) : (
                <SealQuestion className="text-yellow-600" size={14} />
              )}
            </span>

            {!user.instagramStats.isVerified && (
              <div className="flex gap-2 justify-end  text-sm  items-center">
                <div className={"text-red-600 underline"}>Unlink</div>
                <div
                  className={
                    "underline " +
                    (profile.role === Roles.Creator
                      ? "text-primary"
                      : "text-accent")
                  }
                >
                  Get verified
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            href={getRoute("Onboarding")}
            className="text-accent underline underline-offset-4"
          >
            Connect now
          </Link>
        )}
      </div>
    </AccountCard>
  );
}
