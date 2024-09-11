import { UserCard } from "ui/user-card";
import Link from "next/link";
import { queryGQL } from "../lib/apollo-server";
import { GET_FEATURED_SELLERS } from "../lib/queries";
import { Route } from "../constants/routes";

export const revalidate = 1;

async function Page() {
  const sellers = await queryGQL(
    GET_FEATURED_SELLERS,
    undefined,
    undefined,
    60,
  );
  return (
    <main>
      {sellers.getFeaturedSellers.map(
        (seller) =>
          seller.photo &&
          seller.bio && (
            <Link href={`${Route.Profile}/${seller.id}`} key={seller.id}>
              <UserCard
                bio={seller.bio}
                imageURL={seller.photo}
                name={seller.name || ""}
              />
            </Link>
          ),
      )}
    </main>
  );
}
export default Page;
