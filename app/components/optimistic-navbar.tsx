import { cookies } from "next/headers";
import React, { Suspense } from "react";

import { Navbar } from "@/components/navbar";

import {
  AUTHORISED_USER_NAVBAR_SECTIONS,
  UNAUTHORISED_NAVBAR_SECTIONS,
} from "../constants";
import OnboardedNavbar from "./onboarded-navbar";

export default async function OptimisticNavbar() {
  const token = (await cookies()).get("refresh")?.value;
  if (!token) return <Navbar {...UNAUTHORISED_NAVBAR_SECTIONS} />;
  return (
    <Suspense
      fallback={
        <Navbar
          disableCTA
          userImage="loading"
          {...AUTHORISED_USER_NAVBAR_SECTIONS}
        />
      }
    >
      <OnboardedNavbar />
    </Suspense>
  );
}
