"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const observer = useRef<IntersectionObserver | null>(null);
  const [fetchAgencies, { data: clientData, loading }] =
    useAuthQuery(GET_RANKED_AGENCY);

  useEffect(() => {
    if (clientData?.agencies) {
      setAllAgencies((prev) => [...prev, ...clientData.agencies]);
      setHasMore(clientData.agencies.length >= 9);
    }
  }, [clientData]);

  const loadMoreAgencies = useCallback(async () => {
    if (loading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchAgencies({ page: nextPage });
  }, [loading, hasMore, page, fetchAgencies]);
  const lastAgencyElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (
            entries.length > 0 &&
            entries[0]?.isIntersecting &&
            hasMore &&
            !loading
          ) {
            loadMoreAgencies();
          }
        },
        {
          threshold: 0.1,
          rootMargin: "100px",
        },
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMoreAgencies],
  );
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-6">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {allAgencies.map((agency, index) => (
          <li
            key={agency.id}
            ref={index === allAgencies.length - 1 ? lastAgencyElementRef : null}
          >
            <Link
              href={`${getRoute("Profile")}/${agency.username}`}
              className="block group"
            >
              <AgencyCard
                category={agency.category || " "}
                name={agency.name || " "}
                bio={agency.bio || " "}
                photo={agency.photo || " "}
                isVerified={agency.instagramStats?.isVerified || false}
              />
            </Link>
          </li>
        ))}
      </ul>
      {loading && (
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
