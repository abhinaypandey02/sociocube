import { PostingPlatforms } from "@backend/lib/constants/platforms";
import { createPosting } from "@graphql/Posting/resolvers/create-posting";
import { NextRequest, NextResponse } from "next/server";

import { getShareText } from "@/app/(dashboard)/campaigns/[id]/utils";
import { getClient } from "@/lib/apollo-server";
import { GET_POSTING } from "@/lib/queries";
import { getTransformedPostingData } from "@/lib/server-actions";

export const POST = async (req: NextRequest) => {
  const { body } = (await req.json()) as {
    body: string;
    from: string;
    to: string;
  };
  if (!body.includes("https://") || !body.includes("forms"))
    return new NextResponse();
  try {
    const posting = await getTransformedPostingData(body);
    if (posting) {
      if (
        !posting.title ||
        !posting.description ||
        !posting.externalLink?.includes("form")
      ) {
        return new NextResponse("No title or desription", { status: 200 });
      }
      const res = await createPosting(
        { userId: 134 },
        {
          ...posting,
          currencyCountry: 101,
          countries: [101],
          deliverables:
            posting.deliverables.trim() !== ""
              ? posting.deliverables.trim().split(",")
              : null,
          externalLink: posting.externalLink || null,
          extraDetails: null,
          platform:
            (posting.platform as PostingPlatforms) ||
            PostingPlatforms.INSTAGRAM,
        },
        true,
      );
      if (res) {
        const client = getClient();
        const postingRes = await client.query({
          query: GET_POSTING,
          variables: { id: res },
        });
        if (!postingRes.data.posting)
          return new NextResponse(
            "error while creating posting. it returned null",
            { status: 500 },
          );

        const text = getShareText(postingRes.data.posting);

        return NextResponse.json(
          {
            text,
            id: res,
          },
          { status: 200 },
        );
      } else {
        return new NextResponse(
          "error while creating posting. it returned null",
          { status: 500 },
        );
      }
    } else {
      return new NextResponse(
        "GROK not working proeprly. " + JSON.stringify(posting),
        { status: 500 },
      );
    }
  } catch (e: unknown) {
    console.error(e);
    return new NextResponse((e as Error).message, { status: 500 });
  }
};
