import { Route } from "../constants/routes";

export const NAVBAR_COMMON_ROUTES = [
  { label: "Home", href: Route.Home },
  { label: "Search", href: Route.Search },
  { label: "About us", href: "/#about-us" },
  { label: "FAQ", href: "/#faq" },
];

export const UNAUTHORISED_NAVBAR_SECTIONS = {
  primaryLinks: NAVBAR_COMMON_ROUTES,
  secondaryLinks: [
    {
      label: "Sign In",
      href: Route.Login,
    },
  ],
  cta: {
    button: {
      children: "Join Us",
    },
    href: Route.SignUp,
  },
};
export const AUTHORISED_USER_NAVBAR_SECTIONS = {
  primaryLinks: NAVBAR_COMMON_ROUTES,
  secondaryLinks: [
    {
      label: "Account",
      href: Route.Account,
    },
  ],
  cta: {
    button: {
      children: "List yourself",
      outline: true,
    },
    href: Route.Onboarding,
  },
};
export const AUTHORISED_SELLER_NAVBAR_SECTIONS = {
  ...AUTHORISED_USER_NAVBAR_SECTIONS,
  cta: undefined,
};
