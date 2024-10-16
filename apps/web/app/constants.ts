import { Route } from "../constants/routes";

export const NAVBAR_COMMON_ROUTES = [{ label: "Home", href: Route.Home }];

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
      children: "Register",
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
      children: "Start Selling",
      outline: true,
    },
    href: Route.Onboarding,
  },
};
export const AUTHORISED_SELLER_NAVBAR_SECTIONS = {
  ...AUTHORISED_USER_NAVBAR_SECTIONS,
  cta: undefined,
};
