import { Suspense } from "react";
import { getSEO } from "../../../constants/seo";
import ForgotPasswordForm from "./form";

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordForm />
    </Suspense>
  );
}
export const metadata = getSEO("Forgot password");
