import type { AuthScopes } from "../../__generated__/graphql";
import { ONBOARDING_SCOPES } from "./constants";

export function hasOnboardingScopes(userScopes: AuthScopes[]) {
  return ONBOARDING_SCOPES.some((scope) => userScopes.includes(scope.id));
}
