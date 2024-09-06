import React from "react";
import { GoogleLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function SocialBar() {
  return (
    <>
      <hr className="mx-auto mt-8 w-40" />
      <div className="my-6 flex items-center justify-center gap-5">
        <Link href="/_auth/google">
          <GoogleLogo size={40} />
        </Link>
        <Link href="/_auth/instagram">
          <InstagramLogo size={40} />
        </Link>
      </div>
    </>
  );
}
