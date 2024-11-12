import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { InstagramDetails } from "../../graphql/types/Instagram/db/schema";
import { LocationTable, UserTable } from "../../graphql/types/User/db/schema";

export async function POST(req: NextRequest) {
  const user = (await req.json()) as {
    followers: number;
    username: string;
    full_name: string;
    photo: string;
    biography: string;
    category: string;
    gender: string;
    country?: number;
    city?: number;
    state?: number;
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
        let locationID = 0;
        if (user.country) {
          const [location] = await tx
            .insert(LocationTable)
            .values({
              country: user.country,
              state: user.state || undefined,
              city: user.city || undefined,
            })
            .returning();
          if (location?.id) locationID = location.id;
        }
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
            location: locationID || undefined,
          })
          .returning();
        return res?.id;
      } catch (e) {
        console.error(e);
        tx.rollback();
      }
    }
  });
  return new NextResponse(id ? id.toString() : undefined);
}
