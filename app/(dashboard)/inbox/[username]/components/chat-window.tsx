"use client";
import {
  getConversationChannelName,
  NEW_MESSAGE,
} from "@backend/(rest)/pusher/utils";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import Pusher from "pusher-js";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import type { GetChatQuery } from "@/__generated__/graphql";
import { Input } from "@/components/input";
import { useAuthMutation } from "@/lib/apollo-client";
import { useToken, useUser } from "@/lib/auth-client";
import { READ_MESSAGE, SEND_CHAT } from "@/lib/mutations";

interface FormValues {
  text: string;
}

export default function ChatWindow({
  chat,
}: {
  chat: NonNullable<GetChatQuery["chat"]>;
}) {
  const [user] = useUser();
  const token = useToken();
  const { register, handleSubmit, resetField } = useForm<FormValues>();
  const [sendMessage] = useAuthMutation(SEND_CHAT);
  const [readMessage] = useAuthMutation(READ_MESSAGE);
  const [messages, setMessages] = useState<
    (NonNullable<GetChatQuery["chat"]>["messages"][number] & {
      loading?: boolean;
      failed?: boolean;
    })[]
  >(chat.messages.toReversed());
  function onSubmit(data: FormValues) {
    if (!user || !data.text) return;
    const index = messages.length;
    resetField("text");
    setMessages((old) => [
      ...old,
      {
        body: data.text,
        createdAt: new Date().getTime(),
        by: user.id,
      },
    ]);
    if (chat.user?.id)
      sendMessage({
        body: data.text,
        userID: chat.user.id,
      })
        .then(() => {
          setMessages((old) => {
            if (old[index]) old[index].loading = false;
            return [...old];
          });
        })
        .catch(() => {
          setMessages((old) => {
            if (old[index]) old[index].failed = true;
            return [...old];
          });
        });
  }
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "", {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "",
      channelAuthorization: {
        endpoint: `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/pusher`,
        transport: "ajax",
        headers: { Authorization: `Bearer ${token}` },
      },
    });

    pusher.subscribe(getConversationChannelName(chat.id));
    pusher.bind(
      NEW_MESSAGE,
      (message: NonNullable<GetChatQuery["chat"]>["messages"][number]) => {
        if (!user) return;
        if (message.by !== user.id) {
          void readMessage({
            conversationID: chat.id,
          });
          setMessages((old) => [
            ...old,
            {
              body: message.body,
              by: message.by,
              createdAt: message.createdAt,
            },
          ]);
        }
      },
    );
    return () => {
      pusher.unbind();
      pusher.unsubscribe(getConversationChannelName(chat.id));
    };
  }, [chat.id, readMessage, token, user]);

  return (
    <div className={"col-span-3 lg:col-span-2 grow flex flex-col p-4"}>
      <div className={"grow"}>
        {user &&
          messages.map((msg) => (
            <div
              className={`flex ${msg.by === user?.id ? "justify-end" : "justify-start"}`}
              key={msg.createdAt}
            >
              <div>
                {msg.body}
                <br /> {msg.loading ? "(Sending)" : null}{" "}
                {msg.failed ? "Failed" : null}{" "}
                {!msg.loading &&
                  !msg.failed &&
                  new Date(msg.createdAt).toTimeString()}
              </div>
            </div>
          ))}
      </div>
      <form className="flex relative" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder={"Message..."}
          {...register("text", { required: true })}
          className={"rounded-full"}
        />
        <button
          type="submit"
          className={"absolute right-5 top-1/2 -translate-y-1/2"}
        >
          <PaperPlaneTilt className={"text-gray-600"} size={22} />
        </button>
      </form>
    </div>
  );
}
