import { SealCheck } from "@phosphor-icons/react/dist/ssr";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import { queryGQL } from "@/lib/apollo-server";
import { GET_ACCOUNT_SOCIAL_DETAILS } from "@/lib/queries";

export default async function VerifiedBadge({
  Cookie,
}: {
  Cookie: ReadonlyRequestCookies;
}) {
  const { user } = await queryGQL(
    GET_ACCOUNT_SOCIAL_DETAILS,
    undefined,
    Cookie,
    0,
  );
  if (user?.instagramStats?.isVerified)
    return <SealCheck weight="fill" className="text-primary" />;
  return null;
}
