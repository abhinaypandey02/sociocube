import { GoogleLogo } from "@phosphor-icons/react/dist/ssr";
import React from "react";

import { Button } from "@/components/button";

export default function SocialBar() {
  return (
    <a className="w-full" href="/api/google">
      <Button className="w-full items-center gap-2" invert>
        <GoogleLogo weight="bold" size={20} />
        <span className="text-sm font-semibold leading-6">Google</span>
      </Button>
    </a>
  );
}
