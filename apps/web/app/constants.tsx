import { getRoute } from "../constants/routes";
import type { GetCurrentUserQuery } from "../__generated__/graphql";
import { AgencyMemberType } from "../__generated__/graphql";
import Logout from "./components/logout";
import GetVerifiedOption from "./components/get-verified-option";

export const NAVBAR_COMMON_ROUTES = [
  { label: "Home", href: getRoute("Home") },
  { label: "Search", href: getRoute("Search") },
  { label: "Campaigns", href: getRoute("Postings") },
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
      children: "Join Us",
    },
    href: getRoute("SignUp"),
  },
};
export const AUTHORISED_USER_NAVBAR_SECTIONS = {
  primaryLinks: NAVBAR_COMMON_ROUTES,
  secondaryLinks: [
    {
      label: "Run a campaign",
      href: getRoute("AgencyOnboarding"),
    },
    {
      label: "Start an agency",
      href: getRoute("AgencyOnboarding"),
    },

    {
      label: "Settings",
      href: getRoute("Account"),
    },
    {
      label: "Logout",
      href: getRoute("Account"),
      render: <Logout />,
    },
  ],
  cta: {
    button: {
      children: "List yourself",
      outline: true,
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
            label: "Your applications",
            href: getRoute("AccountApplications"),
          },
        ]
      : []),
    ...(user?.agencies.length
      ? [
          {
            label: "Your campaigns",
            href: getRoute("AccountPostings"),
          },
        ]
      : []),
    ...(!user?.agencies.some((agency) => agency.type === AgencyMemberType.Owner)
      ? [
          {
            label: "Start an agency",
            href: getRoute("AgencyOnboarding"),
          },
        ]
      : []),
    ...(!user?.isOnboarded || user.instagramStats?.isVerified
      ? []
      : [
          {
            label: "Verify",
            href: getRoute("Home"),
            render: <GetVerifiedOption />,
          },
        ]),

    ...(user?.agencies.length
      ? [
          {
            label: "Agency settings",
            href: getRoute("AccountAgency"),
          },
        ]
      : []),
    {
      label: "Settings",
      href: getRoute("Account"),
    },
    {
      label: "Logout",
      href: getRoute("Account"),
      render: <Logout />,
    },
  ],
  cta: undefined,
});
