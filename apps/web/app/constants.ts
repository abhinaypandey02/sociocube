import { Route } from "../constants/routes";

export const NAVBAR_COMMON_ROUTES = [[{ label: "Home", href: Route.Home }]];

export const UNAUTHORISED_NAVBAR_SECTIONS = [
  ...NAVBAR_COMMON_ROUTES,
  [
    {
      label: {
        children: "Login",
        outline: true,
      },
      href: Route.Login,
    },
    {
      label: {
        children: "Register",
      },
      href: Route.SignUp,
    },
  ],
];
export const AUTHORISED_USER_NAVBAR_SECTIONS = [
  ...NAVBAR_COMMON_ROUTES,
  [
    {
      label: {
        children: "Start Selling",
        outline: true,
      },
      href: Route.Onboarding,
    },
    {
      label: {
        children: "Account",
      },
      href: Route.Account,
    },
  ],
];
export const AUTHORISED_SELLER_NAVBAR_SECTIONS = [
  ...NAVBAR_COMMON_ROUTES,
  [
    {
      label: {
        children: "Account",
      },
      href: Route.Account,
    },
  ],
];
