"use client";
import React from "react";
import { useAuthMutation } from "../../lib/apollo-client";
import { SEND_VERIFICATION_EMAIL } from "../../lib/mutations";

export default function VerifyEmailHeader() {
  const [sendEmail, { data, loading, called }] = useAuthMutation(
    SEND_VERIFICATION_EMAIL,
  );

  return (
    <div className="bg-primary/90 py-1.5 text-center text-sm text-white">
      Verify your email to receive latest campaigns! An email has been sent to
      your inbox.{" "}
      <button
        className="font-semibold underline underline-offset-2"
        disabled={called}
        onClick={() => sendEmail()}
      >
        {loading ? "Sending..." : ""}
        {data ? "Email sent!" : ""}
        {!called ? "Resend email" : ""}
      </button>
    </div>
  );
}
