export enum Route {
  Home = "/",
  Login = "/login",
  Forgot = "/forgot",
  SignUp = "/join",
  Onboarding = "/onboarding",
  Profile = "/profile",
  Settings = "/settings",
  Inbox = "/inbox",
  Chat = "/chat",
  Blogs = "/blogs",
  Search = "/search",
  PrivacyPolicy = "/privacy-policy",
  TermsConditions = "/terms-and-conditions",
  Campaigns = "/campaigns",
  ReviewCampaigns = "/review-campaigns",
  YourCampaigns = `/your-campaigns`,
  Applications = `/applications`,
  Explore = `/explore`,
  Selected = `/selected`,
  NewCampaign = `${YourCampaigns}/new`,
  Agencies = `/agencies`,
}

export function getRoute(route: keyof typeof Route) {
  return process.env.NEXT_PUBLIC_BASE_URL + Route[route];
}

export function getMeURL(username: string, clean?: boolean) {
  return `${clean ? "" : "https://"}${username}.sociocube.me`;
}
