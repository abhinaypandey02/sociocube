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
      bio
      onboardingData {
        name
        photo
        bio
      }
      pictureUploadURL {
        uploadURL
        url
      }
    }
  }
`);

export const GET_FEATURED_SELLERS = gql(`
  #graphql
  query GetFeaturedSellers {
    getFeaturedSellers {
      id
      name
      photo
      bio
    }
  }
`);

export const GET_SELLER = gql(`
  #graphql
  query GetSeller($id: Int!) {
    getSeller(id: $id) {
      name
      photo
      bio
      instagramMedia {
        thumbnail
        caption
        link
      }
      instagramStats {
        followers
        mediaCount
        username
      }
    }
  }
`);
