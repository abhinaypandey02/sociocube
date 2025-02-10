import { NextRequest, NextResponse } from "next/server";
import { and, eq, or } from "drizzle-orm";
import { getConversationFromChannelName } from "config/events";
import { db } from "../../../lib/db";
import { pusher } from "../../../lib/socket/send-event";
import { context } from "../../graphql/context";
import { ConversationTable } from "../../graphql/types/Chat/db/schema";
import { AgencyMember } from "../../graphql/types/Agency/db/schema";

export const POST = async (req: NextRequest) => {
  const params = new URLSearchParams(await req.text());
  const socketId = params.get("socket_id");
  const channel = params.get("channel_name");
  const { userId } = await context(req);
  if (userId && channel && socketId) {
    const [conversation] = await db
      .select()
      .from(ConversationTable)
      .innerJoin(
        AgencyMember,
        and(
          eq(AgencyMember.agency, ConversationTable.agency),
          eq(ConversationTable.id, getConversationFromChannelName(channel)),
        ),
      )
      .where(
        or(eq(AgencyMember.user, userId), eq(ConversationTable.user, userId)),
      );
    if (conversation?.conversation.id)
      return new NextResponse(
        JSON.stringify(pusher.authorizeChannel(socketId, channel)),
      );
  }
  return new NextResponse(null, {
    status: 403,
  });
};
