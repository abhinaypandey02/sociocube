import React from "react";
import { GoogleLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { Route } from "../../../constants/routes";

export default function SocialBar() {
  return (
    <div className="mt-6 flex gap-3">
      <a
        className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
        href={`/_auth/google?redirectURL=${Route.Onboarding}`}
      >
        <GoogleLogo size={20} />
        <span className="text-sm font-semibold leading-6">Google</span>
      </a>

      <a
        className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
        href={`/_auth/instagram?redirectURL=${Route.Onboarding}`}
      >
        <InstagramLogo size={20} />
        <span className="text-sm font-semibold leading-6">Instagram</span>
      </a>
    </div>
  );
}
