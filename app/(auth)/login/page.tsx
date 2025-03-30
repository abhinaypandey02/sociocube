import React from "react";
import { getSEO } from "@/constants/seo";
import LoginForm from "./form";

export default function LoginPage() {
  return <LoginForm />;
}

export const metadata = getSEO("Login to your account");
