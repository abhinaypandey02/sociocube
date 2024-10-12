import React from "react";
import { Button } from "ui/button";
import Link from "next/link";
import { Route } from "../../../../constants/routes";

export default function ChatButton({
  to,
  from,
}: {
  to: number;
  from?: number;
}) {
  if (!from)
    return (
      <Button className="cursor-wait" disabled>
        Chat with me!
      </Button>
    );
  if (from === to)
    return <Button disabled>You can't chat with yourself!</Button>;
  return (
    <Link href={`${Route.Chat}/${to}`} target="_blank">
      <Button>Chat with me!</Button>
    </Link>
  );
}
