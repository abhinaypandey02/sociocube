"use client";
import { InstagramLogo, SealCheck } from "@phosphor-icons/react";
import Link from "next/link";
import React from "react";

import type { GetAgencyRankQuery } from "@/__generated__/graphql";
import UserImage from "@/components/user-image";
import { getMeURL } from "@/constants/routes";
import { convertToAbbreviation } from "@/lib/utils";

interface AgencyListProps {
  agencies: GetAgencyRankQuery["agencies"];
  startingRank: number;
}

export default function AgencyList({
  agencies,
  startingRank,
}: AgencyListProps) {
  return (
    <ul className="space-y-4">
      {agencies.map((agency, index) => (
        <li key={agency.id}>
          <Link href={getMeURL(agency.username || "")} className="block group">
            <div className="bg-white rounded-xl max-sm:text-center border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-200 hover:border-accent/20">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-accent to-accent/80 text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-lg">
                      #{startingRank + index}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <UserImage
                      size={64}
                      photo={agency.photo}
                      alt={agency.name || "Agency"}
                      className="sm:w-20 sm:h-20 border-2 border-gray-100 hover:border-accent/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex-grow min-w-0 text-center sm:text-left">
                  <h3 className="flex items-center justify-center sm:justify-start gap-1.5 text-lg font-semibold text-gray-900 group-hover:text-accent transition-colors">
                    {agency.name || ""}
                    {agency.instagramStats?.isVerified && (
                      <SealCheck
                        className="text-primary flex-shrink-0"
                        size={16}
                        weight="fill"
                      />
                    )}
                  </h3>
                  <div className="mt-0.5 font-poppins text-xs font-medium text-primary">
                    {agency.category}
                  </div>
                  <p className="mt-1 flex items-center justify-center sm:justify-start gap-1 text-sm text-gray-600">
                    <InstagramLogo weight="bold" className="flex-shrink-0" />
                    <span>
                      {convertToAbbreviation(
                        agency.instagramStats?.followers || 0,
                      )}{" "}
                      followers
                    </span>
                  </p>
                </div>

                <div className="flex-shrink-0 text-center sm:text-right">
                  <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">
                    {convertToAbbreviation(agency.totalApplications || 0)}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 font-medium">
                    Total Applications
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
