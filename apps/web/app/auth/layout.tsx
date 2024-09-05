import type { PropsWithChildren } from "react";
import { getServerToken, handleAuthorized } from "../../lib/auth-server";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const token = await getServerToken();
  if (token) {
    handleAuthorized();
    return;
  }
  return <>{children}</>;
}
