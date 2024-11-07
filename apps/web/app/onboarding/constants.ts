import { GoogleLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { AuthScopes } from "../../__generated__/graphql";
import { DISCONNECT_GOOGLE, DISCONNECT_INSTAGRAM } from "../../lib/mutations";

export const ONBOARDING_SCOPES = [
  {
    title: "Instagram",
    icon: InstagramLogo,
    id: AuthScopes.Instagram,
    url: "/_auth/instagram",
    query: DISCONNECT_INSTAGRAM,
  },
];

export const ALL_SCOPES = [
  ...ONBOARDING_SCOPES,
  {
    title: "Google",
    icon: GoogleLogo,
    id: AuthScopes.Google,
    url: "/_auth/google",
    query: DISCONNECT_GOOGLE,
  },
];
