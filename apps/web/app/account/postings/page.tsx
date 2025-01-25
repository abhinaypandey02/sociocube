import React from "react";
import { cookies } from "next/headers";
import { queryGQL } from "../../../lib/apollo-server";
import { GET_USER_POSTINGS } from "../../../lib/queries";
import { Route } from "../../../constants/routes";
import AccountPageWrapper from "../components/account-page-wrapper";
import LinkWrapper from "../../../components/link-wrapper";
import PostingsTable from "./components/postings-table";
import EarningsInfo from "./components/earnings-info";
import AddPostingButton from "./components/add-posting-button";

export default async function PostingsPage() {
  const { postings, user } = await queryGQL(
    GET_USER_POSTINGS,
    undefined,
    await cookies(),
    0,
  );
  const totalEarnings = postings.reduce(
    (acc, curr) => curr.referralEarnings + acc,
    0,
  );
  return (
    <AccountPageWrapper
      cta={
        <LinkWrapper
          href={
            // user?.instagramStats?.isVerified ?
            Route.AccountPostingsNew
            // : null
          }
        >
          <AddPostingButton
            isVerified={Boolean(user?.instagramStats?.isVerified)}
          />
        </LinkWrapper>
      }
      title="Your postings"
    >
      <PostingsTable
        postings={postings}
        showEarnings={Boolean(totalEarnings)}
      />
      {totalEarnings ? (
        <EarningsInfo title="Total earnings" totalEarnings={totalEarnings} />
      ) : null}
    </AccountPageWrapper>
  );
}
