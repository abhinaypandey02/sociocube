import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import type { GetCurrentUserQuery } from "@/__generated__/graphql";
import { getRoute } from "@/constants/routes";

const NAVBAR_COMMON_SECTIONS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about-us" },
  { label: "FAQ", href: "/#faq" },
];
export const NAVBAR_COMMON_ROUTES = [
  { label: "Home", href: getRoute("Home") },
  { label: "AI Search", href: getRoute("Search") },
  { label: "Campaigns", href: getRoute("Campaigns") },
  ...NAVBAR_COMMON_SECTIONS,
];

export const UNAUTHORISED_NAVBAR_SECTIONS = {
  primaryLinks: NAVBAR_COMMON_ROUTES,
  secondaryLinks: [
    {
      label: "Sign In",
      href: getRoute("Login"),
    },
  ],
  cta: {
    button: {
      children: (
        <span className="flex items-center gap-1">
          Join now <ArrowRight />
        </span>
      ),
    },
    href: getRoute("SignUp"),
  },
};
export const AUTHORISED_USER_NAVBAR_SECTIONS = {
  primaryLinks: NAVBAR_COMMON_ROUTES,
  secondaryLinks: [
    {
      label: "Profile",
      href: getRoute("Profile"),
    },
    {
      label: "Settings",
      href: getRoute("Settings"),
    },
  ],
  cta: {
    button: {
      children: "List yourself",
      invert: true,
    },
    href: getRoute("Onboarding"),
  },
};
export const getOnboardedUserNavbarSections = (
  user: NonNullable<GetCurrentUserQuery["user"]>,
) => ({
  primaryLinks: [
    { label: "Home", href: getRoute("Home") },
    ...(user.role === "Creator"
      ? []
      : [{ label: "AI Search", href: getRoute("Search") }]),
    {
      label: "Campaigns",
      href: getRoute(user.role === "Creator" ? "Campaigns" : "YourCampaigns"),
    },
  ],
  secondaryLinks: [
    {
      label: "Profile",
      href: getRoute("Profile"),
    },
    {
      label: "Settings",
      href: getRoute("Settings"),
    },
  ],
  cta: undefined,
});
