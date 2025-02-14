import React from "react";
import { Navbar } from "ui/navbar";
import {
  getOnboardedUserNavbarSections,
  AUTHORISED_USER_NAVBAR_SECTIONS,
  UNAUTHORISED_NAVBAR_SECTIONS,
} from "../constants";
import { getCurrentUser } from "../../lib/apollo-server";

export default async function OnboardedNavbar() {
  const { user } = await getCurrentUser();
  if (!user) return <Navbar {...UNAUTHORISED_NAVBAR_SECTIONS} />;
  return (
    <Navbar
      userImage={user.photo || "loading"}
      {...(user.isOnboarded || user.agencies.length > 0
        ? getOnboardedUserNavbarSections(user)
        : AUTHORISED_USER_NAVBAR_SECTIONS)}
    />
  );
}
