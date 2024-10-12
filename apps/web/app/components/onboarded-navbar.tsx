import React from "react";
import { Navbar } from "ui/navbar";
import {
  AUTHORISED_SELLER_NAVBAR_SECTIONS,
  AUTHORISED_USER_NAVBAR_SECTIONS,
} from "../constants";
import { queryGQL } from "../../lib/apollo-server";
import { GET_CURRENT_USER } from "../../lib/queries";
import { getServerToken } from "../../lib/auth-server";

export default async function OnboardedNavbar() {
  const token = await getServerToken();
  const { user } = await queryGQL(GET_CURRENT_USER, {}, token);
  return (
    <Navbar
      sections={
        user.isOnboarded
          ? AUTHORISED_SELLER_NAVBAR_SECTIONS
          : AUTHORISED_USER_NAVBAR_SECTIONS
      }
    />
  );
}
