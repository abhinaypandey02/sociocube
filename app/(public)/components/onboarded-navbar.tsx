import React from "react";

import { Navbar } from "@/components/navbar";
import { getCurrentUser } from "@/lib/apollo-server";

import {
  AUTHORISED_USER_NAVBAR_SECTIONS,
  getOnboardedUserNavbarSections,
  UNAUTHORISED_NAVBAR_SECTIONS,
} from "../constants";

export default async function OnboardedNavbar() {
  const { user } = await getCurrentUser();
  if (!user) return <Navbar {...UNAUTHORISED_NAVBAR_SECTIONS} />;
  return (
    <>
      <Navbar
        userImage={user.photo || "loading"}
        {...(user.isOnboarded
          ? getOnboardedUserNavbarSections(user)
          : AUTHORISED_USER_NAVBAR_SECTIONS)}
      />
    </>
  );
}
