"use client";
import React, { useRef, useState } from "react";

import type { GetAllPostingsQuery } from "@/__generated__/graphql";
import NoResults from "@/app/(dashboard)/campaigns/components/no-results";
import { useAuthQuery } from "@/lib/apollo-client";
import { GET_ALL_POSTINGS } from "@/lib/queries";

import PostingCard from "./posting-card";
import SearchLoading from "./search-loading";

export default function PostingsData({
  data,
  loading,
}: {
  data: GetAllPostingsQuery | null;
  loading: boolean;
}) {
  const [postings, setPostings] = useState(data?.postings || []);
  const [page, setPage] = useState(1);
  const ref = useRef<HTMLUListElement>(null);
  const [fetchPostings, { loading: fetchingMore }] =
    useAuthQuery(GET_ALL_POSTINGS);
  const fetchMore = () => {
    if (!fetchingMore && !loading) {
      fetchPostings({
        page: page + 1,
      }).then(({ data }) => {
        if (data?.postings) {
          setPostings([...postings, ...data.postings]);
          setPage(page + 1);
        }
      });
    }
  };
  const gotoNext = () => {
    if (ref.current) {
      ref.current.scrollBy({
        top: ref.current.clientHeight,
      });
    }
  };
  return (
    <ul
      ref={ref}
      aria-labelledby="products-heading"
      className="h-full snap-y snap-mandatory snap-always overflow-auto no-scrollbar"
    >
      {loading ? <SearchLoading /> : null}
      {postings.length === 0 && !loading && <NoResults />}
      {!loading &&
        postings.map((posting, i) => (
          <PostingCard
            gotoNext={gotoNext}
            key={posting.id}
            fetchMore={i === postings.length - 2 ? fetchMore : undefined}
            posting={posting}
            loading={i === postings.length - 1 && fetchingMore}
          />
        ))}
    </ul>
  );
}
