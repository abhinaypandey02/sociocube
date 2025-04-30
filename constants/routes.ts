export enum Route {
  Home = "/",
  Login = "/login",
  Forgot = "/forgot",
  SignUp = "/join",
  Onboarding = "/onboarding",
  Profile = "/profile",
  Settings = "/settings",
  Chat = "/chat",
  Search = "/search",
  PrivacyPolicy = "/privacy-policy",
  TermsConditions = "/terms-and-conditions",
  Campaigns = "/campaigns",
  YourCampaigns = `/your-campaigns`,
  Applications = `/applications`,
  Explore = `/explore`,
  NewCampaign = `${YourCampaigns}/new`,
}

export function getRoute(route: keyof typeof Route) {
  return process.env.NEXT_PUBLIC_BASE_URL + Route[route];
}

export function getMeURL(username: string, clean?: boolean) {
  return `${clean ? "" : "https://"}${username}.sociocube.me`;
}
