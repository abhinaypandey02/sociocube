"use client";
import {
  getConversationChannelName,
  NEW_MESSAGE,
} from "@backend/(rest)/pusher/utils";
import Pusher from "pusher-js";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import type {
  GetChatQuery,
  GetCurrentUserQuery,
} from "@/__generated__/graphql";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useAuthMutation } from "@/lib/apollo-client";
import { useToken } from "@/lib/auth-client";
import { READ_MESSAGE, SEND_CHAT } from "@/lib/mutations";

interface FormValues {
  text: string;
}

export default function ChatWindow({
  chat,
  user,
}: {
  chat: NonNullable<GetChatQuery["chat"]>;
  user: NonNullable<GetCurrentUserQuery["user"]>;
}) {
  const byAgency = chat.user?.id !== user.id;
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
    const index = messages.length;
    resetField("text");
    setMessages((old) => [
      ...old,
      {
        body: data.text,
        createdAt: new Date().getTime(),
        byAgency,
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
        if (message.byAgency !== byAgency) {
          void readMessage({
            conversationID: chat.id,
          });
          setMessages((old) => [
            ...old,
            {
              body: message.body,
              byAgency: message.byAgency,
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
  }, [chat.id, readMessage, token, user.id]);

  return (
    <div className={"col-span-3 lg:col-span-2"}>
      {messages.map((msg) => (
        <div
          className={`flex ${msg.byAgency === byAgency ? "justify-end" : "justify-start"}`}
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
      <form className="flex " onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("text")} />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
