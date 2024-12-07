import { getSEO } from "../../constants/seo";
import { queryGQL } from "../../lib/apollo-server";
import { SEARCH_SELLERS } from "../../lib/queries";
import SearchWindow from "./components/search-window";

export default async function SearchPage() {
  const defaultSearchResults = await queryGQL(
    SEARCH_SELLERS,
    { filters: {} },
    undefined,
    120,
  );
  return <SearchWindow defaultData={defaultSearchResults} />;
}
export const metadata = getSEO("Find influencers");
