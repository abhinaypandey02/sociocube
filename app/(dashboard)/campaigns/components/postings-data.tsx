"use client";
import { SmileyXEyes } from "@phosphor-icons/react";
import React, { useRef, useState } from "react";

import type { GetAllPostingsQuery } from "@/__generated__/graphql";
import LoaderSkeleton from "@/components/loader-skeleton";
import { useAuthQuery } from "@/lib/apollo-client";
import { GET_ALL_POSTINGS } from "@/lib/queries";

import PostingCard from "./posting-card";

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
      className="h-full no-scrollbar"
    >
      {loading ? (
        <LoaderSkeleton title={"Getting the perfect campaigns for you"} />
      ) : null}
      {postings.length === 0 && !loading && (
        <LoaderSkeleton Icon={SmileyXEyes} title={"No campaigns found"} />
      )}
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
