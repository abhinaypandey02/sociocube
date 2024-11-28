// import { eq } from "drizzle-orm";
// import { db } from "../../../lib/db";
// import {
//   InstagramMediaTable,
//   UserTable,
// } from "../../graphql/types/User/db/schema";
// import { InstagramDetails } from "../../graphql/types/Instagram/db/schema";
// import { uploadImage } from "../../../lib/storage/aws-s3";
// import { InstagramMediaType } from "../../graphql/constants/instagram-media-type";
//
// export async function GET() {
//   const users = await db
//     .select()
//     .from(UserTable)
//     .where(eq(UserTable.isSpirit, true))
//     .innerJoin(
//       InstagramDetails,
//       eq(InstagramDetails.id, UserTable.instagramDetails),
//     );
//   let index = 0;
//   for (const user of users) {
//     index++;
//     console.log(user.user.name, index, users.length);
//     const result = (await fetch(
//       `https://smapi.clanconnect.ai/instagram/public_profile?instagram_handle_name=${
//         user.instagram_data.username
//       }`,
//       {
//         headers: {
//           Authorization: "HellowncdgudEkjncinUnjnjcOnc83hnU",
//         },
//       },
//     ).then((res) => res.json())) as {
//       data?: {
//         profile_picture_url?: string;
//         media_data?: {
//           caption: string;
//           comments_count: number;
//           like_count: number;
//           media_type: InstagramMediaType;
//           media_url: string;
//           permalink: string;
//           thumbnail_url: string;
//           timestamp: string;
//           id: string;
//         }[];
//       };
//     };
//     if (result.data?.profile_picture_url) {
//       await db
//         .update(UserTable)
//         .set({
//           photo: await uploadImage(result.data.profile_picture_url, [
//             "Spirit",
//             user.instagram_data.username,
//             "photo",
//           ]),
//         })
//         .where(eq(UserTable.id, user.user.id));
//       console.log("PP updated");
//     }
//     if (result.data?.media_data) {
//       try {
//         const posts = [];
//         for (const post of result.data.media_data) {
//           console.log("Uploading post ", posts.length);
//           const link = post.thumbnail_url || post.media_url;
//           if (link)
//             posts.push({
//               appID: post.id,
//               thumbnail:
//                 (await uploadImage(link, [
//                   "Spirit",
//                   user.instagram_data.username,
//                   "posts",
//                   posts.length.toString(),
//                 ])) ||
//                 post.thumbnail_url ||
//                 post.media_url,
//               link: post.permalink,
//               caption: post.caption,
//               type: post.media_type,
//               comments: post.comments_count || -1,
//               likes: post.like_count || 0,
//               timestamp: post.timestamp,
//               user: user.user.id,
//               mediaURL: post.media_url,
//             });
//           if (posts.length === 6) break;
//         }
//         console.log("Updating db");
//         if (posts.length === 6) {
//           await db
//             .delete(InstagramMediaTable)
//             .where(eq(InstagramMediaTable.user, user.user.id));
//           await db.insert(InstagramMediaTable).values(posts);
//         }
//         console.log("Done");
//       } catch (e) {
//         console.log(e, user.user.name);
//       }
//     } else {
//       console.log("=================================", user.user.name);
//     }
//   }
// }
