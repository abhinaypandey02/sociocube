import React from "react";

import { Navbar } from "@/components/navbar";
import { getCurrentUser } from "@/lib/apollo-server";

import {
  AUTHORISED_USER_NAVBAR_SECTIONS,
  getOnboardedUserNavbarSections,
  UNAUTHORISED_NAVBAR_SECTIONS,
} from "../constants";
import VerifyEmailHeader from "./verify-email-header";

export default async function OnboardedNavbar() {
  const { user } = await getCurrentUser();
  if (!user) return <Navbar {...UNAUTHORISED_NAVBAR_SECTIONS} />;
  return (
    <>
      {!user.emailVerified && <VerifyEmailHeader />}
      <Navbar
        userImage={user.photo || "loading"}
        {...(user.isOnboarded
          ? getOnboardedUserNavbarSections(user)
          : AUTHORISED_USER_NAVBAR_SECTIONS)}
      />
    </>
  );
}
