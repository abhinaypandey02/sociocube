import { gql } from "../__generated__";

export const GET_CURRENT_USER = gql(`
  #graphql
  query GetCurrentUser {
    user: getCurrentUser {
      id
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
    sellers: getFeaturedSellers {
      id
      name
      photo
      bio
      instagramStats {
        username
        followers
      }
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

export const GET_CHATS = gql(`
  #graphql
  query GetChats {
    chats:getChats {
      preview
      conversation
      with {
        id
        name
        photo
      }
      hasRead
    }
  }
`);
export const GET_CHAT = gql(`
  #graphql
  query GetChat($userid: Int!) {
    chat: getChat(user: $userid) {
      with {
        id
        name
        photo
      }
      conversation
      hasRead
      messages{
        body
        sentAt
        sender
      }
    }
  }
`);

export const GET_ACCOUNT_DETAILS = gql(`
  #graphql
  query GetAccountDetails {
    user: getCurrentUser {
      name
      bio
      photo
      pictureUploadURL {
        uploadURL
        url
      }
    }
  }
`);
