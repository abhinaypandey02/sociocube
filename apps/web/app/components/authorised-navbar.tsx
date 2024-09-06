import React, { Suspense } from "react";
import { Navbar } from "ui/navbar";
import { getServerToken } from "../../lib/auth-server";
import {
  AUTHORISED_USER_NAVBAR_SECTIONS,
  UNAUTHORISED_NAVBAR_SECTIONS,
} from "../constants";
import OnboardedNavbar from "./onboarded-navbar";

export default async function AuthorisedNavbar() {
  const token = await getServerToken();
  if (!token) return <Navbar sections={UNAUTHORISED_NAVBAR_SECTIONS} />;
  return (
    <Suspense fallback={<Navbar sections={AUTHORISED_USER_NAVBAR_SECTIONS} />}>
      <OnboardedNavbar />
    </Suspense>
  );
}
