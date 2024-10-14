import React from "react";
import { Button, Variants } from "ui/button";
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
      <Link href={Route.SignUp} target="_blank">
        <Button className="w-full" variant={Variants.ACCENT}>
          Register to chat!
        </Button>
      </Link>
    );
  if (from === to)
    return (
      <Button disabled variant={Variants.ACCENT}>
        You can't chat with yourself!
      </Button>
    );
  return (
    <Link href={`${Route.Chat}/${to}`} target="_blank">
      <Button className="w-full" variant={Variants.ACCENT}>
        Chat with me!
      </Button>
    </Link>
  );
}
