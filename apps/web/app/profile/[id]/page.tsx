import React from "react";
import { UserCard } from "ui/user-card";
import Image from "next/image";
import { Button } from "ui/button";
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
    <div className="grid grid-cols-4">
      <div className="col-span-3 space-y-5">
        <div className="">
          <div className="mb-4 flex items-center gap-3">
            <h2>About me</h2>
            <hr />
          </div>
          <div>{seller.bio}</div>
        </div>
        <div className="">
          <div className="mb-4 flex items-center gap-3">
            <h2>Feed ({seller.instagramStats?.mediaCount})</h2>
            <hr />
          </div>
          <div className="grid grid-cols-3">
            {seller.instagramMedia?.map((media) => (
              <a
                href={media.link}
                key={media.thumbnail}
                rel="noopener"
                target="_blank"
              >
                <Image
                  alt={media.caption}
                  height={300}
                  src={media.thumbnail}
                  width={300}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div>
        {seller.photo ? (
          <UserCard bio="" imageURL={seller.photo} name={seller.name} />
        ) : null}
        <div className="grid grid-cols-2">
          <span>Instagram</span>
          <a href={`https://instagram.com/${seller.instagramStats?.username}`}>
            @{seller.instagramStats?.username}
          </a>
          <span>Followers</span>
          <span>{seller.instagramStats?.followers}</span>
        </div>
        <Button>Chat with me!</Button>
      </div>
    </div>
  );
}
