import type { GraphQLError } from "graphql/error";
import { queryGQL } from "../../../../lib/apollo-server";
import { VERIFY_EMAIL } from "../../../../lib/queries";
import { getSEO } from "../../../../constants/seo";

export default async function VerifyEmailPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;
  try {
    await queryGQL(VERIFY_EMAIL, { token });
    return <div>Successfully verified!</div>;
  } catch (error) {
    console.error(error);
    return (
      <div className="text-red-500">{(error as GraphQLError).message}</div>
    );
  }
  return null;
}
export const metadata = getSEO("Forgot password");
export const revalidate = 0;
