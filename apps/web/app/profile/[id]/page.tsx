import React from "react";
import { UserCard } from "ui/user-card";
import { queryGQL } from "../../../lib/apollo-server";
import { GET_SELLER } from "../../../lib/queries";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  if (isNaN(id)) return null;
  const data = await queryGQL(
    GET_SELLER,
    {
      id,
    },
    undefined,
    60,
  );
  const seller = data.getSeller;
  if (!seller?.name) return null;
  return (
    <>
      <h1 className="my-10 text-center text-5xl">
        Welcome to the page of {seller.name}
      </h1>
      {seller.photo ? (
        <UserCard
          bio={seller.bio || "An influencer"}
          imageURL={seller.photo}
          name={seller.name}
        />
      ) : null}
    </>
  );
}
