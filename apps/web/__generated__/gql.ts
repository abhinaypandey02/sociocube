/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  #graphql\n  mutation UpdateOnboardingBasicDetails($basicDetails: OnboardingBasicDetailsInput!) {\n    updateOnboardingBasicDetails(basicDetails: $basicDetails)\n  }\n": types.UpdateOnboardingBasicDetailsDocument,
    "\n  #graphql\n  mutation UpdateOnboardingDOB($dobDetails: OnboardingDOBInput!) {\n    updateOnboardingDOB(dobDetails: $dobDetails)\n  }\n": types.UpdateOnboardingDobDocument,
    "\n  #graphql\n  mutation UpdateOnboardingInstagramUsername($username: String!) {\n    updateOnboardingInstagramUsername(username: $username)\n  }\n": types.UpdateOnboardingInstagramUsernameDocument,
    "\n  #graphql\n  mutation UpdateOnboardingUsername($usernameDetails: OnboardingUsernameInput!) {\n    updateOnboardingUsername(usernameDetails: $usernameDetails)\n  }\n": types.UpdateOnboardingUsernameDocument,
    "\n  #graphql\n  mutation UpdateOnboardingLocation($locationDetails: OnboardingLocationInput!) {\n    updateOnboardingLocation(locationDetails: $locationDetails){\n      name\n      symbol\n    }\n  }\n": types.UpdateOnboardingLocationDocument,
    "\n  #graphql\n  mutation UpdateOnboardingPricing($pricingDetails: OnboardingPriceInput!) {\n    updateOnboardingPricing(pricingDetails: $pricingDetails)\n  }\n": types.UpdateOnboardingPricingDocument,
    "\n  #graphql\n  mutation CompleteOnboarding {\n    completeOnboarding\n  }\n": types.CompleteOnboardingDocument,
    "\n  #graphql\n  mutation ReadMessage($conversationID:Int!) {\n    readMessage(conversationID: $conversationID)\n  }\n": types.ReadMessageDocument,
    "\n  #graphql\n  mutation SendChat($conversationID: Int!, $body:String!) {\n    sendMessage(conversationID: $conversationID, body: $body)\n  }\n": types.SendChatDocument,
    "\n  #graphql\n  mutation UpdateUser($updatedUser: UpdateUserInput!) {\n    updateUser(updatedUser: $updatedUser)\n  }\n": types.UpdateUserDocument,
    "\n  #graphql\n  mutation UpdateUserLocation($updatedLocation: UpdateLocation!) {\n    updateUserLocation(updatedLocation: $updatedLocation)\n  }\n": types.UpdateUserLocationDocument,
    "\n  #graphql\n  mutation DisconnectInstagram {\n    disconnectInstagram\n  }\n": types.DisconnectInstagramDocument,
    "\n  #graphql\n  mutation DisconnectGoogle {\n    disconnectGoogle\n  }\n": types.DisconnectGoogleDocument,
    "\n  #graphql\n  mutation ApplyNow($postingID:Float!, $email:String!, $comment:String) {\n    applyToPosting(postingID: $postingID, email: $email, comment: $comment)  \n  }\n": types.ApplyNowDocument,
    "\n  #graphql\n  mutation DeletePosting($postingID:Float!) {\n    deletePosting(postingID: $postingID)  \n  }\n": types.DeletePostingDocument,
    "\n  #graphql\n  mutation PausePosting($postingID:Float!) {\n    pausePosting(postingID: $postingID)  \n  }\n": types.PausePostingDocument,
    "\n  #graphql\n  mutation ResumePosting($postingID:Float!) {\n    resumePosting(postingID: $postingID)  \n  }\n": types.ResumePostingDocument,
    "\n  #graphql\n  mutation CreatePosting($newPosting:NewPostingInput!) {\n    createPosting(newPosting: $newPosting)  \n  }\n": types.CreatePostingDocument,
    "\n  #graphql\n  mutation UpdatePosting($newPosting:UpdatePostingInput!, $id:Float!) {\n    updatePosting(id:$id,updatedPosting: $newPosting)  \n  }\n": types.UpdatePostingDocument,
    "\n  #graphql\n  query GetCurrentUser {\n    user: getCurrentUser {\n      id\n      email\n      username\n      name\n      photo\n      isOnboarded\n      scopes\n      instagramStats {\n        isVerified\n      }\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  #graphql\n  query GetDefaultOnboardingDetails {\n    getCurrentUser {\n      id\n      email\n      name\n      photo\n      isOnboarded\n      instagramStats {\n        username\n      }\n      bio\n      username\n      onboardingData {\n        username\n        name\n        photo\n        bio\n        category\n        city\n        dob\n        gender\n        country\n        currency {\n          name\n          symbol\n        }\n        state\n        pricing{\n          starting\n        }\n      }\n      pictureUploadURL {\n        uploadURL\n        url\n      }\n    }\n  }\n": types.GetDefaultOnboardingDetailsDocument,
    "\n  #graphql\n  query GetFeaturedSellers {\n    sellers: getFeaturedSellers {\n      username\n      name\n      photo\n      bio\n      category\n      instagramStats {\n        username\n        followers\n        er\n        isVerified\n      }\n    }\n    posts:getFeaturedPosts {\n      mediaURL\n      thumbnailURL\n      creatorImage\n      creatorName\n      creatorUsername\n      postURL\n      likes\n      er\n    }\n    postings: getFeaturedPostings {\n      id\n      price\n      currency\n      title\n      open\n      minimumAge\n      maximumAge\n      barter\n      applicationsCount\n      minimumFollowers\n      externalLink\n      user {\n        photo\n        companyName\n        name\n      }\n    }\n  }\n": types.GetFeaturedSellersDocument,
    "\n  #graphql\n  query GetSeller($username:String!) {\n    getSeller(username: $username) {\n      id\n      name\n      photo\n      bio\n      gender\n      location {\n          city\n          country\n          currency {\n            name\n            symbol\n            code\n          }\n      }\n      category\n      dob\n      pricing {\n        starting\n      }\n      instagramMedia {\n        thumbnail\n        caption\n        link\n        likes\n        comments\n        er\n      }\n      instagramStats {\n        followers\n        mediaCount\n        username\n        er\n        averageLikes\n        isVerified\n      }\n    }\n  }\n": types.GetSellerDocument,
    "\n  #graphql\n  query GetChats {\n    chats:getChats {\n      preview\n      id: conversation\n      with {\n        id\n        name\n        photo\n      }\n      hasRead\n    }\n  }\n": types.GetChatsDocument,
    "\n  #graphql\n  query GetChat($userID: Int!) {\n    chat: getChat(userID: $userID) {\n      with {\n        id\n        name\n        photo\n      }\n      id: conversation\n      hasRead\n      messages{\n        body\n        sentAt\n        sender\n      }\n    }\n  }\n": types.GetChatDocument,
    "\n  #graphql\n  query GetAccountDetails {\n    user: getCurrentUser {\n      id\n      name\n      companyName\n      bio\n      photo\n      category\n      gender\n      dob\n      scopes\n      username\n      locationID {\n        city\n        country\n        state\n      }\n      pricing {\n        starting\n      }\n      pictureUploadURL {\n        uploadURL\n        url\n      }\n    }\n  }\n": types.GetAccountDetailsDocument,
    "\n  #graphql\n  query GetUserCurrency {\n    user: getCurrentUser {\n      locationID {\n        country\n      }\n    }\n  }\n": types.GetUserCurrencyDocument,
    "\n  #graphql\n  query GetCountries {\n    countries: getCountries {\n      value\n      label\n    }\n  }\n": types.GetCountriesDocument,
    "\n  #graphql\n  query GetStates($countryID: Int!) {\n    states: getStates(countryID: $countryID) {\n      value\n      label\n    }\n  }\n": types.GetStatesDocument,
    "\n  #graphql\n  query GetCities($stateID: Int!) {\n    cities: getCities(stateID: $stateID) {\n      value\n      label\n    }\n  }\n": types.GetCitiesDocument,
    "\n  #graphql\n  query SearchSellers($filters: SearchSellersFilters!) {\n    sellers: searchSellers(filters: $filters) {\n      name\n      username\n      photo\n      bio\n    }\n  }\n": types.SearchSellersDocument,
    "\n  #graphql\n  query IsUsernameAvailable($username: String!) {\n    isUsernameAvailable(username:$username)\n  }\n": types.IsUsernameAvailableDocument,
    "\n  #graphql\n  query GetPosting($id: Int!) {\n    posting:getPosting(id: $id){\n      id\n      maximumAge\n      platforms\n      minimumFollowers\n      currencyCountry\n      extraDetails\n      user {\n        name\n        photo\n        companyName\n        id\n      }\n      deliverables\n      externalLink\n      applicationsCount\n      description\n      barter\n      minimumAge\n      open\n      title\n      currency\n      price\n      createdAt\n      updatedAt\n    }\n  }\n": types.GetPostingDocument,
    "\n  #graphql\n  query GetAllPostings {\n    postings:getAllPostings {\n      id\n      maximumAge\n      minimumFollowers\n      user {\n        name\n        photo\n        companyName\n      }\n      applicationsCount\n      description\n      barter\n      minimumAge\n      open\n      title\n      currency\n      price\n      createdAt\n      platforms\n      updatedAt\n    }\n  }\n": types.GetAllPostingsDocument,
    "\n  #graphql\n  query GetCurrentUserApplicationStatus($postingID:Float!) {\n    user: getCurrentUser {\n      id\n      email\n      name\n      isOnboarded\n      instagramStats {\n        followers\n      }\n      dob\n    }\n    hasApplied: getHasUserApplied(postingID: $postingID)\n  }\n": types.GetCurrentUserApplicationStatusDocument,
    "\n  #graphql\n  query GetUserPostings {\n    postings:getUserPostings {\n      id\n      maximumAge\n      minimumFollowers\n      user {\n        name\n        photo\n        companyName\n      }\n      applicationsCount\n      description\n      barter\n      minimumAge\n      extraDetails\n      open\n      title\n      currency\n      price\n      createdAt\n      platforms\n      updatedAt\n      deliverables\n      currencyCountry\n    }\n  }\n": types.GetUserPostingsDocument,
    "\n  #graphql\n  query GetPostingApplications($postingID:Int!) {\n    posting: getPosting(id: $postingID){\n      title\n      extraDetails\n    }\n    applications:getPostingApplications(postingID: $postingID) {\n      email\n      user {\n        name\n        photo\n        dob\n        email\n        gender\n        bio\n        username\n        instagramStats {\n          isVerified\n          username\n          followers\n          averageLikes\n          averageComments\n          er\n          mediaCount\n        }\n      }\n      comment\n    }\n  }\n": types.GetPostingApplicationsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation UpdateOnboardingBasicDetails($basicDetails: OnboardingBasicDetailsInput!) {\n    updateOnboardingBasicDetails(basicDetails: $basicDetails)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UpdateOnboardingBasicDetails($basicDetails: OnboardingBasicDetailsInput!) {\n    updateOnboardingBasicDetails(basicDetails: $basicDetails)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation UpdateOnboardingDOB($dobDetails: OnboardingDOBInput!) {\n    updateOnboardingDOB(dobDetails: $dobDetails)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UpdateOnboardingDOB($dobDetails: OnboardingDOBInput!) {\n    updateOnboardingDOB(dobDetails: $dobDetails)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation UpdateOnboardingInstagramUsername($username: String!) {\n    updateOnboardingInstagramUsername(username: $username)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UpdateOnboardingInstagramUsername($username: String!) {\n    updateOnboardingInstagramUsername(username: $username)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation UpdateOnboardingUsername($usernameDetails: OnboardingUsernameInput!) {\n    updateOnboardingUsername(usernameDetails: $usernameDetails)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UpdateOnboardingUsername($usernameDetails: OnboardingUsernameInput!) {\n    updateOnboardingUsername(usernameDetails: $usernameDetails)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation UpdateOnboardingLocation($locationDetails: OnboardingLocationInput!) {\n    updateOnboardingLocation(locationDetails: $locationDetails){\n      name\n      symbol\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UpdateOnboardingLocation($locationDetails: OnboardingLocationInput!) {\n    updateOnboardingLocation(locationDetails: $locationDetails){\n      name\n      symbol\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation UpdateOnboardingPricing($pricingDetails: OnboardingPriceInput!) {\n    updateOnboardingPricing(pricingDetails: $pricingDetails)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UpdateOnboardingPricing($pricingDetails: OnboardingPriceInput!) {\n    updateOnboardingPricing(pricingDetails: $pricingDetails)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation CompleteOnboarding {\n    completeOnboarding\n  }\n"): (typeof documents)["\n  #graphql\n  mutation CompleteOnboarding {\n    completeOnboarding\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation ReadMessage($conversationID:Int!) {\n    readMessage(conversationID: $conversationID)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation ReadMessage($conversationID:Int!) {\n    readMessage(conversationID: $conversationID)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation SendChat($conversationID: Int!, $body:String!) {\n    sendMessage(conversationID: $conversationID, body: $body)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation SendChat($conversationID: Int!, $body:String!) {\n    sendMessage(conversationID: $conversationID, body: $body)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation UpdateUser($updatedUser: UpdateUserInput!) {\n    updateUser(updatedUser: $updatedUser)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UpdateUser($updatedUser: UpdateUserInput!) {\n    updateUser(updatedUser: $updatedUser)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation UpdateUserLocation($updatedLocation: UpdateLocation!) {\n    updateUserLocation(updatedLocation: $updatedLocation)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UpdateUserLocation($updatedLocation: UpdateLocation!) {\n    updateUserLocation(updatedLocation: $updatedLocation)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation DisconnectInstagram {\n    disconnectInstagram\n  }\n"): (typeof documents)["\n  #graphql\n  mutation DisconnectInstagram {\n    disconnectInstagram\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation DisconnectGoogle {\n    disconnectGoogle\n  }\n"): (typeof documents)["\n  #graphql\n  mutation DisconnectGoogle {\n    disconnectGoogle\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation ApplyNow($postingID:Float!, $email:String!, $comment:String) {\n    applyToPosting(postingID: $postingID, email: $email, comment: $comment)  \n  }\n"): (typeof documents)["\n  #graphql\n  mutation ApplyNow($postingID:Float!, $email:String!, $comment:String) {\n    applyToPosting(postingID: $postingID, email: $email, comment: $comment)  \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation DeletePosting($postingID:Float!) {\n    deletePosting(postingID: $postingID)  \n  }\n"): (typeof documents)["\n  #graphql\n  mutation DeletePosting($postingID:Float!) {\n    deletePosting(postingID: $postingID)  \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation PausePosting($postingID:Float!) {\n    pausePosting(postingID: $postingID)  \n  }\n"): (typeof documents)["\n  #graphql\n  mutation PausePosting($postingID:Float!) {\n    pausePosting(postingID: $postingID)  \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation ResumePosting($postingID:Float!) {\n    resumePosting(postingID: $postingID)  \n  }\n"): (typeof documents)["\n  #graphql\n  mutation ResumePosting($postingID:Float!) {\n    resumePosting(postingID: $postingID)  \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation CreatePosting($newPosting:NewPostingInput!) {\n    createPosting(newPosting: $newPosting)  \n  }\n"): (typeof documents)["\n  #graphql\n  mutation CreatePosting($newPosting:NewPostingInput!) {\n    createPosting(newPosting: $newPosting)  \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation UpdatePosting($newPosting:UpdatePostingInput!, $id:Float!) {\n    updatePosting(id:$id,updatedPosting: $newPosting)  \n  }\n"): (typeof documents)["\n  #graphql\n  mutation UpdatePosting($newPosting:UpdatePostingInput!, $id:Float!) {\n    updatePosting(id:$id,updatedPosting: $newPosting)  \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetCurrentUser {\n    user: getCurrentUser {\n      id\n      email\n      username\n      name\n      photo\n      isOnboarded\n      scopes\n      instagramStats {\n        isVerified\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetCurrentUser {\n    user: getCurrentUser {\n      id\n      email\n      username\n      name\n      photo\n      isOnboarded\n      scopes\n      instagramStats {\n        isVerified\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetDefaultOnboardingDetails {\n    getCurrentUser {\n      id\n      email\n      name\n      photo\n      isOnboarded\n      instagramStats {\n        username\n      }\n      bio\n      username\n      onboardingData {\n        username\n        name\n        photo\n        bio\n        category\n        city\n        dob\n        gender\n        country\n        currency {\n          name\n          symbol\n        }\n        state\n        pricing{\n          starting\n        }\n      }\n      pictureUploadURL {\n        uploadURL\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetDefaultOnboardingDetails {\n    getCurrentUser {\n      id\n      email\n      name\n      photo\n      isOnboarded\n      instagramStats {\n        username\n      }\n      bio\n      username\n      onboardingData {\n        username\n        name\n        photo\n        bio\n        category\n        city\n        dob\n        gender\n        country\n        currency {\n          name\n          symbol\n        }\n        state\n        pricing{\n          starting\n        }\n      }\n      pictureUploadURL {\n        uploadURL\n        url\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetFeaturedSellers {\n    sellers: getFeaturedSellers {\n      username\n      name\n      photo\n      bio\n      category\n      instagramStats {\n        username\n        followers\n        er\n        isVerified\n      }\n    }\n    posts:getFeaturedPosts {\n      mediaURL\n      thumbnailURL\n      creatorImage\n      creatorName\n      creatorUsername\n      postURL\n      likes\n      er\n    }\n    postings: getFeaturedPostings {\n      id\n      price\n      currency\n      title\n      open\n      minimumAge\n      maximumAge\n      barter\n      applicationsCount\n      minimumFollowers\n      externalLink\n      user {\n        photo\n        companyName\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetFeaturedSellers {\n    sellers: getFeaturedSellers {\n      username\n      name\n      photo\n      bio\n      category\n      instagramStats {\n        username\n        followers\n        er\n        isVerified\n      }\n    }\n    posts:getFeaturedPosts {\n      mediaURL\n      thumbnailURL\n      creatorImage\n      creatorName\n      creatorUsername\n      postURL\n      likes\n      er\n    }\n    postings: getFeaturedPostings {\n      id\n      price\n      currency\n      title\n      open\n      minimumAge\n      maximumAge\n      barter\n      applicationsCount\n      minimumFollowers\n      externalLink\n      user {\n        photo\n        companyName\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetSeller($username:String!) {\n    getSeller(username: $username) {\n      id\n      name\n      photo\n      bio\n      gender\n      location {\n          city\n          country\n          currency {\n            name\n            symbol\n            code\n          }\n      }\n      category\n      dob\n      pricing {\n        starting\n      }\n      instagramMedia {\n        thumbnail\n        caption\n        link\n        likes\n        comments\n        er\n      }\n      instagramStats {\n        followers\n        mediaCount\n        username\n        er\n        averageLikes\n        isVerified\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetSeller($username:String!) {\n    getSeller(username: $username) {\n      id\n      name\n      photo\n      bio\n      gender\n      location {\n          city\n          country\n          currency {\n            name\n            symbol\n            code\n          }\n      }\n      category\n      dob\n      pricing {\n        starting\n      }\n      instagramMedia {\n        thumbnail\n        caption\n        link\n        likes\n        comments\n        er\n      }\n      instagramStats {\n        followers\n        mediaCount\n        username\n        er\n        averageLikes\n        isVerified\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetChats {\n    chats:getChats {\n      preview\n      id: conversation\n      with {\n        id\n        name\n        photo\n      }\n      hasRead\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetChats {\n    chats:getChats {\n      preview\n      id: conversation\n      with {\n        id\n        name\n        photo\n      }\n      hasRead\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetChat($userID: Int!) {\n    chat: getChat(userID: $userID) {\n      with {\n        id\n        name\n        photo\n      }\n      id: conversation\n      hasRead\n      messages{\n        body\n        sentAt\n        sender\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetChat($userID: Int!) {\n    chat: getChat(userID: $userID) {\n      with {\n        id\n        name\n        photo\n      }\n      id: conversation\n      hasRead\n      messages{\n        body\n        sentAt\n        sender\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetAccountDetails {\n    user: getCurrentUser {\n      id\n      name\n      companyName\n      bio\n      photo\n      category\n      gender\n      dob\n      scopes\n      username\n      locationID {\n        city\n        country\n        state\n      }\n      pricing {\n        starting\n      }\n      pictureUploadURL {\n        uploadURL\n        url\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetAccountDetails {\n    user: getCurrentUser {\n      id\n      name\n      companyName\n      bio\n      photo\n      category\n      gender\n      dob\n      scopes\n      username\n      locationID {\n        city\n        country\n        state\n      }\n      pricing {\n        starting\n      }\n      pictureUploadURL {\n        uploadURL\n        url\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetUserCurrency {\n    user: getCurrentUser {\n      locationID {\n        country\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetUserCurrency {\n    user: getCurrentUser {\n      locationID {\n        country\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetCountries {\n    countries: getCountries {\n      value\n      label\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetCountries {\n    countries: getCountries {\n      value\n      label\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetStates($countryID: Int!) {\n    states: getStates(countryID: $countryID) {\n      value\n      label\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetStates($countryID: Int!) {\n    states: getStates(countryID: $countryID) {\n      value\n      label\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetCities($stateID: Int!) {\n    cities: getCities(stateID: $stateID) {\n      value\n      label\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetCities($stateID: Int!) {\n    cities: getCities(stateID: $stateID) {\n      value\n      label\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query SearchSellers($filters: SearchSellersFilters!) {\n    sellers: searchSellers(filters: $filters) {\n      name\n      username\n      photo\n      bio\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query SearchSellers($filters: SearchSellersFilters!) {\n    sellers: searchSellers(filters: $filters) {\n      name\n      username\n      photo\n      bio\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query IsUsernameAvailable($username: String!) {\n    isUsernameAvailable(username:$username)\n  }\n"): (typeof documents)["\n  #graphql\n  query IsUsernameAvailable($username: String!) {\n    isUsernameAvailable(username:$username)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetPosting($id: Int!) {\n    posting:getPosting(id: $id){\n      id\n      maximumAge\n      platforms\n      minimumFollowers\n      currencyCountry\n      extraDetails\n      user {\n        name\n        photo\n        companyName\n        id\n      }\n      deliverables\n      externalLink\n      applicationsCount\n      description\n      barter\n      minimumAge\n      open\n      title\n      currency\n      price\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetPosting($id: Int!) {\n    posting:getPosting(id: $id){\n      id\n      maximumAge\n      platforms\n      minimumFollowers\n      currencyCountry\n      extraDetails\n      user {\n        name\n        photo\n        companyName\n        id\n      }\n      deliverables\n      externalLink\n      applicationsCount\n      description\n      barter\n      minimumAge\n      open\n      title\n      currency\n      price\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetAllPostings {\n    postings:getAllPostings {\n      id\n      maximumAge\n      minimumFollowers\n      user {\n        name\n        photo\n        companyName\n      }\n      applicationsCount\n      description\n      barter\n      minimumAge\n      open\n      title\n      currency\n      price\n      createdAt\n      platforms\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetAllPostings {\n    postings:getAllPostings {\n      id\n      maximumAge\n      minimumFollowers\n      user {\n        name\n        photo\n        companyName\n      }\n      applicationsCount\n      description\n      barter\n      minimumAge\n      open\n      title\n      currency\n      price\n      createdAt\n      platforms\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetCurrentUserApplicationStatus($postingID:Float!) {\n    user: getCurrentUser {\n      id\n      email\n      name\n      isOnboarded\n      instagramStats {\n        followers\n      }\n      dob\n    }\n    hasApplied: getHasUserApplied(postingID: $postingID)\n  }\n"): (typeof documents)["\n  #graphql\n  query GetCurrentUserApplicationStatus($postingID:Float!) {\n    user: getCurrentUser {\n      id\n      email\n      name\n      isOnboarded\n      instagramStats {\n        followers\n      }\n      dob\n    }\n    hasApplied: getHasUserApplied(postingID: $postingID)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetUserPostings {\n    postings:getUserPostings {\n      id\n      maximumAge\n      minimumFollowers\n      user {\n        name\n        photo\n        companyName\n      }\n      applicationsCount\n      description\n      barter\n      minimumAge\n      extraDetails\n      open\n      title\n      currency\n      price\n      createdAt\n      platforms\n      updatedAt\n      deliverables\n      currencyCountry\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetUserPostings {\n    postings:getUserPostings {\n      id\n      maximumAge\n      minimumFollowers\n      user {\n        name\n        photo\n        companyName\n      }\n      applicationsCount\n      description\n      barter\n      minimumAge\n      extraDetails\n      open\n      title\n      currency\n      price\n      createdAt\n      platforms\n      updatedAt\n      deliverables\n      currencyCountry\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetPostingApplications($postingID:Int!) {\n    posting: getPosting(id: $postingID){\n      title\n      extraDetails\n    }\n    applications:getPostingApplications(postingID: $postingID) {\n      email\n      user {\n        name\n        photo\n        dob\n        email\n        gender\n        bio\n        username\n        instagramStats {\n          isVerified\n          username\n          followers\n          averageLikes\n          averageComments\n          er\n          mediaCount\n        }\n      }\n      comment\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetPostingApplications($postingID:Int!) {\n    posting: getPosting(id: $postingID){\n      title\n      extraDetails\n    }\n    applications:getPostingApplications(postingID: $postingID) {\n      email\n      user {\n        name\n        photo\n        dob\n        email\n        gender\n        bio\n        username\n        instagramStats {\n          isVerified\n          username\n          followers\n          averageLikes\n          averageComments\n          er\n          mediaCount\n        }\n      }\n      comment\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;