import { PostingPlatforms } from "@backend/lib/constants/platforms";
import { createPosting } from "@graphql/Posting/resolvers/create-posting";
import { getWhatsappNextPost } from "@graphql/SocialPosts/utils";
import { NextRequest, NextResponse } from "next/server";

import { getTransformedPostingData } from "@/lib/server-actions";
import { extractFormsLink, getMetaInfo } from "@/lib/utils";

export const POST = async (req: NextRequest) => {
  const nextPost = await getWhatsappNextPost();
  const body = await req.text();
  if (!body.includes("https://") || !body.includes("forms"))
    return NextResponse.json(
      { nextPost, error: "Invalid form link not found" },
      { status: 500 },
    );
  const externalLink = extractFormsLink(body);
  const ogData = await getMetaInfo(externalLink);
  if (!ogData)
    return NextResponse.json(
      { nextPost, error: "Invalid form data" },
      { status: 500 },
    );
  try {
    const posting = await getTransformedPostingData(body, ogData);
    if (posting) {
      if (
        !posting.title ||
        !posting.description ||
        !posting.externalLink?.includes("form")
      ) {
        return NextResponse.json(
          { nextPost, error: "No title or desription" },
          { status: 500 },
        );
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
        return NextResponse.json({ nextPost });
      } else {
        return NextResponse.json(
          { nextPost, error: "error while creating posting. it returned null" },
          { status: 500 },
        );
      }
    } else {
      return NextResponse.json(
        {
          nextPost,
          error: "GROK not working proeprly. " + JSON.stringify(posting),
        },
        { status: 500 },
      );
    }
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json(
      { nextPost, error: (e as Error).message },
      { status: 500 },
    );
  }
};
