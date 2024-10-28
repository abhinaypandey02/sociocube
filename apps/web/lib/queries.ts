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
      id
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
        category
        city
        dob
        gender
        country
        state
        pricing{
          general
        }
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
      id
      name
      photo
      bio
      gender
      location {
          city
          country
      }
      category
      dob
      pricing {
        general
      }
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
      id: conversation
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
      id: conversation
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
      id
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

export const GET_COUNTRIES = gql(`
  #graphql
  query GetCountries {
    countries: getCountries {
      value
      label
    }
  }
`);
export const GET_STATES = gql(`
  #graphql
  query GetStates($country: Int!) {
    states: getStates(country: $country) {
      value
      label
    }
  }
`);

export const GET_CITIES = gql(`
  #graphql
  query GetCities($state: Int!) {
    cities: getCities(state: $state) {
      value
      label
    }
  }
`);
export const SEARCH_SELLERS = gql(`
  #graphql
  query SearchSellers($data: SearchSellers!) {
    sellers: searchSellers(data: $data) {
      name
      id
      photo
      bio
    }
  }
`);
