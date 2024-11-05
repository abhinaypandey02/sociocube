import { getSEO } from "../../constants/seo";
import SearchWindow from "./components/search-window";

export default function SearchPage() {
  return <SearchWindow />;
}
export const metadata = getSEO("Find influencers");
