import React, { Suspense } from "react";
import { getSEO } from "../../../constants/seo";
import LoginForm from "./form";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

export const metadata = getSEO("Login to your account");
