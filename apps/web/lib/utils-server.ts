import { headers } from "next/headers";

export async function getOrganizationDomain() {
  const domain = (await headers()).get("host");
  if (
    !domain ||
    !process.env.NEXT_PUBLIC_FRONTEND_BASE_URL ||
    process.env.NEXT_PUBLIC_FRONTEND_BASE_URL.includes(domain)
  )
    return null;
  return domain;
}
