export enum Route {
  Home = "/",
  Login = "/login",
  SignUp = "/join",
  Account = "/account",
  Onboarding = "/onboarding",
  Profile = "/profile",
  Blogs = "/blogs",
  Chat = "/chat",
  Search = "/search",
  PrivacyPolicy = "/privacy-policy",
  TermsConditions = "/terms-and-conditions",
}

export function getRoute(route: keyof typeof Route) {
  return process.env.NEXT_PUBLIC_FRONTEND_BASE_URL + Route[route];
}
