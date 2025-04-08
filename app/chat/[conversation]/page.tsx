import { cookies } from "next/headers";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import React from "react";

import { Route } from "@/constants/routes";
import { getCurrentUser, queryGQL } from "@/lib/apollo-server";
import { GET_CHAT } from "@/lib/queries";

import ChatWindow from "./components/chat-window";

interface ChatPage {
  params: Promise<{ conversation: string }>;
}
export default async function Page({ params }: ChatPage) {
  const { chat } = await queryGQL(
    GET_CHAT,
    {
      conversationID: parseInt((await params).conversation),
    },
    await cookies(),
  );
  if (!chat) return notFound();
  const { user } = await getCurrentUser();
  if (!user) {
    return redirect(Route.Home);
  }
  const photo = chat.agency?.photo || chat.user?.photo;
  const name = chat.agency?.name || chat.user?.name;
  return (
    <div>
      <div className="flex gap-2">
        {photo ? (
          <Image alt={name || ""} height={50} src={photo} width={50} />
        ) : null}
        {name}
      </div>
      <ChatWindow chat={chat} user={user} />
    </div>
  );
}
