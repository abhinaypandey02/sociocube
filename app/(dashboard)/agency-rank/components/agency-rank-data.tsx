"use client";
import { useEffect, useState } from "react";

import type { GetAgencyRankQuery } from "@/__generated__/graphql";
import { Button } from "@/components/button";
import { useAuthQuery } from "@/lib/apollo-client";
import { GET_AGENCY_RANK } from "@/lib/queries";

import AgencyList from "./agency-list";

interface AgencyRankDataProps {
  fetchData: boolean;
  data: GetAgencyRankQuery;
}

export default function AgencyRankData({
  fetchData,
  data: serverData,
}: AgencyRankDataProps) {
  const [page, setPage] = useState(1);
  const [allAgencies, setAllAgencies] = useState<
    GetAgencyRankQuery["agencies"]
  >(serverData?.agencies || []);
  const [hasMore, setHasMore] = useState(serverData?.agencies.length >= 10);

  const [fetchAgencies, { data: clientData, loading }] =
    useAuthQuery(GET_AGENCY_RANK);

  useEffect(() => {
    if (clientData?.agencies) {
      setAllAgencies((prev) => [...prev, ...clientData.agencies]);
      setHasMore(clientData.agencies.length >= 10);
    }
  }, [clientData]);
  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchAgencies({ page: nextPage });
  };
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-6">
      <AgencyList agencies={allAgencies} startingRank={1} />
      {hasMore && allAgencies.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button onClick={handleLoadMore} disabled={loading} loading={loading}>
            View More
          </Button>
        </div>
      )}
    </div>
  );
}
