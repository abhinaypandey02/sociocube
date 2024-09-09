import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { AuthScopes } from "../../__generated__/graphql";

export const ONBOARDING_SCOPES = [
  {
    title: "Instagram",
    icon: InstagramLogo,
    id: AuthScopes.Instagram,
    url: "/_auth/instagram",
  },
];
