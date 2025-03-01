import { queryGQL } from "../../../lib/apollo-server";
import { GET_INVITE_DETAILS } from "../../../lib/queries";
import { getSEO } from "../../../constants/seo";
import AuthLayout from "../../(auth)/components/auth-layout";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;
  const { getInviteDetails: details } = await queryGQL(
    GET_INVITE_DETAILS,
    { token },
    undefined,
    0,
  );
  return (
    <AuthLayout title={details.title}>
      {details.subtitle}
      <br />
      {details.email}
    </AuthLayout>
  );
}
export const metadata = getSEO("Accept invitation");
