import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";

import UserImage from "@/components/user-image";
import { queryGQL } from "@/lib/apollo-server";
import { GET_CHAT } from "@/lib/queries";

import ChatWindow from "./components/chat-window";

interface ChatPage {
  params: Promise<{ username: string }>;
}
export default async function Page({ params }: ChatPage) {
  const { chat } = await queryGQL(
    GET_CHAT,
    {
      username: (await params).username,
    },
    await cookies(),
  );
  if (!chat) return notFound();
  const photo = chat.user?.photo;
  const name = chat.user?.name;
  return (
    <div>
      <div className="flex gap-2 items-center py-2 px-6">
        <UserImage photo={photo} alt={name || ""} />
        {name}
      </div>
      <ChatWindow chat={chat} />
    </div>
  );
}
