// import { NextRequest, NextResponse } from "next/server";
// import { eq } from "drizzle-orm";
// import { db } from "../../../lib/db";
// import { InstagramDetails } from "../../graphql/types/Instagram/db/schema";
// import {
//   LocationTable,
//   UserTable,
//   InstagramMediaTable,
// } from "../../graphql/types/User/db/schema";
// import { InstagramMediaType } from "../../graphql/constants/instagram-media-type";
// import { uploadImage } from "../../../lib/storage/aws-s3";
// import { getCategory, getGender } from "./utils";
//
// export async function POST(req: NextRequest) {
//   if (!process.env.GROQ_API_KEY) return new NextResponse(null, { status: 403 });
//   const user = (await req.json()) as {
//     followers: number;
//     username: string;
//     full_name: string;
//     photo: string;
//     biography: string;
//     category?: string;
//     country?: number;
//     city?: number;
//     state?: number;
//     id: string;
//     mediaCount: number;
//     media: {
//       node: {
//         __typename: string;
//         shortcode: string;
//         edge_media_to_caption: {
//           edges: { node: { text: string } }[];
//         };
//         edge_media_to_comment: {
//           count: number;
//         };
//         edge_liked_by: {
//           count: number;
//         };
//         thumbnail_src: string;
//       };
//     }[];
//   };
//   if (!user.username || !user.id)
//     return new NextResponse(null, { status: 400 });
//
//   const [existingUser] = await db
//     .select()
//     .from(InstagramDetails)
//     .where(eq(InstagramDetails.igID, user.id))
//     .innerJoin(UserTable, eq(UserTable.instagramDetails, InstagramDetails.id));
//   if (existingUser?.user && !existingUser.user.isSpirit)
//     return new NextResponse(null, { status: 400 });
//   const photo = await uploadImage(user.photo, [
//     "Spirit",
//     user.username,
//     "photo",
//   ]);
//   const id = await db.transaction(async (tx) => {
//     let instaDetailsID = 0;
//     try {
//       if (existingUser?.user) {
//         await tx
//           .delete(InstagramMediaTable)
//           .where(eq(InstagramMediaTable.user, existingUser.user.id));
//       }
//       if (existingUser?.user.instagramDetails) {
//         instaDetailsID = existingUser.user.instagramDetails;
//         await tx
//           .update(InstagramDetails)
//           .set({
//             followers: user.followers,
//             username: user.username.trim(),
//             mediaCount: user.mediaCount,
//           })
//           .where(eq(InstagramDetails.id, existingUser.user.instagramDetails));
//       } else {
//         const [instaDetails] = await tx
//           .insert(InstagramDetails)
//           .values({
//             followers: user.followers,
//             username: user.username.trim(),
//             mediaCount: user.mediaCount,
//             igID: user.id,
//           })
//           .returning();
//         if (instaDetails?.id) instaDetailsID = instaDetails.id;
//       }
//
//       if (instaDetailsID) {
//         let locationID = 0;
//         if (user.country) {
//           if (existingUser?.user.location) {
//             await tx
//               .update(LocationTable)
//               .set({
//                 country: user.country,
//                 state: user.state || undefined,
//                 city: user.city || undefined,
//               })
//               .where(eq(LocationTable.id, existingUser.user.location));
//             locationID = existingUser.user.location;
//           } else {
//             const [location] = await tx
//               .insert(LocationTable)
//               .values({
//                 country: user.country,
//                 state: user.state || undefined,
//                 city: user.city || undefined,
//               })
//               .returning();
//             if (location?.id) locationID = location.id;
//           }
//         }
//         const category = await getCategory(user.category);
//         const gender = await getGender(
//           user.full_name,
//           user.biography,
//           user.username,
//         );
//         if (existingUser?.user) {
//           await tx
//             .update(UserTable)
//             .set({
//               instagramDetails: instaDetailsID,
//               name: user.full_name,
//               photo,
//               bio: user.biography,
//               scopes: [],
//               roles: [],
//               isSpirit: true,
//               category,
//               gender,
//               location: locationID || undefined,
//             })
//             .where(eq(UserTable.id, existingUser.user.id));
//           return existingUser.user.id;
//         }
//         const [res] = await tx
//           .insert(UserTable)
//           .values({
//             instagramDetails: instaDetailsID,
//             name: user.full_name,
//             photo,
//             bio: user.biography,
//             scopes: [],
//             roles: [],
//             isSpirit: true,
//             category,
//             gender,
//             location: locationID || undefined,
//           })
//           .returning();
//         if (!res) {
//           tx.rollback();
//           return null;
//         }
//         await tx
//           .update(UserTable)
//           .set({ username: res.id.toString() })
//           .where(eq(UserTable.id, res.id));
//         return res.id;
//       }
//       tx.rollback();
//     } catch (e) {
//       console.error(e);
//       tx.rollback();
//     }
//   });
//   if (id) {
//     const mediaValues = (
//       await Promise.all(
//         user.media.map(async ({ node }, i) => ({
//           caption: node.edge_media_to_caption.edges[0]?.node.text,
//           likes: node.edge_liked_by.count,
//           comments: node.edge_media_to_comment.count,
//           type:
//             // eslint-disable-next-line no-nested-ternary -- please
//             node.__typename === "GraphVideo"
//               ? InstagramMediaType.Video
//               : node.__typename === "GraphSidecar"
//                 ? InstagramMediaType.CarouselAlbum
//                 : InstagramMediaType.Image,
//           thumbnail:
//             (await uploadImage(node.thumbnail_src, [
//               "Spirit",
//               user.username,
//               "posts",
//               i.toString(),
//             ])) || "",
//           link: `https://instagram.com/p/${node.shortcode}`,
//           user: id,
//         })),
//       )
//     ).filter((posts) => posts.thumbnail !== "");
//     if (mediaValues.length !== user.media.length)
//       return new NextResponse(null, { status: 400 });
//     if (mediaValues.length > 0)
//       await db.insert(InstagramMediaTable).values(mediaValues);
//   }
//   return new NextResponse(id ? id.toString() : undefined);
// }
