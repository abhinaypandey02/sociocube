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
    "\n  #graphql\n  mutation UpdateInstagramUsername($username: String!) {\n    updateInstagramUsername(username: $username){\n      photo\n      bio\n      username\n      name\n    }\n  }\n": types.UpdateInstagramUsernameDocument,
    "\n  #graphql\n  mutation ReadMessage($conversationID:Int!) {\n    readMessage(conversationID: $conversationID)\n  }\n": types.ReadMessageDocument,
    "\n  #graphql\n  mutation SendChat($userID: Int!, $body:String!) {\n    sendMessage(userID: $userID, body: $body)\n  }\n": types.SendChatDocument,
    "\n  #graphql\n  mutation UpdateUser($updatedUser: UpdateUserInput!) {\n    updateUser(updatedUser: $updatedUser)\n  }\n": types.UpdateUserDocument,
    "\n  #graphql\n  mutation UpdatePortfolio($updatedPortfolio: UpdatePortfolioArgs!) {\n    updatePortfolio(data: $updatedPortfolio)\n  }\n": types.UpdatePortfolioDocument,
    "\n  #graphql\n  mutation UpdateUserLocation($updatedLocation: UpdateLocation!) {\n    updateUserLocation(updatedLocation: $updatedLocation)\n  }\n": types.UpdateUserLocationDocument,
    "\n  #graphql\n  mutation ApplyNow($postingID:Float!, $comment:String) {\n    applyToPosting(postingID: $postingID, comment: $comment)  \n  }\n": types.ApplyNowDocument,
    "\n  #graphql\n  mutation DeletePosting($postingID:Float!) {\n    deletePosting(postingID: $postingID)  \n  }\n": types.DeletePostingDocument,
    "\n  #graphql\n  mutation PausePosting($postingID:Float!) {\n    pausePosting(postingID: $postingID)  \n  }\n": types.PausePostingDocument,
    "\n  #graphql\n  mutation ResumePosting($postingID:Float!) {\n    resumePosting(postingID: $postingID)  \n  }\n": types.ResumePostingDocument,
    "\n  #graphql\n  mutation CreatePosting($newPosting:NewPostingInput!) {\n    createPosting(newPosting: $newPosting)  \n  }\n": types.CreatePostingDocument,
    "\n  #graphql\n  mutation UpdatePosting($newPosting:UpdatePostingInput!, $id:Float!) {\n    updatePosting(id:$id,updatedPosting: $newPosting)  \n  }\n": types.UpdatePostingDocument,
    "\n  #graphql\n  mutation SendResetPasswordEmail($email:String!) {\n    sendResetPasswordEmail(email: $email)  \n  }\n": types.SendResetPasswordEmailDocument,
    "\n  #graphql\n  mutation SendVerificationEmail {\n    sendVerificationEmail\n  }\n": types.SendVerificationEmailDocument,
    "\n  #graphql\n  mutation ResetPassword($newPassword:String!, $token:String!) {\n    resetPassword(newPassword: $newPassword, token:$token)  \n  }\n": types.ResetPasswordDocument,
    "\n  #graphql\n  mutation AddPortfolio($portfolio:AddPortfolioArgs!) {\n    addPortfolio(data: $portfolio)  {\n      id\n      imageURL\n    }\n  }\n": types.AddPortfolioDocument,
    "\n  #graphql\n  mutation DeletePortfolio($id:Float!) {\n    deletePortfolio(id: $id)  \n  }\n": types.DeletePortfolioDocument,
    "\n  #graphql\n  mutation LikeApplication($id:Float!) {\n    likeApplication(id: $id)  \n  }\n": types.LikeApplicationDocument,
    "\n  #graphql\n  mutation UpdateShortlist($id:Float!, $accepted:Boolean!) {\n    updateShortlist(accepted: $accepted, id: $id)  \n  }\n": types.UpdateShortlistDocument,
    "\n  #graphql\n  mutation ShortlistUser($userID:Float!, $postingID:Float!) {\n    shortlistUser(postingID: $postingID, userID: $userID)  \n  }\n": types.ShortlistUserDocument,
    "\n  #graphql\n  mutation RejectApplication($id:Float!) {\n    rejectApplication(id: $id)  \n  }\n": types.RejectApplicationDocument,
    "\n  #graphql\n  mutation AcceptPosting($id:Float!) {\n    acceptPosting(postingID: $id)  \n  }\n": types.AcceptPostingDocument,
    "\n  #graphql\n  mutation RejectPosting($id:Float!, $reason:String!) {\n    rejectPosting(reason: $reason, postingID: $id)  \n  }\n": types.RejectPostingDocument,
    "\n  #graphql\n  mutation SendReviewByAgency($args:SendReviewByAgencyArgs!) {\n    sendReviewByAgency(args: $args)  \n  }\n": types.SendReviewByAgencyDocument,
    "\n  #graphql\n  mutation SendReviewByUser($args:SendReviewByUserArgs!) {\n    sendReviewByUser(args: $args)  \n  }\n": types.SendReviewByUserDocument,
    "\n  #graphql\n  mutation UnlinkSocialAccount {\n    unlinkSocialAccount\n  }\n": types.UnlinkSocialAccountDocument,
    "\n  #graphql\n  mutation SendAnnouncement($body:String!, $postingID:Float!, $apps:[Float!]){\n    sendAnnouncement(body: $body, postingID: $postingID, apps: $apps)   \n  }\n": types.SendAnnouncementDocument,
    "\n  #graphql\n  query GetCurrentUser {\n    user: getCurrentUser {\n      id\n      bio\n      email\n      username\n      name\n      photo\n      role\n      emailVerified\n      isOnboarded\n      instagramStats {\n        username\n        isVerified\n      }\n    }\n  }\n": types.GetCurrentUserDocument,
    "\n  #graphql\n  query GetUserCurrency {\n    user: getCurrentUser {\n        id\n      locationID {\n        country\n      }\n    }\n  }\n": types.GetUserCurrencyDocument,
    "\n  #graphql\n  query GetDefaultOnboardingDetails {\n    getCurrentUser {\n      id\n      email\n      name\n      photo\n      role\n      isOnboarded\n      instagramStats {\n        username\n      }\n      bio\n      username\n      pricing {\n        starting\n      }\n      gender\n      category\n      dob\n      location {\n        city\n        currency\n      }\n      locationID {\n        city\n        country\n      }\n    }\n  }\n": types.GetDefaultOnboardingDetailsDocument,
    "\n  #graphql\n  query GetFeaturedSellers {\n    sellers: getFeaturedSellers {\n      username\n      name\n      photo\n      bio\n      category\n      instagramStats {\n        username\n        followers\n        er\n        isVerified\n      }\n    }\n    postings: getFeaturedPostings {\n      id\n      price\n      platforms\n      currency\n      title\n      open\n      minimumAge\n      maximumAge\n      barter\n      applicationsCount\n      minimumFollowers\n      externalLink\n      description\n      deliverables\n      agency {\n        photo\n        name\n      }\n    }\n  }\n": types.GetFeaturedSellersDocument,
    "\n  #graphql\n  query GetSeller($username:String!) {\n    getSeller(username: $username) {\n      \n        id\n        name\n        photo\n        bio\n        role\n        gender\n        reviews {\n          feedback\n          rating\n          name\n          photo\n          username\n         \n        }\n        portfolio {\n          caption\n          id\n          link\n          imageURL\n        }\n        location {\n          city\n          country\n          currency\n        }\n        category\n        dob\n        pricing {\n          starting\n        }\n        instagramMedia {\n          thumbnail\n          caption\n          link\n          likes\n          comments\n          er\n          timestamp\n        }\n        instagramStats {\n          followers\n          mediaCount\n          username\n          er\n          averageLikes\n          isVerified\n        }\n      \n    }\n  }\n": types.GetSellerDocument,
    "\n  #graphql\n  query GetChats {\n    chats:getChats {\n      preview{\n          text\n          hasRead\n          at\n      }\n      id\n      user {\n        id\n        username\n        name\n        photo\n      }\n    }\n  }\n": types.GetChatsDocument,
    "\n  #graphql\n  query GetChat($username: String!) {\n    chat: getChat(username: $username) {\n      user {\n        id\n        name\n        photo\n      }\n      id\n      preview{\n          text\n      }\n      messages{\n        body\n        createdAt\n        by\n      }\n    }\n  }\n": types.GetChatDocument,
    "\n  #graphql\n  query GetAccountPortfolioDetails {\n    user: getCurrentUser {\n        id\n      portfolio {\n          caption\n          id\n          link\n          imageURL\n        }\n    }\n  }\n": types.GetAccountPortfolioDetailsDocument,
    "\n  #graphql\n  query GetAccountSocialDetails {\n    user: getCurrentUser {\n        id\n      instagramStats {\n        username\n        isVerified\n        followers\n        mediaCount\n        er\n        averageLikes\n        averageComments\n      }\n    }\n  }\n": types.GetAccountSocialDetailsDocument,
    "\n  #graphql\n  query GetAccountProfileDetails {\n    user: getCurrentUser {\n        id\n      name\n      email\n      emailVerified\n      bio\n      photo\n      phone\n      category\n      gender\n      role\n      dob\n      username\n      locationID {\n        city\n        country\n      }\n      location {\n        city\n        country\n      }\n    }\n  }\n": types.GetAccountProfileDetailsDocument,
    "\n  #graphql\n  query GetCities($countryID: Int!, $stateID: Int) {\n    cities: getCities(countryID: $countryID, stateID: $stateID) {\n      value\n      label\n    }\n  }\n": types.GetCitiesDocument,
    "\n  #graphql\n  query GetStates($countryID: Int!) {\n    states: getStates(countryID: $countryID) {\n      value\n      label\n    }\n  }\n": types.GetStatesDocument,
    "\n    #graphql\n    query GetAISearchUsage {\n        getSubscription {\n            usages {\n                AiSearch\n            }\n            plan\n        }\n    }\n": types.GetAiSearchUsageDocument,
    "\n  #graphql\n  query SearchSellers($filters: SearchSellersFilters!) {\n    sellers: searchSellers(filters: $filters) {\n      name\n      username\n      photo\n      bio\n      category\n      gender\n      instagramStats {\n        username\n        isVerified\n        followers\n      }\n      pricing {\n        starting\n      }\n      location {\n        city\n        country\n        currency\n      }\n    }\n  }\n": types.SearchSellersDocument,
    "\n  #graphql\n  query IsUsernameAvailable($username: String!) {\n    isUsernameAvailable(username:$username)\n  }\n": types.IsUsernameAvailableDocument,
    "\n  #graphql\n  query GetPosting($id: Int!, $owned:Boolean) {\n    posting:getPosting(id: $id, owned: $owned){\n        id\n        gender\n        maximumAge\n        minimumFollowers\n        externalLink\n        extraDetails\n        currencyCountry\n        selectedCount\n        agency {\n            id\n            name\n            photo\n            username\n            instagramStats {\n                isVerified\n                username\n            }\n        }\n        applicationsCount\n        description\n        barter\n        minimumAge\n        open\n        gender\n        title\n        currency\n        price\n        createdAt\n        platforms\n        hasApplied\n        eligibility\n        updatedAt\n        deliverables\n        inReview\n        countries\n        states{\n            value\n            label\n        }\n        cities{\n            value\n            label\n        }\n        reviews {\n            rating\n            photo\n            username\n        }\n    }\n  }\n": types.GetPostingDocument,
    "\n  #graphql\n  query GetAllPostings($page:Float!) {\n    postings:getAllPostings(page:$page) {\n      id\n      maximumAge\n      minimumFollowers\n      inReview\n      externalLink\n        gender\n      extraDetails\n        currencyCountry\n      agency {\n          id\n        name\n        photo\n          username\n        instagramStats {\n          isVerified\n            username\n        }\n      }\n      applicationsCount\n      description\n      barter\n      minimumAge\n      open\n      title\n      currency\n      price\n      createdAt\n      platforms\n      hasApplied\n      eligibility\n      updatedAt\n        deliverables\n        reviews {\n            rating\n            photo\n            username\n        }  \n    }\n  }\n": types.GetAllPostingsDocument,
    "\n  #graphql\n  query GetUserPostings($page: Float) {\n    postings:getUserPostings(page: $page) {\n      id\n      maximumAge\n      referralEarnings\n      minimumFollowers\n      applicationsCount\n      selectedCount\n      description\n      barter\n      minimumAge\n      extraDetails\n      open\n      title\n      currency\n      price\n      createdAt\n      platforms\n      updatedAt\n      deliverables\n      currencyCountry\n      inReview\n    }\n  }\n": types.GetUserPostingsDocument,
    "\n  #graphql\n  query GetUserPostingsLatest($limit: Int, $username: String!) {\n    postings:getUserPostingsLatest(limit: $limit, username: $username) {\n      id\n      maximumAge\n      referralEarnings\n      minimumFollowers\n      applicationsCount\n      description\n      barter\n      minimumAge\n      extraDetails\n      open\n      title\n      currency\n      price\n      createdAt\n      platforms\n      updatedAt\n      deliverables\n      currencyCountry\n      inReview\n    }\n  }\n  ": types.GetUserPostingsLatestDocument,
    "\n  #graphql\n  query GetPostingApplications($postingID:Int!) {\n    getSubscription {\n        usages {\n            PostingAnnouncement(postingID: $postingID)\n            GlobalAnnouncement\n        }\n    }\n    posting: getPosting(id: $postingID, owned: true){\n    title\n      id  \n    extraDetails\n    externalLink\n    }\n    applications:getPostingApplications(postingID: $postingID) {\n      status\n        hasReview\n      createdAt\n      id\n      user {\n          id  \n        name\n        photo\n        dob\n        email\n        phone\n        gender\n        bio\n        username\n        instagramStats {\n          isVerified\n          username\n          followers\n          averageLikes\n          averageComments\n          er\n          mediaCount\n        }\n      }\n      comment\n    }\n  }\n": types.GetPostingApplicationsDocument,
    "\n  #graphql\n  query GetPostingSelected($postingID:Int!) {\n     getSubscription {\n        usages {\n            PostingAnnouncement(postingID: $postingID) \n            GlobalAnnouncement\n        }\n    }  \n    posting: getPosting(id: $postingID, owned: true){\n      title\n      id  \n      extraDetails\n      externalLink\n    }\n    applications:getPostingSelected(postingID: $postingID) {\n      status\n      createdAt\n        hasReview\n      id\n      user {\n          id  \n        name\n        photo\n        dob\n        email\n        phone\n        gender\n        bio\n        username\n        instagramStats {\n          isVerified\n          username\n          followers\n          averageLikes\n          averageComments\n          er\n          mediaCount\n        }\n      }\n      comment\n    }\n  }\n": types.GetPostingSelectedDocument,
    "\n  #graphql\n  query GetPostingRecommendations($postingID:Int!) {\n    getSubscription {\n        usages {\n            PostingAnnouncement(postingID: $postingID)\n            GlobalAnnouncement\n        }\n    }\n    posting: getPosting(id: $postingID, owned: true){\n      title\n      externalLink\n      extraDetails  \n      id  \n        recommendations {\n            status\n            user {\n                id\n                name\n                photo\n                dob\n                email\n                phone\n                gender\n                bio\n                username\n                instagramStats {\n                    isVerified\n                    username\n                    followers\n                    averageLikes\n                    averageComments\n                    er\n                    mediaCount\n                }\n            }\n        }\n    }\n  }\n": types.GetPostingRecommendationsDocument,
    "\n  #graphql\n  query VerifyEmail($token:String!) {\n    verifyEmail(token: $token)\n  }\n": types.VerifyEmailDocument,
    "\n  #graphql\n  query GetUserApplications {\n    getPendingReviews\n    getUserApplications {\n        id\n      status\n      comment\n      createdAt\n      posting {\n        title\n        agency {\n          name\n          username\n          photo\n        }\n        id\n      }\n    }\n  }\n": types.GetUserApplicationsDocument,
    "\n  #graphql\n  query GetPostingsInReview {\n      getPostingsInReview{\n        id\n        maximumAge\n        minimumFollowers\n        inReview\n        externalLink\n        extraDetails\n        currencyCountry\n        agency {\n            id\n            name\n            photo\n            username\n            instagramStats {\n                isVerified\n                username\n            }\n        }\n        applicationsCount\n        description\n        barter\n        minimumAge\n        open\n        title\n        currency\n        price\n        createdAt\n        platforms\n        hasApplied\n        eligibility\n        updatedAt\n        deliverables\n        reviews {\n            rating\n            photo\n            username\n        }\n    }\n  }\n": types.GetPostingsInReviewDocument,
    "\n  #graphql\n  query GetSubscription {\n      getSubscription{\n          status\n          plan\n      }\n      getSubscriptionLink\n  }\n": types.GetSubscriptionDocument,
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
export function gql(source: "\n  #graphql\n  mutation UpdateInstagramUsername($username: String!) {\n    updateInstagramUsername(username: $username){\n      photo\n      bio\n      username\n      name\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UpdateInstagramUsername($username: String!) {\n    updateInstagramUsername(username: $username){\n      photo\n      bio\n      username\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation ReadMessage($conversationID:Int!) {\n    readMessage(conversationID: $conversationID)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation ReadMessage($conversationID:Int!) {\n    readMessage(conversationID: $conversationID)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation SendChat($userID: Int!, $body:String!) {\n    sendMessage(userID: $userID, body: $body)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation SendChat($userID: Int!, $body:String!) {\n    sendMessage(userID: $userID, body: $body)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation UpdateUser($updatedUser: UpdateUserInput!) {\n    updateUser(updatedUser: $updatedUser)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UpdateUser($updatedUser: UpdateUserInput!) {\n    updateUser(updatedUser: $updatedUser)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation UpdatePortfolio($updatedPortfolio: UpdatePortfolioArgs!) {\n    updatePortfolio(data: $updatedPortfolio)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UpdatePortfolio($updatedPortfolio: UpdatePortfolioArgs!) {\n    updatePortfolio(data: $updatedPortfolio)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation UpdateUserLocation($updatedLocation: UpdateLocation!) {\n    updateUserLocation(updatedLocation: $updatedLocation)\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UpdateUserLocation($updatedLocation: UpdateLocation!) {\n    updateUserLocation(updatedLocation: $updatedLocation)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation ApplyNow($postingID:Float!, $comment:String) {\n    applyToPosting(postingID: $postingID, comment: $comment)  \n  }\n"): (typeof documents)["\n  #graphql\n  mutation ApplyNow($postingID:Float!, $comment:String) {\n    applyToPosting(postingID: $postingID, comment: $comment)  \n  }\n"];
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
export function gql(source: "\n  #graphql\n  mutation SendResetPasswordEmail($email:String!) {\n    sendResetPasswordEmail(email: $email)  \n  }\n"): (typeof documents)["\n  #graphql\n  mutation SendResetPasswordEmail($email:String!) {\n    sendResetPasswordEmail(email: $email)  \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation SendVerificationEmail {\n    sendVerificationEmail\n  }\n"): (typeof documents)["\n  #graphql\n  mutation SendVerificationEmail {\n    sendVerificationEmail\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation ResetPassword($newPassword:String!, $token:String!) {\n    resetPassword(newPassword: $newPassword, token:$token)  \n  }\n"): (typeof documents)["\n  #graphql\n  mutation ResetPassword($newPassword:String!, $token:String!) {\n    resetPassword(newPassword: $newPassword, token:$token)  \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation AddPortfolio($portfolio:AddPortfolioArgs!) {\n    addPortfolio(data: $portfolio)  {\n      id\n      imageURL\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  mutation AddPortfolio($portfolio:AddPortfolioArgs!) {\n    addPortfolio(data: $portfolio)  {\n      id\n      imageURL\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation DeletePortfolio($id:Float!) {\n    deletePortfolio(id: $id)  \n  }\n"): (typeof documents)["\n  #graphql\n  mutation DeletePortfolio($id:Float!) {\n    deletePortfolio(id: $id)  \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation LikeApplication($id:Float!) {\n    likeApplication(id: $id)  \n  }\n"): (typeof documents)["\n  #graphql\n  mutation LikeApplication($id:Float!) {\n    likeApplication(id: $id)  \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation UpdateShortlist($id:Float!, $accepted:Boolean!) {\n    updateShortlist(accepted: $accepted, id: $id)  \n  }\n"): (typeof documents)["\n  #graphql\n  mutation UpdateShortlist($id:Float!, $accepted:Boolean!) {\n    updateShortlist(accepted: $accepted, id: $id)  \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation ShortlistUser($userID:Float!, $postingID:Float!) {\n    shortlistUser(postingID: $postingID, userID: $userID)  \n  }\n"): (typeof documents)["\n  #graphql\n  mutation ShortlistUser($userID:Float!, $postingID:Float!) {\n    shortlistUser(postingID: $postingID, userID: $userID)  \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation RejectApplication($id:Float!) {\n    rejectApplication(id: $id)  \n  }\n"): (typeof documents)["\n  #graphql\n  mutation RejectApplication($id:Float!) {\n    rejectApplication(id: $id)  \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation AcceptPosting($id:Float!) {\n    acceptPosting(postingID: $id)  \n  }\n"): (typeof documents)["\n  #graphql\n  mutation AcceptPosting($id:Float!) {\n    acceptPosting(postingID: $id)  \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation RejectPosting($id:Float!, $reason:String!) {\n    rejectPosting(reason: $reason, postingID: $id)  \n  }\n"): (typeof documents)["\n  #graphql\n  mutation RejectPosting($id:Float!, $reason:String!) {\n    rejectPosting(reason: $reason, postingID: $id)  \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation SendReviewByAgency($args:SendReviewByAgencyArgs!) {\n    sendReviewByAgency(args: $args)  \n  }\n"): (typeof documents)["\n  #graphql\n  mutation SendReviewByAgency($args:SendReviewByAgencyArgs!) {\n    sendReviewByAgency(args: $args)  \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation SendReviewByUser($args:SendReviewByUserArgs!) {\n    sendReviewByUser(args: $args)  \n  }\n"): (typeof documents)["\n  #graphql\n  mutation SendReviewByUser($args:SendReviewByUserArgs!) {\n    sendReviewByUser(args: $args)  \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation UnlinkSocialAccount {\n    unlinkSocialAccount\n  }\n"): (typeof documents)["\n  #graphql\n  mutation UnlinkSocialAccount {\n    unlinkSocialAccount\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  mutation SendAnnouncement($body:String!, $postingID:Float!, $apps:[Float!]){\n    sendAnnouncement(body: $body, postingID: $postingID, apps: $apps)   \n  }\n"): (typeof documents)["\n  #graphql\n  mutation SendAnnouncement($body:String!, $postingID:Float!, $apps:[Float!]){\n    sendAnnouncement(body: $body, postingID: $postingID, apps: $apps)   \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetCurrentUser {\n    user: getCurrentUser {\n      id\n      bio\n      email\n      username\n      name\n      photo\n      role\n      emailVerified\n      isOnboarded\n      instagramStats {\n        username\n        isVerified\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetCurrentUser {\n    user: getCurrentUser {\n      id\n      bio\n      email\n      username\n      name\n      photo\n      role\n      emailVerified\n      isOnboarded\n      instagramStats {\n        username\n        isVerified\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetUserCurrency {\n    user: getCurrentUser {\n        id\n      locationID {\n        country\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetUserCurrency {\n    user: getCurrentUser {\n        id\n      locationID {\n        country\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetDefaultOnboardingDetails {\n    getCurrentUser {\n      id\n      email\n      name\n      photo\n      role\n      isOnboarded\n      instagramStats {\n        username\n      }\n      bio\n      username\n      pricing {\n        starting\n      }\n      gender\n      category\n      dob\n      location {\n        city\n        currency\n      }\n      locationID {\n        city\n        country\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetDefaultOnboardingDetails {\n    getCurrentUser {\n      id\n      email\n      name\n      photo\n      role\n      isOnboarded\n      instagramStats {\n        username\n      }\n      bio\n      username\n      pricing {\n        starting\n      }\n      gender\n      category\n      dob\n      location {\n        city\n        currency\n      }\n      locationID {\n        city\n        country\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetFeaturedSellers {\n    sellers: getFeaturedSellers {\n      username\n      name\n      photo\n      bio\n      category\n      instagramStats {\n        username\n        followers\n        er\n        isVerified\n      }\n    }\n    postings: getFeaturedPostings {\n      id\n      price\n      platforms\n      currency\n      title\n      open\n      minimumAge\n      maximumAge\n      barter\n      applicationsCount\n      minimumFollowers\n      externalLink\n      description\n      deliverables\n      agency {\n        photo\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetFeaturedSellers {\n    sellers: getFeaturedSellers {\n      username\n      name\n      photo\n      bio\n      category\n      instagramStats {\n        username\n        followers\n        er\n        isVerified\n      }\n    }\n    postings: getFeaturedPostings {\n      id\n      price\n      platforms\n      currency\n      title\n      open\n      minimumAge\n      maximumAge\n      barter\n      applicationsCount\n      minimumFollowers\n      externalLink\n      description\n      deliverables\n      agency {\n        photo\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetSeller($username:String!) {\n    getSeller(username: $username) {\n      \n        id\n        name\n        photo\n        bio\n        role\n        gender\n        reviews {\n          feedback\n          rating\n          name\n          photo\n          username\n         \n        }\n        portfolio {\n          caption\n          id\n          link\n          imageURL\n        }\n        location {\n          city\n          country\n          currency\n        }\n        category\n        dob\n        pricing {\n          starting\n        }\n        instagramMedia {\n          thumbnail\n          caption\n          link\n          likes\n          comments\n          er\n          timestamp\n        }\n        instagramStats {\n          followers\n          mediaCount\n          username\n          er\n          averageLikes\n          isVerified\n        }\n      \n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetSeller($username:String!) {\n    getSeller(username: $username) {\n      \n        id\n        name\n        photo\n        bio\n        role\n        gender\n        reviews {\n          feedback\n          rating\n          name\n          photo\n          username\n         \n        }\n        portfolio {\n          caption\n          id\n          link\n          imageURL\n        }\n        location {\n          city\n          country\n          currency\n        }\n        category\n        dob\n        pricing {\n          starting\n        }\n        instagramMedia {\n          thumbnail\n          caption\n          link\n          likes\n          comments\n          er\n          timestamp\n        }\n        instagramStats {\n          followers\n          mediaCount\n          username\n          er\n          averageLikes\n          isVerified\n        }\n      \n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetChats {\n    chats:getChats {\n      preview{\n          text\n          hasRead\n          at\n      }\n      id\n      user {\n        id\n        username\n        name\n        photo\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetChats {\n    chats:getChats {\n      preview{\n          text\n          hasRead\n          at\n      }\n      id\n      user {\n        id\n        username\n        name\n        photo\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetChat($username: String!) {\n    chat: getChat(username: $username) {\n      user {\n        id\n        name\n        photo\n      }\n      id\n      preview{\n          text\n      }\n      messages{\n        body\n        createdAt\n        by\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetChat($username: String!) {\n    chat: getChat(username: $username) {\n      user {\n        id\n        name\n        photo\n      }\n      id\n      preview{\n          text\n      }\n      messages{\n        body\n        createdAt\n        by\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetAccountPortfolioDetails {\n    user: getCurrentUser {\n        id\n      portfolio {\n          caption\n          id\n          link\n          imageURL\n        }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetAccountPortfolioDetails {\n    user: getCurrentUser {\n        id\n      portfolio {\n          caption\n          id\n          link\n          imageURL\n        }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetAccountSocialDetails {\n    user: getCurrentUser {\n        id\n      instagramStats {\n        username\n        isVerified\n        followers\n        mediaCount\n        er\n        averageLikes\n        averageComments\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetAccountSocialDetails {\n    user: getCurrentUser {\n        id\n      instagramStats {\n        username\n        isVerified\n        followers\n        mediaCount\n        er\n        averageLikes\n        averageComments\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetAccountProfileDetails {\n    user: getCurrentUser {\n        id\n      name\n      email\n      emailVerified\n      bio\n      photo\n      phone\n      category\n      gender\n      role\n      dob\n      username\n      locationID {\n        city\n        country\n      }\n      location {\n        city\n        country\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetAccountProfileDetails {\n    user: getCurrentUser {\n        id\n      name\n      email\n      emailVerified\n      bio\n      photo\n      phone\n      category\n      gender\n      role\n      dob\n      username\n      locationID {\n        city\n        country\n      }\n      location {\n        city\n        country\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetCities($countryID: Int!, $stateID: Int) {\n    cities: getCities(countryID: $countryID, stateID: $stateID) {\n      value\n      label\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetCities($countryID: Int!, $stateID: Int) {\n    cities: getCities(countryID: $countryID, stateID: $stateID) {\n      value\n      label\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetStates($countryID: Int!) {\n    states: getStates(countryID: $countryID) {\n      value\n      label\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetStates($countryID: Int!) {\n    states: getStates(countryID: $countryID) {\n      value\n      label\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    #graphql\n    query GetAISearchUsage {\n        getSubscription {\n            usages {\n                AiSearch\n            }\n            plan\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    query GetAISearchUsage {\n        getSubscription {\n            usages {\n                AiSearch\n            }\n            plan\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query SearchSellers($filters: SearchSellersFilters!) {\n    sellers: searchSellers(filters: $filters) {\n      name\n      username\n      photo\n      bio\n      category\n      gender\n      instagramStats {\n        username\n        isVerified\n        followers\n      }\n      pricing {\n        starting\n      }\n      location {\n        city\n        country\n        currency\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query SearchSellers($filters: SearchSellersFilters!) {\n    sellers: searchSellers(filters: $filters) {\n      name\n      username\n      photo\n      bio\n      category\n      gender\n      instagramStats {\n        username\n        isVerified\n        followers\n      }\n      pricing {\n        starting\n      }\n      location {\n        city\n        country\n        currency\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query IsUsernameAvailable($username: String!) {\n    isUsernameAvailable(username:$username)\n  }\n"): (typeof documents)["\n  #graphql\n  query IsUsernameAvailable($username: String!) {\n    isUsernameAvailable(username:$username)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetPosting($id: Int!, $owned:Boolean) {\n    posting:getPosting(id: $id, owned: $owned){\n        id\n        gender\n        maximumAge\n        minimumFollowers\n        externalLink\n        extraDetails\n        currencyCountry\n        selectedCount\n        agency {\n            id\n            name\n            photo\n            username\n            instagramStats {\n                isVerified\n                username\n            }\n        }\n        applicationsCount\n        description\n        barter\n        minimumAge\n        open\n        gender\n        title\n        currency\n        price\n        createdAt\n        platforms\n        hasApplied\n        eligibility\n        updatedAt\n        deliverables\n        inReview\n        countries\n        states{\n            value\n            label\n        }\n        cities{\n            value\n            label\n        }\n        reviews {\n            rating\n            photo\n            username\n        }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetPosting($id: Int!, $owned:Boolean) {\n    posting:getPosting(id: $id, owned: $owned){\n        id\n        gender\n        maximumAge\n        minimumFollowers\n        externalLink\n        extraDetails\n        currencyCountry\n        selectedCount\n        agency {\n            id\n            name\n            photo\n            username\n            instagramStats {\n                isVerified\n                username\n            }\n        }\n        applicationsCount\n        description\n        barter\n        minimumAge\n        open\n        gender\n        title\n        currency\n        price\n        createdAt\n        platforms\n        hasApplied\n        eligibility\n        updatedAt\n        deliverables\n        inReview\n        countries\n        states{\n            value\n            label\n        }\n        cities{\n            value\n            label\n        }\n        reviews {\n            rating\n            photo\n            username\n        }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetAllPostings($page:Float!) {\n    postings:getAllPostings(page:$page) {\n      id\n      maximumAge\n      minimumFollowers\n      inReview\n      externalLink\n        gender\n      extraDetails\n        currencyCountry\n      agency {\n          id\n        name\n        photo\n          username\n        instagramStats {\n          isVerified\n            username\n        }\n      }\n      applicationsCount\n      description\n      barter\n      minimumAge\n      open\n      title\n      currency\n      price\n      createdAt\n      platforms\n      hasApplied\n      eligibility\n      updatedAt\n        deliverables\n        reviews {\n            rating\n            photo\n            username\n        }  \n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetAllPostings($page:Float!) {\n    postings:getAllPostings(page:$page) {\n      id\n      maximumAge\n      minimumFollowers\n      inReview\n      externalLink\n        gender\n      extraDetails\n        currencyCountry\n      agency {\n          id\n        name\n        photo\n          username\n        instagramStats {\n          isVerified\n            username\n        }\n      }\n      applicationsCount\n      description\n      barter\n      minimumAge\n      open\n      title\n      currency\n      price\n      createdAt\n      platforms\n      hasApplied\n      eligibility\n      updatedAt\n        deliverables\n        reviews {\n            rating\n            photo\n            username\n        }  \n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetUserPostings($page: Float) {\n    postings:getUserPostings(page: $page) {\n      id\n      maximumAge\n      referralEarnings\n      minimumFollowers\n      applicationsCount\n      selectedCount\n      description\n      barter\n      minimumAge\n      extraDetails\n      open\n      title\n      currency\n      price\n      createdAt\n      platforms\n      updatedAt\n      deliverables\n      currencyCountry\n      inReview\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetUserPostings($page: Float) {\n    postings:getUserPostings(page: $page) {\n      id\n      maximumAge\n      referralEarnings\n      minimumFollowers\n      applicationsCount\n      selectedCount\n      description\n      barter\n      minimumAge\n      extraDetails\n      open\n      title\n      currency\n      price\n      createdAt\n      platforms\n      updatedAt\n      deliverables\n      currencyCountry\n      inReview\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetUserPostingsLatest($limit: Int, $username: String!) {\n    postings:getUserPostingsLatest(limit: $limit, username: $username) {\n      id\n      maximumAge\n      referralEarnings\n      minimumFollowers\n      applicationsCount\n      description\n      barter\n      minimumAge\n      extraDetails\n      open\n      title\n      currency\n      price\n      createdAt\n      platforms\n      updatedAt\n      deliverables\n      currencyCountry\n      inReview\n    }\n  }\n  "): (typeof documents)["\n  #graphql\n  query GetUserPostingsLatest($limit: Int, $username: String!) {\n    postings:getUserPostingsLatest(limit: $limit, username: $username) {\n      id\n      maximumAge\n      referralEarnings\n      minimumFollowers\n      applicationsCount\n      description\n      barter\n      minimumAge\n      extraDetails\n      open\n      title\n      currency\n      price\n      createdAt\n      platforms\n      updatedAt\n      deliverables\n      currencyCountry\n      inReview\n    }\n  }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetPostingApplications($postingID:Int!) {\n    getSubscription {\n        usages {\n            PostingAnnouncement(postingID: $postingID)\n            GlobalAnnouncement\n        }\n    }\n    posting: getPosting(id: $postingID, owned: true){\n    title\n      id  \n    extraDetails\n    externalLink\n    }\n    applications:getPostingApplications(postingID: $postingID) {\n      status\n        hasReview\n      createdAt\n      id\n      user {\n          id  \n        name\n        photo\n        dob\n        email\n        phone\n        gender\n        bio\n        username\n        instagramStats {\n          isVerified\n          username\n          followers\n          averageLikes\n          averageComments\n          er\n          mediaCount\n        }\n      }\n      comment\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetPostingApplications($postingID:Int!) {\n    getSubscription {\n        usages {\n            PostingAnnouncement(postingID: $postingID)\n            GlobalAnnouncement\n        }\n    }\n    posting: getPosting(id: $postingID, owned: true){\n    title\n      id  \n    extraDetails\n    externalLink\n    }\n    applications:getPostingApplications(postingID: $postingID) {\n      status\n        hasReview\n      createdAt\n      id\n      user {\n          id  \n        name\n        photo\n        dob\n        email\n        phone\n        gender\n        bio\n        username\n        instagramStats {\n          isVerified\n          username\n          followers\n          averageLikes\n          averageComments\n          er\n          mediaCount\n        }\n      }\n      comment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetPostingSelected($postingID:Int!) {\n     getSubscription {\n        usages {\n            PostingAnnouncement(postingID: $postingID) \n            GlobalAnnouncement\n        }\n    }  \n    posting: getPosting(id: $postingID, owned: true){\n      title\n      id  \n      extraDetails\n      externalLink\n    }\n    applications:getPostingSelected(postingID: $postingID) {\n      status\n      createdAt\n        hasReview\n      id\n      user {\n          id  \n        name\n        photo\n        dob\n        email\n        phone\n        gender\n        bio\n        username\n        instagramStats {\n          isVerified\n          username\n          followers\n          averageLikes\n          averageComments\n          er\n          mediaCount\n        }\n      }\n      comment\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetPostingSelected($postingID:Int!) {\n     getSubscription {\n        usages {\n            PostingAnnouncement(postingID: $postingID) \n            GlobalAnnouncement\n        }\n    }  \n    posting: getPosting(id: $postingID, owned: true){\n      title\n      id  \n      extraDetails\n      externalLink\n    }\n    applications:getPostingSelected(postingID: $postingID) {\n      status\n      createdAt\n        hasReview\n      id\n      user {\n          id  \n        name\n        photo\n        dob\n        email\n        phone\n        gender\n        bio\n        username\n        instagramStats {\n          isVerified\n          username\n          followers\n          averageLikes\n          averageComments\n          er\n          mediaCount\n        }\n      }\n      comment\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetPostingRecommendations($postingID:Int!) {\n    getSubscription {\n        usages {\n            PostingAnnouncement(postingID: $postingID)\n            GlobalAnnouncement\n        }\n    }\n    posting: getPosting(id: $postingID, owned: true){\n      title\n      externalLink\n      extraDetails  \n      id  \n        recommendations {\n            status\n            user {\n                id\n                name\n                photo\n                dob\n                email\n                phone\n                gender\n                bio\n                username\n                instagramStats {\n                    isVerified\n                    username\n                    followers\n                    averageLikes\n                    averageComments\n                    er\n                    mediaCount\n                }\n            }\n        }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetPostingRecommendations($postingID:Int!) {\n    getSubscription {\n        usages {\n            PostingAnnouncement(postingID: $postingID)\n            GlobalAnnouncement\n        }\n    }\n    posting: getPosting(id: $postingID, owned: true){\n      title\n      externalLink\n      extraDetails  \n      id  \n        recommendations {\n            status\n            user {\n                id\n                name\n                photo\n                dob\n                email\n                phone\n                gender\n                bio\n                username\n                instagramStats {\n                    isVerified\n                    username\n                    followers\n                    averageLikes\n                    averageComments\n                    er\n                    mediaCount\n                }\n            }\n        }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query VerifyEmail($token:String!) {\n    verifyEmail(token: $token)\n  }\n"): (typeof documents)["\n  #graphql\n  query VerifyEmail($token:String!) {\n    verifyEmail(token: $token)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetUserApplications {\n    getPendingReviews\n    getUserApplications {\n        id\n      status\n      comment\n      createdAt\n      posting {\n        title\n        agency {\n          name\n          username\n          photo\n        }\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetUserApplications {\n    getPendingReviews\n    getUserApplications {\n        id\n      status\n      comment\n      createdAt\n      posting {\n        title\n        agency {\n          name\n          username\n          photo\n        }\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetPostingsInReview {\n      getPostingsInReview{\n        id\n        maximumAge\n        minimumFollowers\n        inReview\n        externalLink\n        extraDetails\n        currencyCountry\n        agency {\n            id\n            name\n            photo\n            username\n            instagramStats {\n                isVerified\n                username\n            }\n        }\n        applicationsCount\n        description\n        barter\n        minimumAge\n        open\n        title\n        currency\n        price\n        createdAt\n        platforms\n        hasApplied\n        eligibility\n        updatedAt\n        deliverables\n        reviews {\n            rating\n            photo\n            username\n        }\n    }\n  }\n"): (typeof documents)["\n  #graphql\n  query GetPostingsInReview {\n      getPostingsInReview{\n        id\n        maximumAge\n        minimumFollowers\n        inReview\n        externalLink\n        extraDetails\n        currencyCountry\n        agency {\n            id\n            name\n            photo\n            username\n            instagramStats {\n                isVerified\n                username\n            }\n        }\n        applicationsCount\n        description\n        barter\n        minimumAge\n        open\n        title\n        currency\n        price\n        createdAt\n        platforms\n        hasApplied\n        eligibility\n        updatedAt\n        deliverables\n        reviews {\n            rating\n            photo\n            username\n        }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  #graphql\n  query GetSubscription {\n      getSubscription{\n          status\n          plan\n      }\n      getSubscriptionLink\n  }\n"): (typeof documents)["\n  #graphql\n  query GetSubscription {\n      getSubscription{\n          status\n          plan\n      }\n      getSubscriptionLink\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;