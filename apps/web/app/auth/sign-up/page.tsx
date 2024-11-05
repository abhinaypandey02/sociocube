import { getSEO } from "../../../constants/seo";
import SignupForm from "./form";

export default function SignUpPage() {
  return <SignupForm />;
}
export const metadata = getSEO("Create a new account");
