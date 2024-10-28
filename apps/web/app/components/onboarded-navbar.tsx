import React from "react";
import { Navbar } from "ui/navbar";
import { cookies } from "next/headers";
import {
  AUTHORISED_SELLER_NAVBAR_SECTIONS,
  AUTHORISED_USER_NAVBAR_SECTIONS,
  UNAUTHORISED_NAVBAR_SECTIONS,
} from "../constants";
import { queryGQL } from "../../lib/apollo-server";
import { GET_CURRENT_USER } from "../../lib/queries";

export default async function OnboardedNavbar() {
  const { user } = await queryGQL(GET_CURRENT_USER, {}, await cookies());
  if (!user) return <Navbar {...UNAUTHORISED_NAVBAR_SECTIONS} />;
  return (
    <Navbar
      {...(user.isOnboarded
        ? AUTHORISED_SELLER_NAVBAR_SECTIONS
        : AUTHORISED_USER_NAVBAR_SECTIONS)}
    />
  );
}
