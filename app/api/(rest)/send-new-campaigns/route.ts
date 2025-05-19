// import { and, eq, gte, isNotNull } from "drizzle-orm";
// import { NextResponse } from "next/server";
//
// import { db } from "../../lib/db";
// import { sendTemplateEmail } from "../../lib/email/send-template";
// import { PostingTable } from "../../(graphql)/Posting/db";
// import { UserTable } from "../../(graphql)/User/db";
// import { getFilteredUsers } from "../../(graphql)/User/utils";
// import { UserSearchFilters } from "../../(graphql)/User/type";
// import { CountryTable } from "../../(graphql)/Map/db";
//
// export const GET = async () => {
//   try {
//     // Get postings created in the last 12 hours
//     const twelveHoursAgo = new Date();
//     twelveHoursAgo.setHours(twelveHoursAgo.getHours() - 12);
//
//     const newPostings = await db
//       .select()
//       .from(PostingTable)
//       .where(
//         and(
//           gte(PostingTable.createdAt, twelveHoursAgo),
//           eq(PostingTable.open, true),
//           eq(PostingTable.inReview, false),
//         ),
//       )
//       .leftJoin(
//         CountryTable,
//         eq(CountryTable.id, PostingTable.currencyCountry),
//       );
//
//     if (newPostings.length === 0) {
//       return new NextResponse(
//         JSON.stringify({ message: "No new postings found" }),
//         {
//           status: 200,
//         },
//       );
//     }
//
//     // Create a map to store user email to relevant postings
//     const userEmailToPostings = new Map<
//       string,
//       Array<{
//         id: number;
//         title: string;
//         barter: boolean;
//         currency?: string | null;
//         price?: number | null;
//       }>
//     >();
//
//     // Process each posting
//     for (const { posting, countries } of newPostings) {
//       // Create filters based on posting requirements
//       const filters: UserSearchFilters = {
//         followersFrom: posting.minimumFollowers || undefined,
//         minimumAge: posting.minimumAge || undefined,
//         maximumAge: posting.maximumAge || undefined,
//         gender: posting.gender || undefined,
//         countryIDs: posting.countries || undefined,
//         cityIDs: posting.cities || undefined,
//         stateIDs: posting.states || undefined,
//       };
//
//       // Get relevant users for this posting
//       const relevantUsers = await getFilteredUsers(filters, "");
//
//       // Add posting to each user's list of relevant postings
//       for (const user of relevantUsers) {
//         const postingInfo = {
//           id: posting.id,
//           title: posting.title,
//           barter: posting.barter,
//           currency: countries?.currency,
//           price: posting.price || null,
//         };
//
//         if (userEmailToPostings.has(user.email)) {
//           userEmailToPostings.get(user.email)!.push(postingInfo);
//         } else {
//           userEmailToPostings.set(user.email, [postingInfo]);
//         }
//       }
//     }
//
//     await Promise.all(
//       Array.from(userEmailToPostings.entries()).map(([email, postings]) =>
//         sendTemplateEmail(email, "NewCampaigns", {
//           influencerName: "",
//           campaigns: postings,
//         }),
//       ),
//     );
//
//     return new NextResponse(
//       JSON.stringify({
//         message: "Emails sent successfully",
//         userCount: userEmailToPostings.size,
//         postingCount: newPostings.length,
//       }),
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("Error sending new campaigns emails:", error);
//     return new NextResponse(
//       JSON.stringify({ error: "Failed to send emails" }),
//       { status: 500 },
//     );
//   }
// };
