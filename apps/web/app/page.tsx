import { Button } from "ui/button";
import { UserCard } from "ui/user-card";
import { queryGQL } from "../lib/apollo-server";
import { GET_FEATURED_SELLERS } from "../lib/queries";

async function Page() {
  const sellers = await queryGQL(GET_FEATURED_SELLERS);
  return (
    <main>
      {sellers.getFeaturedSellers.map((seller) => (
        <UserCard
          bio="A seller"
          imageURL="https://picsum.photos/200/300"
          key={seller.name}
          name={seller.name || ""}
        />
      ))}
      <Button />
    </main>
  );
}
export default Page;

export const fetchCache = "force-cache";
export const revalidate = 180;
