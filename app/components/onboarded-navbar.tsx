import React from "react";
import { Navbar } from "@/components/navbar";
import {
  getOnboardedUserNavbarSections,
  AUTHORISED_USER_NAVBAR_SECTIONS,
  UNAUTHORISED_NAVBAR_SECTIONS,
} from "../constants";
import { getCurrentUser } from "../../lib/apollo-server";
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
