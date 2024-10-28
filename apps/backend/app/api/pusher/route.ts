import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { getConversationFromChannelName } from "config/events";
import { db } from "../../../lib/db";
import { ConversationParticipantTable } from "../../graphql/types/Chat/db/schema";
import { pusher } from "../../../lib/socket/send-event";
import { context } from "../../graphql/context";

export const POST = async (req: NextRequest) => {
  const params = new URLSearchParams(await req.text());
  const socketId = params.get("socket_id");
  const channel = params.get("channel_name");
  const { userId } = await context(req);
  if (userId && channel && socketId) {
    const [conversation] = await db
      .select()
      .from(ConversationParticipantTable)
      .where(
        and(
          eq(
            ConversationParticipantTable.conversation,
            getConversationFromChannelName(channel),
          ),
          eq(ConversationParticipantTable.user, userId),
        ),
      );
    if (conversation?.id)
      return new NextResponse(
        JSON.stringify(pusher.authorizeChannel(socketId, channel)),
      );
  }
  return new NextResponse(null, {
    status: 403,
  });
};
