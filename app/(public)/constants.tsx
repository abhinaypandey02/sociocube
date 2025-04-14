import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

import type { GetCurrentUserQuery } from "@/__generated__/graphql";
import Logout from "@/app/(public)/components/logout";
import { getRoute } from "@/constants/routes";

export const NAVBAR_COMMON_ROUTES = [
  { label: "Home", href: getRoute("Home") },
  { label: "Search", href: getRoute("Search") },
  { label: "Campaigns", href: getRoute("Campaigns") },
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
      label: "Run a campaign",
      href: getRoute("Onboarding"),
    },

    {
      label: "Settings",
      href: getRoute("Profile"),
    },
    {
      label: "Logout",
      href: getRoute("Home"),
      render: <Logout />,
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
  user: GetCurrentUserQuery["user"],
) => ({
  primaryLinks: NAVBAR_COMMON_ROUTES,
  secondaryLinks: [
    ...(user?.isOnboarded
      ? [
          {
            label: "Your profile",
            href: `${getRoute("Profile")}/${user.username}`,
          },
          {
            label: "Campaigns",
            href: getRoute("Campaigns"),
          },
        ]
      : []),
    {
      label: "Settings",
      href: getRoute("Profile"),
    },
    {
      label: "Logout",
      href: getRoute("Home"),
      render: <Logout />,
    },
  ],
  cta: undefined,
});
