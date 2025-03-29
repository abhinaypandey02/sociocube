import React from "react";
import { REFERRAL_RATES } from "@/constants/referral";

export default function EarningsInfo({
  title,
  totalEarnings,
}: {
  title: string;
  totalEarnings: number;
}) {
  return (
    <div className="mt-6">
      <div>
        {title}: <b>{totalEarnings}</b>
        <br />
      </div>
      <em className="text-xs">
        (Current rate/application:- Verified = {REFERRAL_RATES.verified}, Others
        = {REFERRAL_RATES.others})
      </em>
    </div>
  );
}
