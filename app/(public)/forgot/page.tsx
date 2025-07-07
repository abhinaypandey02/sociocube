import { Metadata } from "next";

import { getSEO } from "@/constants/seo";

import ForgotPasswordForm from "./form";

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
export const metadata: Metadata = getSEO("Forgot password");
