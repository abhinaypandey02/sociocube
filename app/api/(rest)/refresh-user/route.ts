// import { NextResponse } from "next/server";
// import { and, eq, isNotNull, lte } from "drizzle-orm";
// import { db } from "../../../lib/db";
// import { UserTable } from "../../graphql/types/User/db/schema";
// import { InstagramDetails } from "../../graphql/types/Instagram/db/schema";
// import { getRefreshedAccessToken } from "../../(auth)/instagram/utils";
//
// export const POST = async () => {
//   const currentDate = new Date();
//   currentDate.setDate(currentDate.getDate() - 20);
//   const users = await db
//     .select()
//     .from(UserTable)
//     .innerJoin(
//       InstagramDetails,
//       and(
//         eq(InstagramDetails.id, UserTable.instagramDetails),
//         isNotNull(InstagramDetails.accessToken),
//         lte(InstagramDetails.accessTokenUpdatedAt, currentDate),
//       ),
//     );
//   for (const user of users) {
//     const token = user.instagram_data.accessToken;
//     if (token) {
//       // eslint-disable-next-line no-await-in-loop -- needed
//       const refreshedToken = await getRefreshedAccessToken(token);
//       if (refreshedToken) {
//         // eslint-disable-next-line no-await-in-loop -- needed
//         await db
//           .update(InstagramDetails)
//           .set({
//             accessToken: refreshedToken,
//             accessTokenUpdatedAt: new Date(),
//           })
//           .where(eq(InstagramDetails.id, user.instagram_data.id));
//         console.warn("UPDATED", user.user.name);
//       } else {
//         // eslint-disable-next-line no-await-in-loop -- needed
//         await db
//           .update(InstagramDetails)
//           .set({
//             accessToken: null,
//           })
//           .where(eq(InstagramDetails.id, user.instagram_data.id));
//         console.warn("NO TOKEN FOR ", user.user.username);
//       }
//     }
//   }
//
//   return new NextResponse(null, { status: 200 });
// };
