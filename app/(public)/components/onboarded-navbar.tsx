"use client";
import React from "react";

import { Navbar } from "@/components/navbar";
import { useUser } from "@/lib/auth-client";

import {
  AUTHORISED_USER_NAVBAR_SECTIONS,
  getOnboardedUserNavbarSections,
  UNAUTHORISED_NAVBAR_SECTIONS,
} from "../constants";

export default function OnboardedNavbar() {
  const [user] = useUser();
  if (user === undefined) {
    return (
      <Navbar
        hideCTA
        userImage="loading"
        {...AUTHORISED_USER_NAVBAR_SECTIONS}
      />
    );
  }
  if (!user) return <Navbar {...UNAUTHORISED_NAVBAR_SECTIONS} />;
  return (
    <Navbar
      userImage={user.photo || "loading"}
      {...(user.isOnboarded
        ? getOnboardedUserNavbarSections(user)
        : AUTHORISED_USER_NAVBAR_SECTIONS)}
    />
  );
}
