import React from "react";
import { Button } from "ui/button";
import Link from "next/link";
import { Route } from "../../constants/routes";

export default function OnboardingPage() {
  return (
    <div>
      <h2>It's the start of something amazing!</h2>
      <Link href={Route.OnboardingBasicDetails}>
        <Button>Let's begin!</Button>
      </Link>
    </div>
  );
}
