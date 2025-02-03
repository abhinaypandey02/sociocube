import { queryGQL } from "../../../../lib/apollo-server";
import { VERIFY_EMAIL } from "../../../../lib/queries";
import { getSEO } from "../../../../constants/seo";

export default function VerifyEmailPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;
  try {
    await queryGQL(VERIFY_EMAIL, { token });
    return <div>Successfully verified!</div>;
  } catch (error) {
    return <div className="text-red-500">{error.message}</div>;
  }
}
export const metadata = getSEO("Forgot password");
