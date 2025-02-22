export enum Route {
  Home = "/",
  Login = "/login",
  Forgot = "/forgot",
  SignUp = "/join",
  Account = "/account",
  Onboarding = "/onboarding",
  AgencyOnboarding = "/agency-onboarding",
  Profile = "/profile",
  Blogs = "/blogs",
  Chat = "/chat",
  Search = "/search",
  PrivacyPolicy = "/privacy-policy",
  TermsConditions = "/terms-and-conditions",
  Postings = "/postings",
  AccountPostings = `${Account}/postings`,
  AccountApplications = `${Account}/applications`,
  AccountPostingsEdit = `${AccountPostings}/edit`,
  AccountPostingsNew = `${AccountPostings}/new`,
  AccountPostingsApplications = `${AccountPostings}/applications`,
}

export function getRoute(route: keyof typeof Route) {
  return process.env.NEXT_PUBLIC_FRONTEND_BASE_URL + Route[route];
}

export function getMeURL(username: string, clean?: boolean) {
  return `${clean ? "" : "https://"}${username}.sociocube.me`;
}
