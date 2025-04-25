import { gql } from "@/__generated__";

export const UPDATE_INSTAGRAM_USERNAME = gql(`
  #graphql
  mutation UpdateInstagramUsername($username: String!) {
    updateInstagramUsername(username: $username){
      photo
      bio
      username
      name
    }
  }
`);

export const READ_MESSAGE = gql(`
  #graphql
  mutation ReadMessage($conversationID:Int!) {
    readMessage(conversationID: $conversationID)
  }
`);

export const SEND_CHAT = gql(`
  #graphql
  mutation SendChat($conversationID: Int!, $body:String!) {
    sendMessage(conversationID: $conversationID, body: $body)
  }
`);

export const UPDATE_USER = gql(`
  #graphql
  mutation UpdateUser($updatedUser: UpdateUserInput!) {
    updateUser(updatedUser: $updatedUser)
  }
`);
export const UPDATE_PORTFOLIO = gql(`
  #graphql
  mutation UpdatePortfolio($updatedPortfolio: UpdatePortfolioArgs!) {
    updatePortfolio(data: $updatedPortfolio)
  }
`);
export const UPDATE_USER_LOCATION = gql(`
  #graphql
  mutation UpdateUserLocation($updatedLocation: UpdateLocation!) {
    updateUserLocation(updatedLocation: $updatedLocation)
  }
`);

export const DISCONNECT_INSTAGRAM = gql(`
  #graphql
  mutation DisconnectInstagram {
    disconnectInstagram
  }
`);

export const APPLY_NOW = gql(`
  #graphql
  mutation ApplyNow($postingID:Float!, $comment:String) {
    applyToPosting(postingID: $postingID, comment: $comment)  
  }
`);

export const DELETE_POSTING = gql(`
  #graphql
  mutation DeletePosting($postingID:Float!) {
    deletePosting(postingID: $postingID)  
  }
`);
export const PAUSE_POSTING = gql(`
  #graphql
  mutation PausePosting($postingID:Float!) {
    pausePosting(postingID: $postingID)  
  }
`);
export const RESUME_POSTING = gql(`
  #graphql
  mutation ResumePosting($postingID:Float!) {
    resumePosting(postingID: $postingID)  
  }
`);

export const CREATE_POSTING = gql(`
  #graphql
  mutation CreatePosting($newPosting:NewPostingInput!) {
    createPosting(newPosting: $newPosting)  
  }
`);
export const UPDATE_POSTING = gql(`
  #graphql
  mutation UpdatePosting($newPosting:UpdatePostingInput!, $id:Float!) {
    updatePosting(id:$id,updatedPosting: $newPosting)  
  }
`);

export const SEND_RESET_PASSWORD_EMAIL = gql(`
  #graphql
  mutation SendResetPasswordEmail($email:String!) {
    sendResetPasswordEmail(email: $email)  
  }
`);
export const SEND_VERIFICATION_EMAIL = gql(`
  #graphql
  mutation SendVerificationEmail {
    sendVerificationEmail
  }
`);

export const RESET_PASSWORD = gql(`
  #graphql
  mutation ResetPassword($newPassword:String!, $token:String!) {
    resetPassword(newPassword: $newPassword, token:$token)  
  }
`);

export const ADD_PORTFOLIO = gql(`
  #graphql
  mutation AddPortfolio($portfolio:AddPortfolioArgs!) {
    addPortfolio(data: $portfolio)  
  }
`);
export const ADD_PORTFOLIO_LINK = gql(`
  #graphql
  mutation AddPortfolioLink($portfolio:AddPortfolioLinkArgs!) {
    addPortfolioLink(data: $portfolio)  
  }
`);

export const DELETE_PORTFOLIO = gql(`
  #graphql
  mutation DeletePortfolio($id:Float!) {
    deletePortfolio(id: $id)  
  }
`);

export const LIKE_APPLICATION = gql(`
  #graphql
  mutation LikeApplication($id:Float!) {
    likeApplication(id: $id)  
  }
`);
export const REJECT_APPLICATION = gql(`
  #graphql
  mutation RejectApplication($id:Float!) {
    rejectApplication(id: $id)  
  }
`);

export const SEND_REVIEW_BY_AGENCY = gql(`
  #graphql
  mutation SendReviewByAgency($args:SendReviewByAgencyArgs!) {
    sendReviewByAgency(args: $args)  
  }
`);
export const SEND_REVIEW_BY_USER = gql(`
  #graphql
  mutation SendReviewByUser($args:SendReviewByUserArgs!) {
    sendReviewByUser(args: $args)  
  }
`);

export const UNLINK_SOCIAL_ACCOUNT = gql(`
  #graphql
  mutation UnlinkSocialAccount {
    unlinkSocialAccount
  }
`);
