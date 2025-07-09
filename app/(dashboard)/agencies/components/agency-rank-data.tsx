"use client";
import Link from "next/link";
import { useState } from "react";

import type { GetRankedAgencyQuery } from "@/__generated__/graphql";
import { getRoute } from "@/constants/routes";
import { useAuthQuery } from "@/lib/apollo-client";
import { GET_RANKED_AGENCY } from "@/lib/queries";

import AgencyCard from "./agency-card";

interface AgencyRankDataProps {
  data: GetRankedAgencyQuery;
}

export default function AgencyRankData({
  data: serverData,
}: AgencyRankDataProps) {
  const [page, setPage] = useState(1);
  const [allAgencies, setAllAgencies] = useState<
    GetRankedAgencyQuery["agencies"]
  >(serverData?.agencies || []);
  const [hasMore, setHasMore] = useState(serverData?.agencies.length >= 9);
  const [fetchAgencies, { loading: fetchingMore }] =
    useAuthQuery(GET_RANKED_AGENCY);

  const fetchMore = () => {
    if (!fetchingMore && hasMore) {
      fetchAgencies({
        page: page + 1,
      }).then(({ data }) => {
        if (data?.agencies) {
          setAllAgencies([...allAgencies, ...data.agencies]);
          setPage(page + 1);
          setHasMore(data.agencies.length >= 9);
        }
      });
    }
  };
  return (
    <div className=" space-y-6 pb-6">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 px-6">
        {allAgencies.map((agency, index) => (
          <li key={agency.id}>
            <Link
              href={`${getRoute("Profile")}/${agency.username}`}
              className="block group"
            >
              <AgencyCard
                category={agency.category || ""}
                name={agency.name || " "}
                bio={agency.bio || " "}
                photo={agency.photo || " "}
                isVerified={agency.instagramStats?.isVerified || false}
                fetchMore={
                  index === allAgencies.length - 1 ? fetchMore : undefined
                }
                totalApplications={agency.totalApplications || 0}
              />
            </Link>
          </li>
        ))}
      </ul>
      {fetchingMore && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
            <span>Loading more agencies...</span>
          </div>
        </div>
      )}
    </div>
  );
}
