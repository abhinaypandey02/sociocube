import { cookies } from "next/headers";

import { getSEO } from "@/constants/seo";
import { Injector, queryGQL } from "@/lib/apollo-server";
import { GET_ALL_POSTINGS } from "@/lib/queries";

import PostingsData from "./components/postings-data";

export function generateMetadata() {
  return getSEO("Find influencer your-campaigns");
}

export default async function SearchPage() {
  const Cookie = await cookies()
  const token = Cookie.get('refresh')
  return (
    <Injector
      Component={PostingsData}
      fetch={async () =>
        queryGQL(GET_ALL_POSTINGS, { page: 1 }, token ? Cookie : undefined, 120)
      }
    />
  );
}
