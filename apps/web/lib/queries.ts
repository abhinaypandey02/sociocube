import { gql } from "../__generated__";

export const GET_CURRENT_USER = gql(`
  #graphql
  query GetCurrentUser {
    user: getCurrentUser {
      id
      email
      username
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
      instagramStats {
        username
      }
      bio
      username
      onboardingData {
        username
        name
        photo
        bio
        category
        city
        dob
        gender
        country
        currency {
          name
          symbol
        }
        state
        pricing{
          starting
        }
      }
      pictureUploadURL {
        uploadURL
        url
      }
    }
  }
`);

export const GET_FEATURED_SELLERS_AND_POSTS = gql(`
  #graphql
  query GetFeaturedSellers {
    sellers: getFeaturedSellers {
      username
      name
      photo
      bio
      category
      instagramStats {
        username
        followers
        er
      }
    }
    posts:getFeaturedPosts {
      mediaURL
      thumbnailURL
      creatorImage
      creatorName
      creatorUsername
      postURL
      likes
      er
    }
    postings: getFeaturedPostings {
      id
      price
      currency
      title
      open
      minimumAge
      maximumAge
      barter
      applicationsCount
      minimumFollowers
      externalLink
      user {
        photo
        companyName
        name
      }
    }
  }
`);

export const GET_SELLER = gql(`
  #graphql
  query GetSeller($username:String!) {
    getSeller(username: $username) {
      id
      name
      photo
      bio
      gender
      location {
          city
          country
          currency {
            name
            symbol
            code
          }
      }
      category
      dob
      pricing {
        starting
      }
      instagramMedia {
        thumbnail
        caption
        link
        likes
        comments
        er
      }
      instagramStats {
        followers
        mediaCount
        username
        er
        averageLikes
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
  query GetChat($userID: Int!) {
    chat: getChat(userID: $userID) {
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
      companyName
      bio
      photo
      category
      gender
      dob
      scopes
      username
      locationID {
        city
        country
        state
      }
      pricing {
        starting
      }
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
  query GetStates($countryID: Int!) {
    states: getStates(countryID: $countryID) {
      value
      label
    }
  }
`);

export const GET_CITIES = gql(`
  #graphql
  query GetCities($stateID: Int!) {
    cities: getCities(stateID: $stateID) {
      value
      label
    }
  }
`);
export const SEARCH_SELLERS = gql(`
  #graphql
  query SearchSellers($filters: SearchSellersFilters!) {
    sellers: searchSellers(filters: $filters) {
      name
      username
      photo
      bio
    }
  }
`);
export const IS_USERNAME_AVAILABLE = gql(`
  #graphql
  query IsUsernameAvailable($username: String!) {
    isUsernameAvailable(username:$username)
  }
`);

export const GET_POSTING = gql(`
  #graphql
  query GetPosting($id: Int!) {
    posting:getPosting(id: $id){
      id
      maximumAge
      platforms
      minimumFollowers
      user {
        name
        photo
        companyName
        id
      }
      deliverables
      externalLink
      applicationsCount
      description
      barter
      minimumAge
      open
      title
      currency
      price
      createdAt
      updatedAt
    }
  }
`);
export const GET_ALL_POSTINGS = gql(`
  #graphql
  query GetAllPostings {
    postings:getAllPostings {
      id
      maximumAge
      minimumFollowers
      user {
        name
        photo
        companyName
      }
      applicationsCount
      description
      barter
      minimumAge
      open
      title
      currency
      price
      createdAt
      platforms
      updatedAt
    }
  }
`);

export const GET_CURRENT_USER_APPLICATION_STATUS = gql(`
  #graphql
  query GetCurrentUserApplicationStatus($postingID:Float!) {
    user: getCurrentUser {
      id
      email
      name
      isOnboarded
      instagramStats {
        followers
      }
      dob
    }
    hasApplied: getHasUserApplied(postingID: $postingID)
  }
`);
