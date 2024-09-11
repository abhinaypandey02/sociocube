import { UserCard } from "ui/user-card";
import { queryGQL } from "../lib/apollo-server";
import { GET_FEATURED_SELLERS } from "../lib/queries";

export const revalidate = 1;

async function Page() {
  const sellers = await queryGQL(GET_FEATURED_SELLERS, undefined, undefined);
  return (
    <main>
      {sellers.getFeaturedSellers.map(
        (seller) =>
          seller.photo &&
          seller.bio && (
            <UserCard
              bio={seller.bio}
              imageURL={seller.photo}
              key={seller.name}
              name={seller.name || ""}
            />
          ),
      )}
    </main>
  );
}
export default Page;
