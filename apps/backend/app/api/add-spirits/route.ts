import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { InstagramDetails } from "../../graphql/types/Instagram/db/schema";
import { UserTable } from "../../graphql/types/User/db/schema";

export async function POST(req: NextRequest) {
  const user = (await req.json()) as {
    followers: number;
    username: string;
    full_name: string;
    photo: string;
    biography: string;
    category: string;
    gender: string;
  };
  const id = await db.transaction(async (tx) => {
    const [instaDetails] = await tx
      .insert(InstagramDetails)
      .values({
        followers: user.followers,
        username: user.username,
      })
      .returning();
    if (instaDetails?.id) {
      try {
        const [res] = await tx
          .insert(UserTable)
          .values({
            instagramDetails: instaDetails.id,
            name: user.full_name,
            photo: user.photo,
            bio: user.biography,
            scopes: [],
            roles: [],
            isSpirit: true,
            category: user.category,
            gender: user.gender,
          })
          .returning();
        return res?.id;
      } catch (e) {
        tx.rollback();
      }
    }
  });
  return new NextResponse(id ? id.toString() : undefined);
}
