import { gql } from "../__generated__";

export const UPDATE_ONBOARDING_BASIC_DETAILS = gql(`
  #graphql
  mutation UpdateOnboardingBasicDetails($data: UpdateBasicDetailsArgs!) {
    updateOnboardingBasicDetails(data: $data)
  }
`);

export const COMPLETE_ONBOARDING = gql(`
  #graphql
  mutation CompleteOnboarding {
    completeOnboarding
  }
`);
