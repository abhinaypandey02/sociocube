import { Suspense } from "react";
import { getSEO } from "../../../constants/seo";
import SignupForm from "./form";

export default function SignUpPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
export const metadata = getSEO("Join the biggest influencer platform");
