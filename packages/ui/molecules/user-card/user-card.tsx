import React from "react";
import type { UserCardProps } from "./types";

function UserCard({ name, bio, imageURL }: UserCardProps) {
  return (
    <button
      className="rounded-primary text-center transition-transform duration-500  ease-in-out hover:scale-105"
      type="button"
    >
      <div className="h-[270px] w-[230px]">
        <img
          alt={name}
          className="size-full rounded-primary object-cover shadow-elevation-2"
          height={270}
          src={imageURL}
          width={230}
        />
      </div>
      <div className="my-3">
        <h5 className="text-xl font-bold">{name}</h5>
        <p className="mt-0.5 text-sm font-light">{bio}</p>
      </div>
    </button>
  );
}

export default UserCard;
