import { getSEO } from "../../../constants/seo";
import ForgotPasswordForm from "./form";

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
export const metadata = getSEO("Forgot password");
