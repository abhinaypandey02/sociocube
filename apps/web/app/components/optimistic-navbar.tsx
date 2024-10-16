import React, { Suspense } from "react";
import { Navbar } from "ui/navbar";
import { cookies } from "next/headers";
import {
  AUTHORISED_USER_NAVBAR_SECTIONS,
  UNAUTHORISED_NAVBAR_SECTIONS,
} from "../constants";
import AuthorisedNavbar from "./authorised-navbar";

export default async function OptimisticNavbar() {
  const token = (await cookies()).get("refresh")?.value;
  if (!token) return <Navbar {...UNAUTHORISED_NAVBAR_SECTIONS} />;
  return (
    <Suspense
      fallback={<Navbar disableCTA {...AUTHORISED_USER_NAVBAR_SECTIONS} />}
    >
      <AuthorisedNavbar />
    </Suspense>
  );
}
