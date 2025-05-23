import { context } from "@backend/lib/auth/context";
import { ConversationTable } from "@graphql/Chat/db";
import { arrayContains } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { UserTable } from "../../(graphql)/User/db";
import { eq } from "drizzle-orm";
import { db } from "../../lib/db";
import { pusher } from "../../lib/socket/send-event";
import { unstable_Trigger } from "@radix-ui/react-checkbox";

export const POST = async (req: NextRequest) => {
  const params = new URLSearchParams(await req.text());
  const socketId = params.get("socket_id");
  const channel = params.get("channel_name");
  const { userId } = await context(req);
  if (userId && channel && socketId) {
    const userChannelMatch = channel.match(/^private-user-(\d+)$/);
    if (!userChannelMatch || !userChannelMatch[1]) {
      return new NextResponse(null, { status: 403 });
    }
    const channelUserId = parseInt(userChannelMatch[1], 10);
    const [user] = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.id, userId));
    if (user?.id === userId && userId === channelUserId)
      return new NextResponse(
        JSON.stringify(pusher.authorizeChannel(socketId, channel))
      );
  }
  return new NextResponse(null, {
    status: 403,
  });
};
