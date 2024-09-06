import { gql } from "../__generated__";

export const GET_CURRENT_USER = gql(`
  #graphql
  query GetCurrentUser {
    getCurrentUser {
      email
      name
      photo
      isOnboarded
      scopes
    }
  }
`);

export const GET_DEFAULT_ONBOARDING_DETAILS = gql(`
  #graphql
  query GetDefaultOnboardingDetails {
    getCurrentUser {
      email
      name
      photo
      isOnboarded
      scopes
      onboardingData {
        name
        photo
      }
    }
  }
`);
