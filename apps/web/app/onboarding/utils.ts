import type { AuthScopes } from "../../__generated__/graphql";
import { ONBOARDING_SCOPES } from "./constants";

export function completedOnboardingScopes(userScopes: AuthScopes[]) {
  return ONBOARDING_SCOPES.filter((scope) => userScopes.includes(scope.id));
}
