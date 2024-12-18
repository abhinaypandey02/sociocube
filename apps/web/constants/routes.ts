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
  Postings = "/postings",
}

export function getRoute(route: keyof typeof Route) {
  if (typeof window === "undefined") return Route[route];
  return (
    (window.location.origin === process.env.NEXT_PUBLIC_FRONTEND_BASE_URL
      ? ""
      : process.env.NEXT_PUBLIC_FRONTEND_BASE_URL) + Route[route]
  );
}

export function getMeURL(username: string) {
  return `https://${username}.freeluencers.me`;
}
