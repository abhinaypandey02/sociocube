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
      instagramStats {
        isVerified
      }
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
        isVerified
      }
    }
    posts:getFeaturedPosts {
      mediaURL
      thumbnailURL
      creatorImage
      creatorName
      creatorUsername
      creatorVerified
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
        name
        instagramStats {
          isVerified
        }
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
      portfolio {
        caption
        id
        link
        imageURL
      }
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
        isVerified
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
      contactEmail
      bio
      photo
      phone
      category
      gender
      dob
      username
      instagramStats {
        isVerified
      }
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

export const GET_USER_CURRENCY = gql(`
  #graphql
  query GetUserCurrency {
    user: getCurrentUser {
      instagramStats {
        isVerified
      }
      locationID {
        country
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
      currencyCountry
      extraDetails
      user {
        name
        photo
        id
        instagramStats {
          isVerified
        }
        username
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
        instagramStats {
          isVerified
        }
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
      contactEmail
      dob
      phone
    }
    hasApplied: getHasUserApplied(postingID: $postingID)
  }
`);

export const GET_USER_POSTINGS = gql(`
  #graphql
  query GetUserPostings {
    user: getCurrentUser {
      instagramStats {
        isVerified
      }
    }
    postings:getUserPostings {
      id
      maximumAge
      referralEarnings
      minimumFollowers
      applicationsCount
      description
      barter
      minimumAge
      extraDetails
      open
      title
      currency
      price
      createdAt
      platforms
      updatedAt
      deliverables
      currencyCountry
    }
  }
`);

export const GET_POSTING_APPLICATIONS = gql(`
  #graphql
  query GetPostingApplications($postingID:Int!) {
    posting: getPosting(id: $postingID){
      title
      extraDetails
      externalLink
    }
    applications:getPostingApplications(postingID: $postingID) {
      email
      referralEarnings
      phone
      user {
        name
        photo
        dob
        email
        gender
        bio
        username
        instagramStats {
          isVerified
          username
          followers
          averageLikes
          averageComments
          er
          mediaCount
        }
      }
      comment
    }
  }
`);

export const VERIFY_EMAIL = gql(`
  #graphql
  query VerifyEmail($token:String!) {
    verifyEmail(token: $token)
  }
`);

export const GET_PORTFOLIO_UPLOAD_URL = gql(`
  #graphql
  query GetPortfolioUploadURL {
    user:getCurrentUser {
      id
    }
    uploadURL: getPortfolioUploadURL {
      uploadURL
      url
    }
  }
`);
