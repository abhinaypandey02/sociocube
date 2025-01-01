import React from "react";
import { cookies } from "next/headers";
import { Button } from "ui/button";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { queryGQL } from "../../../lib/apollo-server";
import { GET_USER_POSTINGS } from "../../../lib/queries";
import { Route } from "../../../constants/routes";
import AccountPageWrapper from "../components/account-page-wrapper";
import PostingsTable from "./components/postings-table";

export default async function PostingsPage() {
  const { postings } = await queryGQL(
    GET_USER_POSTINGS,
    undefined,
    await cookies(),
    0,
  );
  return (
    <AccountPageWrapper
      cta={
        <Link href={Route.AccountPostingsNew}>
          <Button className="flex items-center gap-1 !text-sm">
            <Plus weight="bold" /> Create new
          </Button>
        </Link>
      }
      title="Your postings"
    >
      <PostingsTable postings={postings} />
    </AccountPageWrapper>
  );
}
