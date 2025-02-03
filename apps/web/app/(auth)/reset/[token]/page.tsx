import { Suspense } from "react";
import ResetForm from "./form";

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;
  return (
    <Suspense>
      <ResetForm token={token} />
    </Suspense>
  );
}
