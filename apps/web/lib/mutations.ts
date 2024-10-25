import { gql } from "../__generated__";

export const UPDATE_ONBOARDING_BASIC_DETAILS = gql(`
  #graphql
  mutation UpdateOnboardingBasicDetails($data: UpdateBasicDetailsArgs!) {
    updateOnboardingBasicDetails(data: $data)
  }
`);

export const UPDATE_ONBOARDING_LOCATION = gql(`
  #graphql
  mutation UpdateOnboardingLocation($data: UpdateLocationArgs!) {
    updateOnboardingLocation(data: $data)
  }
`);

export const UPDATE_ONBOARDING_PRICING = gql(`
  #graphql
  mutation UpdateOnboardingPricing($data: UpdatePricingArgs!) {
    updateOnboardingPricing(data: $data)
  }
`);

export const COMPLETE_ONBOARDING = gql(`
  #graphql
  mutation CompleteOnboarding {
    completeOnboarding
  }
`);

export const READ_MESSAGE = gql(`
  #graphql
  mutation ReadMessage($id:Int!) {
    readMessage(conversation: $id)
  }
`);

export const SEND_CHAT = gql(`
  #graphql
  mutation SendChat($data: SendMessage!) {
    sendMessage(data: $data)
  }
`);

export const UPDATE_USER = gql(`
  #graphql
  mutation UpdateUser($data: UpdateUserArgs!) {
    updateUser(data: $data)
  }
`);
