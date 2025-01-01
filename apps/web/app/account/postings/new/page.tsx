import React from "react";
import CreateNewPostingForm from "../components/form";
import AccountPageWrapper from "../../components/account-page-wrapper";

export default function CreateNewPostingPage() {
  return (
    <AccountPageWrapper title="Create new posting">
      <div className="max-w-2xl">
        <CreateNewPostingForm />
      </div>
    </AccountPageWrapper>
  );
}
