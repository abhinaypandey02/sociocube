import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { getRoute } from "@/constants/routes";
import { queryGQL } from "@/lib/apollo-server";
import { GET_CURRENT_USER } from "@/lib/queries";

import AuthApply from "./auth-apply";

export default async function AuthChecker() {
  const { user } = await queryGQL(
    GET_CURRENT_USER,
    undefined,
    await cookies(),
    0,
  );
  if (user) redirect(getRoute("Home"));
  return <AuthApply user={user} />;
}
