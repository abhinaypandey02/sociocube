import { PostingPlatforms } from "@backend/lib/constants/platforms";
import { createPosting } from "@graphql/Posting/resolvers/create-posting";
import { NextRequest, NextResponse } from "next/server";

import { getTransformedPostingData } from "@/lib/server-actions";

export const POST = async (req: NextRequest) => {
  const { body } = (await req.json()) as {
    body: string;
    from: string;
    to: string;
  };
  console.warn("received body", body);
  if (!body.includes("https://") || !body.includes("forms"))
    return new NextResponse();
  const posting = await getTransformedPostingData(body);
  if (posting) {
    const res = await createPosting(
      { userId: 134 },
      {
        ...posting,
        deliverables:
          posting.deliverables.trim() !== ""
            ? posting.deliverables.trim().split(",")
            : null,
        externalLink: posting.externalLink || null,
        extraDetails: posting.extraDetails || null,
        platforms: posting.platforms
          ? [posting.platforms.toLowerCase() as PostingPlatforms]
          : [PostingPlatforms.INSTAGRAM],
      },
    );
    if (res) {
      console.warn("Created new posting", res);
      return new NextResponse(res.toString(), { status: 200 });
    }
  }
  return new NextResponse("ERROR CREATING POSTING", { status: 500 });
};
