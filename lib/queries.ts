import { gql } from "@/__generated__";

export const GET_CURRENT_USER = gql(`
  #graphql
  query GetCurrentUser {
    user: getCurrentUser {
      id
      bio
      email
      username
      name
      photo
      role
      emailVerified
      isOnboarded
      instagramStats {
        username
        isVerified
      }
    }
  }
`);

export const GET_USER_CURRENCY = gql(`
  #graphql
  query GetUserCurrency {
    user: getCurrentUser {
        id
      locationID {
        country
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
      role
      isOnboarded
      instagramStats {
        username
      }
      bio
      username
      pricing {
        starting
      }
      gender
      category
      dob
      location {
        city
        currency
      }
      locationID {
        city
        country
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
    postings: getFeaturedPostings {
      id
      price
      platforms
      currency
      title
      open
      minimumAge
      maximumAge
      barter
      applicationsCount
      minimumFollowers
      externalLink
      description
      deliverables
      agency {
        photo
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
        role
        gender
        reviews {
          feedback
          rating
          name
          photo
          username
         
        }
        portfolio {
          caption
          id
          link
          imageURL
        }
        location {
          city
          country
          currency
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
          timestamp
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
      id
      user {
        id
        name
        photo
      }
      agency {
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
  query GetChat($conversationID: Int!) {
    chat: getChat(conversationID: $conversationID) {
      user {
        id
        name
        photo
      }
      agency {
        id
        name
        photo
      }
      id
      preview
      hasRead
      messages{
        body
        createdAt
        byAgency
      }
    }
  }
`);

export const GET_ACCOUNT_PORTFOLIO_DETAILS = gql(`
  #graphql
  query GetAccountPortfolioDetails {
    user: getCurrentUser {
        id
      portfolio {
          caption
          id
          link
          imageURL
        }
    }
  }
`);

export const GET_ACCOUNT_SOCIAL_DETAILS = gql(`
  #graphql
  query GetAccountSocialDetails {
    user: getCurrentUser {
        id
      instagramStats {
        username
        isVerified
        followers
        mediaCount
        er
        averageLikes
        averageComments
      }
    }
  }
`);

export const GET_ACCOUNT_PROFILE_DETAILS = gql(`
  #graphql
  query GetAccountProfileDetails {
    user: getCurrentUser {
        id
      name
      email
      emailVerified
      bio
      photo
      phone
      category
      gender
      role
      dob
      username
      locationID {
        city
        country
      }
      location {
        city
        country
      }
    }
  }
`);

export const GET_CITIES = gql(`
  #graphql
  query GetCities($countryID: Int!) {
    cities: getCities(countryID: $countryID) {
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
      category
      gender
      instagramStats {
        username
        isVerified
        followers
      }
      pricing {
        starting
      }
      location {
        city
        country
        currency
      }
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
        minimumFollowers
        externalLink
        extraDetails
        currencyCountry
        selectedCount
        agency {
            id
            name
            photo
            username
            instagramStats {
                isVerified
                username
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
        hasApplied
        eligibility
        updatedAt
        deliverables
        inReview
        reviews {
            rating
            photo
            username
        }
    }
  }
`);

export const GET_ALL_POSTINGS = gql(`
  #graphql
  query GetAllPostings($page:Float!) {
    postings:getAllPostings(page:$page) {
      id
      maximumAge
      minimumFollowers
      inReview
      externalLink
      extraDetails
        currencyCountry
      agency {
          id
        name
        photo
          username
        instagramStats {
          isVerified
            username
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
      hasApplied
      eligibility
      updatedAt
        deliverables
        reviews {
            rating
            photo
            username
        }  
    }
  }
`);

export const GET_USER_POSTINGS = gql(`
  #graphql
  query GetUserPostings($page: Float) {
    postings:getUserPostings(page: $page) {
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
      inReview
    }
  }
`);

export const GET_POSTING_APPLICATIONS = gql(`
  #graphql
  query GetPostingApplications($postingID:Int!) {
    posting: getPosting(id: $postingID){
      title
        id  
      extraDetails
      externalLink
    }
    applications:getPostingApplications(postingID: $postingID) {
      status
        hasReview
      createdAt
      id
      user {
          id  
        name
        photo
        dob
        email
        phone
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
export const GET_POSTING_SELECTED = gql(`
  #graphql
  query GetPostingSelected($postingID:Int!) {
    posting: getPosting(id: $postingID){
      title
      id  
      extraDetails
      externalLink
    }
    applications:getPostingSelected(postingID: $postingID) {
      status
      createdAt
        hasReview
      id
      user {
          id  
        name
        photo
        dob
        email
        phone
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
export const GET_POSTING_RECOMMENDATIONS = gql(`
  #graphql
  query GetPostingRecommendations($postingID:Int!) {
    posting: getPosting(id: $postingID){
      title
      externalLink
      extraDetails  
      id  
        recommendations {
            status
            user {
                id
                name
                photo
                dob
                email
                phone
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
        }
    }
  }
`);

export const VERIFY_EMAIL = gql(`
  #graphql
  query VerifyEmail($token:String!) {
    verifyEmail(token: $token)
  }
`);

export const GET_USER_APPLICATIONS = gql(`
  #graphql
  query GetUserApplications {
    getPendingReviews
    getUserApplications {
      status
      comment
      createdAt
      posting {
        title
        agency {
          name
          username
          photo
        }
        id
      }
    }
  }
`);

export const GET_SUBSCRIPTION = gql(`
  #graphql
  query GetSubscription {
      getSubscription{
          link
      }
  }
`);
