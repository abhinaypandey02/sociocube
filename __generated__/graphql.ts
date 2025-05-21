/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddPortfolioArgs = {
  caption?: InputMaybe<Scalars['String']['input']>;
  imageURL?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
};

export type Application = {
  __typename?: 'Application';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  hasReview: Scalars['Boolean']['output'];
  id: Scalars['Float']['output'];
  posting?: Maybe<Posting>;
  referralEarnings: Scalars['Float']['output'];
  status: ApplicationStatus;
  user?: Maybe<User>;
};

export enum ApplicationStatus {
  Applied = 'Applied',
  Denied = 'Denied',
  Rejected = 'Rejected',
  Selected = 'Selected',
  Shortlisted = 'Shortlisted'
}

export type CitySelectOption = {
  __typename?: 'CitySelectOption';
  label: Scalars['String']['output'];
  value: Scalars['Int']['output'];
};

export type Conversation = {
  __typename?: 'Conversation';
  id: Scalars['Float']['output'];
  messages: Array<Message>;
  preview?: Maybe<Preview>;
  user?: Maybe<User>;
};


export type ConversationMessagesArgs = {
  page?: InputMaybe<Scalars['Float']['input']>;
};

export enum Eligibility {
  Closed = 'Closed',
  Eligible = 'Eligible',
  GenderMismatch = 'GenderMismatch',
  LessFollowers = 'LessFollowers',
  LocationMismatch = 'LocationMismatch',
  NotAgeGroup = 'NotAgeGroup',
  NotCreator = 'NotCreator',
  NotOnboarded = 'NotOnboarded',
  Unauthorized = 'Unauthorized'
}

export type GetFeaturedPostsResponse = {
  __typename?: 'GetFeaturedPostsResponse';
  creatorImage: Scalars['String']['output'];
  creatorName: Scalars['String']['output'];
  creatorUsername: Scalars['String']['output'];
  creatorVerified: Scalars['Boolean']['output'];
  er: Scalars['Float']['output'];
  likes: Scalars['Float']['output'];
  mediaURL: Scalars['String']['output'];
  postURL: Scalars['String']['output'];
  thumbnailURL: Scalars['String']['output'];
};

export type InstagramMedia = {
  __typename?: 'InstagramMedia';
  caption?: Maybe<Scalars['String']['output']>;
  comments: Scalars['Int']['output'];
  er?: Maybe<Scalars['Float']['output']>;
  likes: Scalars['Int']['output'];
  link: Scalars['String']['output'];
  thumbnail: Scalars['String']['output'];
  timestamp: Scalars['String']['output'];
};

export type InstagramStats = {
  __typename?: 'InstagramStats';
  averageComments: Scalars['Int']['output'];
  averageLikes: Scalars['Int']['output'];
  er: Scalars['Float']['output'];
  followers: Scalars['Int']['output'];
  isVerified: Scalars['Boolean']['output'];
  mediaCount: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type Location = {
  __typename?: 'Location';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  currency: Scalars['String']['output'];
};

export type LocationId = {
  __typename?: 'LocationID';
  city?: Maybe<Scalars['Float']['output']>;
  country?: Maybe<Scalars['Float']['output']>;
};

export type Message = {
  __typename?: 'Message';
  body: Scalars['String']['output'];
  by: Scalars['Float']['output'];
  createdAt: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptPosting: Scalars['Boolean']['output'];
  addPortfolio: Portfolio;
  applyToPosting: Scalars['Boolean']['output'];
  createPosting?: Maybe<Scalars['Float']['output']>;
  deletePortfolio: Scalars['Boolean']['output'];
  deletePosting: Scalars['Boolean']['output'];
  disconnectInstagram: Scalars['Boolean']['output'];
  likeApplication: Scalars['Boolean']['output'];
  pausePosting: Scalars['Boolean']['output'];
  readMessage: Scalars['Boolean']['output'];
  rejectApplication: Scalars['Boolean']['output'];
  rejectPosting: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  resumePosting: Scalars['Boolean']['output'];
  sendAnnouncement: Scalars['Boolean']['output'];
  sendMessage: Scalars['Boolean']['output'];
  sendResetPasswordEmail?: Maybe<Scalars['Boolean']['output']>;
  sendReviewByAgency: Scalars['Boolean']['output'];
  sendReviewByUser: Scalars['Boolean']['output'];
  sendVerificationEmail: Scalars['Boolean']['output'];
  shortlistUser: Scalars['Boolean']['output'];
  unlinkSocialAccount: Scalars['Boolean']['output'];
  updateInstagramUsername: UpdateInstagramUsernameResponse;
  updatePortfolio: Scalars['Boolean']['output'];
  updatePosting: Scalars['Boolean']['output'];
  updateShortlist: Scalars['Boolean']['output'];
  updateUser: Scalars['Boolean']['output'];
  updateUserLocation: Scalars['Boolean']['output'];
};


export type MutationAcceptPostingArgs = {
  postingID: Scalars['Float']['input'];
};


export type MutationAddPortfolioArgs = {
  data: AddPortfolioArgs;
};


export type MutationApplyToPostingArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  postingID: Scalars['Float']['input'];
};


export type MutationCreatePostingArgs = {
  newPosting: NewPostingInput;
};


export type MutationDeletePortfolioArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeletePostingArgs = {
  postingID: Scalars['Float']['input'];
};


export type MutationLikeApplicationArgs = {
  id: Scalars['Float']['input'];
};


export type MutationPausePostingArgs = {
  postingID: Scalars['Float']['input'];
};


export type MutationReadMessageArgs = {
  conversationID: Scalars['Int']['input'];
};


export type MutationRejectApplicationArgs = {
  id: Scalars['Float']['input'];
};


export type MutationRejectPostingArgs = {
  postingID: Scalars['Float']['input'];
  reason: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationResumePostingArgs = {
  postingID: Scalars['Float']['input'];
};


export type MutationSendAnnouncementArgs = {
  apps?: InputMaybe<Array<Scalars['Float']['input']>>;
  body: Scalars['String']['input'];
  postingID: Scalars['Float']['input'];
};


export type MutationSendMessageArgs = {
  body: Scalars['String']['input'];
  userID: Scalars['Int']['input'];
};


export type MutationSendResetPasswordEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationSendReviewByAgencyArgs = {
  args: SendReviewByAgencyArgs;
};


export type MutationSendReviewByUserArgs = {
  args: SendReviewByUserArgs;
};


export type MutationShortlistUserArgs = {
  postingID: Scalars['Float']['input'];
  userID: Scalars['Float']['input'];
};


export type MutationUpdateInstagramUsernameArgs = {
  username: Scalars['String']['input'];
};


export type MutationUpdatePortfolioArgs = {
  data: UpdatePortfolioArgs;
};


export type MutationUpdatePostingArgs = {
  id: Scalars['Float']['input'];
  updatedPosting: UpdatePostingInput;
};


export type MutationUpdateShortlistArgs = {
  accepted: Scalars['Boolean']['input'];
  id: Scalars['Float']['input'];
};


export type MutationUpdateUserArgs = {
  updatedUser: UpdateUserInput;
};


export type MutationUpdateUserLocationArgs = {
  updatedLocation: UpdateLocation;
};

export type NewPostingInput = {
  barter: Scalars['Boolean']['input'];
  cities?: InputMaybe<Array<Scalars['Int']['input']>>;
  countries?: InputMaybe<Array<Scalars['Int']['input']>>;
  currencyCountry?: InputMaybe<Scalars['Int']['input']>;
  deliverables?: InputMaybe<Array<Scalars['String']['input']>>;
  description: Scalars['String']['input'];
  externalLink?: InputMaybe<Scalars['String']['input']>;
  extraDetails?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  maximumAge?: InputMaybe<Scalars['Float']['input']>;
  minimumAge?: InputMaybe<Scalars['Float']['input']>;
  minimumFollowers?: InputMaybe<Scalars['Float']['input']>;
  platforms: Array<PostingPlatforms>;
  price?: InputMaybe<Scalars['Int']['input']>;
  states?: InputMaybe<Array<Scalars['Int']['input']>>;
  title: Scalars['String']['input'];
};

export type Portfolio = {
  __typename?: 'Portfolio';
  caption?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
};

export type Posting = {
  __typename?: 'Posting';
  agency: User;
  announcementCount: Scalars['Float']['output'];
  applicationsCount: Scalars['Int']['output'];
  barter: Scalars['Boolean']['output'];
  cities: Array<CitySelectOption>;
  countries?: Maybe<Array<Scalars['Float']['output']>>;
  createdAt: Scalars['Float']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  currencyCountry?: Maybe<Scalars['Int']['output']>;
  deliverables?: Maybe<Array<Scalars['String']['output']>>;
  description: Scalars['String']['output'];
  eligibility?: Maybe<Eligibility>;
  externalLink?: Maybe<Scalars['String']['output']>;
  extraDetails?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hasApplied?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['Float']['output'];
  inReview: Scalars['Boolean']['output'];
  maximumAge?: Maybe<Scalars['Int']['output']>;
  minimumAge?: Maybe<Scalars['Int']['output']>;
  minimumFollowers?: Maybe<Scalars['Int']['output']>;
  open: Scalars['Boolean']['output'];
  platforms: Array<PostingPlatforms>;
  price?: Maybe<Scalars['Int']['output']>;
  recommendations: Array<Recommendation>;
  referralEarnings: Scalars['Float']['output'];
  reviews: Array<Review>;
  selectedCount: Scalars['Int']['output'];
  states: Array<CitySelectOption>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export enum PostingPlatforms {
  Instagram = 'INSTAGRAM',
  Youtube = 'YOUTUBE'
}

export type Preview = {
  __typename?: 'Preview';
  at: Scalars['Float']['output'];
  hasRead: Scalars['Float']['output'];
  text: Scalars['String']['output'];
};

export type Pricing = {
  __typename?: 'Pricing';
  starting?: Maybe<Scalars['Float']['output']>;
};

export type PricingInput = {
  starting?: InputMaybe<Scalars['Float']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getAllPostings: Array<Posting>;
  getChat?: Maybe<Conversation>;
  getChats: Array<Conversation>;
  getCities: Array<CitySelectOption>;
  getCurrentUser?: Maybe<User>;
  getFeaturedPostings: Array<Posting>;
  getFeaturedPosts: Array<GetFeaturedPostsResponse>;
  getFeaturedSellers: Array<User>;
  getHasUserApplied: Scalars['Boolean']['output'];
  getPendingReviews: Array<Scalars['Float']['output']>;
  getPosting?: Maybe<Posting>;
  getPostingApplications: Array<Application>;
  getPostingSelected: Array<Application>;
  getPostingsInReview: Array<Posting>;
  getSeller?: Maybe<User>;
  getStates: Array<CitySelectOption>;
  getSubscription?: Maybe<Subscription>;
  getUserApplications: Array<Application>;
  getUserPostings: Array<Posting>;
  getUserPostingsLatest: Array<Posting>;
  isUsernameAvailable: Scalars['Boolean']['output'];
  searchSellers?: Maybe<Array<User>>;
  verifyEmail: Scalars['Boolean']['output'];
};


export type QueryGetAllPostingsArgs = {
  page: Scalars['Float']['input'];
};


export type QueryGetChatArgs = {
  username: Scalars['String']['input'];
};


export type QueryGetCitiesArgs = {
  countryID: Scalars['Int']['input'];
  stateID?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetHasUserAppliedArgs = {
  postingID: Scalars['Float']['input'];
};


export type QueryGetPostingArgs = {
  id: Scalars['Int']['input'];
  owned?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetPostingApplicationsArgs = {
  postingID: Scalars['Int']['input'];
};


export type QueryGetPostingSelectedArgs = {
  postingID: Scalars['Int']['input'];
};


export type QueryGetSellerArgs = {
  username: Scalars['String']['input'];
};


export type QueryGetStatesArgs = {
  countryID: Scalars['Int']['input'];
};


export type QueryGetUserPostingsArgs = {
  page?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetUserPostingsLatestArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  username: Scalars['String']['input'];
};


export type QueryIsUsernameAvailableArgs = {
  username: Scalars['String']['input'];
};


export type QuerySearchSellersArgs = {
  filters: SearchSellersFilters;
};


export type QueryVerifyEmailArgs = {
  token: Scalars['String']['input'];
};

export enum Roles {
  Admin = 'Admin',
  Agency = 'Agency',
  Brand = 'Brand',
  Creator = 'Creator'
}

export type Recommendation = {
  __typename?: 'Recommendation';
  status?: Maybe<ApplicationStatus>;
  user: User;
};

export type Review = {
  __typename?: 'Review';
  feedback?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  photo?: Maybe<Scalars['String']['output']>;
  rating: Scalars['Float']['output'];
  username: Scalars['String']['output'];
};

export type SearchSellersFilters = {
  query?: InputMaybe<Scalars['String']['input']>;
};

export type SendReviewByAgencyArgs = {
  application: Scalars['Float']['input'];
  userFeedback?: InputMaybe<Scalars['String']['input']>;
  userRating: Scalars['Float']['input'];
};

export type SendReviewByUserArgs = {
  agencyFeedback?: InputMaybe<Scalars['String']['input']>;
  agencyRating: Scalars['Float']['input'];
  caption?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  posting: Scalars['Float']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  campaignsUsage: Scalars['Float']['output'];
  link?: Maybe<Scalars['String']['output']>;
  nextBilling?: Maybe<Scalars['Float']['output']>;
  plan?: Maybe<SubscriptionPlan>;
  searchUsage: Scalars['Float']['output'];
  status?: Maybe<SubscriptionPlanStatus>;
  subscriptionID?: Maybe<Scalars['String']['output']>;
};

export enum SubscriptionPlan {
  Plus = 'Plus'
}

export enum SubscriptionPlanStatus {
  Active = 'Active',
  Cancelled = 'Cancelled',
  Expired = 'Expired',
  Failed = 'Failed',
  OnHold = 'OnHold',
  Paused = 'Paused',
  Pending = 'Pending'
}

export type UpdateInstagramUsernameResponse = {
  __typename?: 'UpdateInstagramUsernameResponse';
  bio: Scalars['String']['output'];
  name: Scalars['String']['output'];
  photo?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type UpdateLocation = {
  city?: InputMaybe<Scalars['Float']['input']>;
  country: Scalars['Float']['input'];
};

export type UpdatePortfolioArgs = {
  caption?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePostingInput = {
  barter?: InputMaybe<Scalars['Boolean']['input']>;
  cities?: InputMaybe<Array<Scalars['Int']['input']>>;
  countries?: InputMaybe<Array<Scalars['Int']['input']>>;
  currencyCountry?: InputMaybe<Scalars['Int']['input']>;
  deliverables?: InputMaybe<Array<Scalars['String']['input']>>;
  description?: InputMaybe<Scalars['String']['input']>;
  externalLink?: InputMaybe<Scalars['String']['input']>;
  extraDetails?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  maximumAge?: InputMaybe<Scalars['Float']['input']>;
  minimumAge?: InputMaybe<Scalars['Float']['input']>;
  minimumFollowers?: InputMaybe<Scalars['Float']['input']>;
  platforms?: InputMaybe<Array<PostingPlatforms>>;
  price?: InputMaybe<Scalars['Int']['input']>;
  states?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  photo?: InputMaybe<Scalars['String']['input']>;
  pricing?: InputMaybe<PricingInput>;
  role?: InputMaybe<Roles>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  dob?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailVerified: Scalars['Boolean']['output'];
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  instagramMedia?: Maybe<Array<InstagramMedia>>;
  instagramStats?: Maybe<InstagramStats>;
  isOnboarded?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<Location>;
  locationID?: Maybe<LocationId>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  portfolio: Array<Portfolio>;
  pricing?: Maybe<Pricing>;
  reviews: Array<Review>;
  role: Roles;
  username?: Maybe<Scalars['String']['output']>;
};

export type UpdateInstagramUsernameMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UpdateInstagramUsernameMutation = { __typename?: 'Mutation', updateInstagramUsername: { __typename?: 'UpdateInstagramUsernameResponse', photo?: string | null, bio: string, username: string, name: string } };

export type ReadMessageMutationVariables = Exact<{
  conversationID: Scalars['Int']['input'];
}>;


export type ReadMessageMutation = { __typename?: 'Mutation', readMessage: boolean };

export type SendChatMutationVariables = Exact<{
  userID: Scalars['Int']['input'];
  body: Scalars['String']['input'];
}>;


export type SendChatMutation = { __typename?: 'Mutation', sendMessage: boolean };

export type UpdateUserMutationVariables = Exact<{
  updatedUser: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: boolean };

export type UpdatePortfolioMutationVariables = Exact<{
  updatedPortfolio: UpdatePortfolioArgs;
}>;


export type UpdatePortfolioMutation = { __typename?: 'Mutation', updatePortfolio: boolean };

export type UpdateUserLocationMutationVariables = Exact<{
  updatedLocation: UpdateLocation;
}>;


export type UpdateUserLocationMutation = { __typename?: 'Mutation', updateUserLocation: boolean };

export type ApplyNowMutationVariables = Exact<{
  postingID: Scalars['Float']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
}>;


export type ApplyNowMutation = { __typename?: 'Mutation', applyToPosting: boolean };

export type DeletePostingMutationVariables = Exact<{
  postingID: Scalars['Float']['input'];
}>;


export type DeletePostingMutation = { __typename?: 'Mutation', deletePosting: boolean };

export type PausePostingMutationVariables = Exact<{
  postingID: Scalars['Float']['input'];
}>;


export type PausePostingMutation = { __typename?: 'Mutation', pausePosting: boolean };

export type ResumePostingMutationVariables = Exact<{
  postingID: Scalars['Float']['input'];
}>;


export type ResumePostingMutation = { __typename?: 'Mutation', resumePosting: boolean };

export type CreatePostingMutationVariables = Exact<{
  newPosting: NewPostingInput;
}>;


export type CreatePostingMutation = { __typename?: 'Mutation', createPosting?: number | null };

export type UpdatePostingMutationVariables = Exact<{
  newPosting: UpdatePostingInput;
  id: Scalars['Float']['input'];
}>;


export type UpdatePostingMutation = { __typename?: 'Mutation', updatePosting: boolean };

export type SendResetPasswordEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendResetPasswordEmailMutation = { __typename?: 'Mutation', sendResetPasswordEmail?: boolean | null };

export type SendVerificationEmailMutationVariables = Exact<{ [key: string]: never; }>;


export type SendVerificationEmailMutation = { __typename?: 'Mutation', sendVerificationEmail: boolean };

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type AddPortfolioMutationVariables = Exact<{
  portfolio: AddPortfolioArgs;
}>;


export type AddPortfolioMutation = { __typename?: 'Mutation', addPortfolio: { __typename?: 'Portfolio', id: number, imageURL?: string | null } };

export type DeletePortfolioMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeletePortfolioMutation = { __typename?: 'Mutation', deletePortfolio: boolean };

export type LikeApplicationMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type LikeApplicationMutation = { __typename?: 'Mutation', likeApplication: boolean };

export type UpdateShortlistMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  accepted: Scalars['Boolean']['input'];
}>;


export type UpdateShortlistMutation = { __typename?: 'Mutation', updateShortlist: boolean };

export type ShortlistUserMutationVariables = Exact<{
  userID: Scalars['Float']['input'];
  postingID: Scalars['Float']['input'];
}>;


export type ShortlistUserMutation = { __typename?: 'Mutation', shortlistUser: boolean };

export type RejectApplicationMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type RejectApplicationMutation = { __typename?: 'Mutation', rejectApplication: boolean };

export type AcceptPostingMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type AcceptPostingMutation = { __typename?: 'Mutation', acceptPosting: boolean };

export type RejectPostingMutationVariables = Exact<{
  id: Scalars['Float']['input'];
  reason: Scalars['String']['input'];
}>;


export type RejectPostingMutation = { __typename?: 'Mutation', rejectPosting: boolean };

export type SendReviewByAgencyMutationVariables = Exact<{
  args: SendReviewByAgencyArgs;
}>;


export type SendReviewByAgencyMutation = { __typename?: 'Mutation', sendReviewByAgency: boolean };

export type SendReviewByUserMutationVariables = Exact<{
  args: SendReviewByUserArgs;
}>;


export type SendReviewByUserMutation = { __typename?: 'Mutation', sendReviewByUser: boolean };

export type UnlinkSocialAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type UnlinkSocialAccountMutation = { __typename?: 'Mutation', unlinkSocialAccount: boolean };

export type SendAnnouncementMutationVariables = Exact<{
  body: Scalars['String']['input'];
  postingID: Scalars['Float']['input'];
  apps?: InputMaybe<Array<Scalars['Float']['input']> | Scalars['Float']['input']>;
}>;


export type SendAnnouncementMutation = { __typename?: 'Mutation', sendAnnouncement: boolean };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, bio?: string | null, email?: string | null, username?: string | null, name?: string | null, photo?: string | null, role: Roles, emailVerified: boolean, isOnboarded?: boolean | null, instagramStats?: { __typename?: 'InstagramStats', username: string, isVerified: boolean } | null } | null };

export type GetUserCurrencyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserCurrencyQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, locationID?: { __typename?: 'LocationID', country?: number | null } | null } | null };

export type GetDefaultOnboardingDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDefaultOnboardingDetailsQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: number, email?: string | null, name?: string | null, photo?: string | null, role: Roles, isOnboarded?: boolean | null, bio?: string | null, username?: string | null, gender?: string | null, category?: string | null, dob?: string | null, instagramStats?: { __typename?: 'InstagramStats', username: string } | null, pricing?: { __typename?: 'Pricing', starting?: number | null } | null, location?: { __typename?: 'Location', city?: string | null, currency: string } | null, locationID?: { __typename?: 'LocationID', city?: number | null, country?: number | null } | null } | null };

export type GetFeaturedSellersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeaturedSellersQuery = { __typename?: 'Query', sellers: Array<{ __typename?: 'User', username?: string | null, name?: string | null, photo?: string | null, bio?: string | null, category?: string | null, instagramStats?: { __typename?: 'InstagramStats', username: string, followers: number, er: number, isVerified: boolean } | null }>, postings: Array<{ __typename?: 'Posting', id: number, price?: number | null, platforms: Array<PostingPlatforms>, currency?: string | null, title: string, open: boolean, minimumAge?: number | null, maximumAge?: number | null, barter: boolean, applicationsCount: number, minimumFollowers?: number | null, externalLink?: string | null, description: string, deliverables?: Array<string> | null, agency: { __typename?: 'User', photo?: string | null, name?: string | null } }> };

export type GetSellerQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetSellerQuery = { __typename?: 'Query', getSeller?: { __typename?: 'User', id: number, name?: string | null, photo?: string | null, bio?: string | null, role: Roles, gender?: string | null, category?: string | null, dob?: string | null, reviews: Array<{ __typename?: 'Review', feedback?: string | null, rating: number, name: string, photo?: string | null, username: string }>, portfolio: Array<{ __typename?: 'Portfolio', caption?: string | null, id: number, link?: string | null, imageURL?: string | null }>, location?: { __typename?: 'Location', city?: string | null, country?: string | null, currency: string } | null, pricing?: { __typename?: 'Pricing', starting?: number | null } | null, instagramMedia?: Array<{ __typename?: 'InstagramMedia', thumbnail: string, caption?: string | null, link: string, likes: number, comments: number, er?: number | null, timestamp: string }> | null, instagramStats?: { __typename?: 'InstagramStats', followers: number, mediaCount: number, username: string, er: number, averageLikes: number, isVerified: boolean } | null } | null };

export type GetChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'Conversation', id: number, preview?: { __typename?: 'Preview', text: string, hasRead: number, at: number } | null, user?: { __typename?: 'User', id: number, username?: string | null, name?: string | null, photo?: string | null } | null }> };

export type GetChatQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetChatQuery = { __typename?: 'Query', chat?: { __typename?: 'Conversation', id: number, user?: { __typename?: 'User', id: number, name?: string | null, photo?: string | null } | null, preview?: { __typename?: 'Preview', text: string } | null, messages: Array<{ __typename?: 'Message', body: string, createdAt: number, by: number }> } | null };

export type GetAccountPortfolioDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountPortfolioDetailsQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, portfolio: Array<{ __typename?: 'Portfolio', caption?: string | null, id: number, link?: string | null, imageURL?: string | null }> } | null };

export type GetAccountSocialDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountSocialDetailsQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, instagramStats?: { __typename?: 'InstagramStats', username: string, isVerified: boolean, followers: number, mediaCount: number, er: number, averageLikes: number, averageComments: number } | null } | null };

export type GetAccountProfileDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountProfileDetailsQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, name?: string | null, email?: string | null, emailVerified: boolean, bio?: string | null, photo?: string | null, phone?: string | null, category?: string | null, gender?: string | null, role: Roles, dob?: string | null, username?: string | null, locationID?: { __typename?: 'LocationID', city?: number | null, country?: number | null } | null, location?: { __typename?: 'Location', city?: string | null, country?: string | null } | null } | null };

export type GetCitiesQueryVariables = Exact<{
  countryID: Scalars['Int']['input'];
  stateID?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCitiesQuery = { __typename?: 'Query', cities: Array<{ __typename?: 'CitySelectOption', value: number, label: string }> };

export type GetStatesQueryVariables = Exact<{
  countryID: Scalars['Int']['input'];
}>;


export type GetStatesQuery = { __typename?: 'Query', states: Array<{ __typename?: 'CitySelectOption', value: number, label: string }> };

export type SearchSellersQueryVariables = Exact<{
  filters: SearchSellersFilters;
}>;


export type SearchSellersQuery = { __typename?: 'Query', sellers?: Array<{ __typename?: 'User', name?: string | null, username?: string | null, photo?: string | null, bio?: string | null, category?: string | null, gender?: string | null, instagramStats?: { __typename?: 'InstagramStats', username: string, isVerified: boolean, followers: number } | null, pricing?: { __typename?: 'Pricing', starting?: number | null } | null, location?: { __typename?: 'Location', city?: string | null, country?: string | null, currency: string } | null }> | null };

export type IsUsernameAvailableQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type IsUsernameAvailableQuery = { __typename?: 'Query', isUsernameAvailable: boolean };

export type GetPostingQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  owned?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetPostingQuery = { __typename?: 'Query', posting?: { __typename?: 'Posting', id: number, gender?: string | null, maximumAge?: number | null, minimumFollowers?: number | null, externalLink?: string | null, extraDetails?: string | null, currencyCountry?: number | null, selectedCount: number, applicationsCount: number, description: string, barter: boolean, minimumAge?: number | null, open: boolean, title: string, currency?: string | null, price?: number | null, createdAt: number, platforms: Array<PostingPlatforms>, hasApplied?: boolean | null, eligibility?: Eligibility | null, updatedAt: number, deliverables?: Array<string> | null, inReview: boolean, countries?: Array<number> | null, agency: { __typename?: 'User', id: number, name?: string | null, photo?: string | null, username?: string | null, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean, username: string } | null }, states: Array<{ __typename?: 'CitySelectOption', value: number, label: string }>, cities: Array<{ __typename?: 'CitySelectOption', value: number, label: string }>, reviews: Array<{ __typename?: 'Review', rating: number, photo?: string | null, username: string }> } | null };

export type GetAllPostingsQueryVariables = Exact<{
  page: Scalars['Float']['input'];
}>;


export type GetAllPostingsQuery = { __typename?: 'Query', postings: Array<{ __typename?: 'Posting', id: number, maximumAge?: number | null, minimumFollowers?: number | null, inReview: boolean, externalLink?: string | null, extraDetails?: string | null, currencyCountry?: number | null, applicationsCount: number, description: string, barter: boolean, minimumAge?: number | null, open: boolean, title: string, currency?: string | null, price?: number | null, createdAt: number, platforms: Array<PostingPlatforms>, hasApplied?: boolean | null, eligibility?: Eligibility | null, updatedAt: number, deliverables?: Array<string> | null, agency: { __typename?: 'User', id: number, name?: string | null, photo?: string | null, username?: string | null, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean, username: string } | null }, reviews: Array<{ __typename?: 'Review', rating: number, photo?: string | null, username: string }> }> };

export type GetUserPostingsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetUserPostingsQuery = { __typename?: 'Query', postings: Array<{ __typename?: 'Posting', id: number, maximumAge?: number | null, referralEarnings: number, minimumFollowers?: number | null, applicationsCount: number, description: string, barter: boolean, minimumAge?: number | null, extraDetails?: string | null, open: boolean, title: string, currency?: string | null, price?: number | null, createdAt: number, platforms: Array<PostingPlatforms>, updatedAt: number, deliverables?: Array<string> | null, currencyCountry?: number | null, inReview: boolean }> };

export type GetUserPostingsLatestQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  username: Scalars['String']['input'];
}>;


export type GetUserPostingsLatestQuery = { __typename?: 'Query', postings: Array<{ __typename?: 'Posting', id: number, maximumAge?: number | null, referralEarnings: number, minimumFollowers?: number | null, applicationsCount: number, description: string, barter: boolean, minimumAge?: number | null, extraDetails?: string | null, open: boolean, title: string, currency?: string | null, price?: number | null, createdAt: number, platforms: Array<PostingPlatforms>, updatedAt: number, deliverables?: Array<string> | null, currencyCountry?: number | null, inReview: boolean }> };

export type GetPostingApplicationsQueryVariables = Exact<{
  postingID: Scalars['Int']['input'];
}>;


export type GetPostingApplicationsQuery = { __typename?: 'Query', posting?: { __typename?: 'Posting', title: string, id: number, extraDetails?: string | null, externalLink?: string | null, announcementCount: number } | null, applications: Array<{ __typename?: 'Application', status: ApplicationStatus, hasReview: boolean, createdAt: number, id: number, comment?: string | null, user?: { __typename?: 'User', id: number, name?: string | null, photo?: string | null, dob?: string | null, email?: string | null, phone?: string | null, gender?: string | null, bio?: string | null, username?: string | null, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean, username: string, followers: number, averageLikes: number, averageComments: number, er: number, mediaCount: number } | null } | null }> };

export type GetPostingSelectedQueryVariables = Exact<{
  postingID: Scalars['Int']['input'];
}>;


export type GetPostingSelectedQuery = { __typename?: 'Query', posting?: { __typename?: 'Posting', title: string, id: number, extraDetails?: string | null, announcementCount: number, externalLink?: string | null } | null, applications: Array<{ __typename?: 'Application', status: ApplicationStatus, createdAt: number, hasReview: boolean, id: number, comment?: string | null, user?: { __typename?: 'User', id: number, name?: string | null, photo?: string | null, dob?: string | null, email?: string | null, phone?: string | null, gender?: string | null, bio?: string | null, username?: string | null, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean, username: string, followers: number, averageLikes: number, averageComments: number, er: number, mediaCount: number } | null } | null }> };

export type GetPostingRecommendationsQueryVariables = Exact<{
  postingID: Scalars['Int']['input'];
}>;


export type GetPostingRecommendationsQuery = { __typename?: 'Query', posting?: { __typename?: 'Posting', title: string, externalLink?: string | null, extraDetails?: string | null, announcementCount: number, id: number, recommendations: Array<{ __typename?: 'Recommendation', status?: ApplicationStatus | null, user: { __typename?: 'User', id: number, name?: string | null, photo?: string | null, dob?: string | null, email?: string | null, phone?: string | null, gender?: string | null, bio?: string | null, username?: string | null, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean, username: string, followers: number, averageLikes: number, averageComments: number, er: number, mediaCount: number } | null } }> } | null };

export type VerifyEmailQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyEmailQuery = { __typename?: 'Query', verifyEmail: boolean };

export type GetUserApplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserApplicationsQuery = { __typename?: 'Query', getPendingReviews: Array<number>, getUserApplications: Array<{ __typename?: 'Application', id: number, status: ApplicationStatus, comment?: string | null, createdAt: number, posting?: { __typename?: 'Posting', title: string, id: number, agency: { __typename?: 'User', name?: string | null, username?: string | null, photo?: string | null } } | null }> };

export type GetPostingsInReviewQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostingsInReviewQuery = { __typename?: 'Query', getPostingsInReview: Array<{ __typename?: 'Posting', id: number, maximumAge?: number | null, minimumFollowers?: number | null, inReview: boolean, externalLink?: string | null, extraDetails?: string | null, currencyCountry?: number | null, applicationsCount: number, description: string, barter: boolean, minimumAge?: number | null, open: boolean, title: string, currency?: string | null, price?: number | null, createdAt: number, platforms: Array<PostingPlatforms>, hasApplied?: boolean | null, eligibility?: Eligibility | null, updatedAt: number, deliverables?: Array<string> | null, agency: { __typename?: 'User', id: number, name?: string | null, photo?: string | null, username?: string | null, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean, username: string } | null }, reviews: Array<{ __typename?: 'Review', rating: number, photo?: string | null, username: string }> }> };

export type GetSubscriptionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubscriptionQuery = { __typename?: 'Query', getSubscription?: { __typename?: 'Subscription', link?: string | null } | null };


export const UpdateInstagramUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateInstagramUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateInstagramUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateInstagramUsernameMutation, UpdateInstagramUsernameMutationVariables>;
export const ReadMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReadMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"conversationID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationID"}}}]}]}}]} as unknown as DocumentNode<ReadMessageMutation, ReadMessageMutationVariables>;
export const SendChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}}]}]}}]} as unknown as DocumentNode<SendChatMutation, SendChatMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatedUser"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatedUser"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatedUser"}}}]}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdatePortfolioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePortfolio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatedPortfolio"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePortfolioArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePortfolio"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatedPortfolio"}}}]}]}}]} as unknown as DocumentNode<UpdatePortfolioMutation, UpdatePortfolioMutationVariables>;
export const UpdateUserLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatedLocation"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateLocation"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatedLocation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatedLocation"}}}]}]}}]} as unknown as DocumentNode<UpdateUserLocationMutation, UpdateUserLocationMutationVariables>;
export const ApplyNowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApplyNow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applyToPosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}},{"kind":"Argument","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}}]}]}}]} as unknown as DocumentNode<ApplyNowMutation, ApplyNowMutationVariables>;
export const DeletePostingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePosting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}}]}]}}]} as unknown as DocumentNode<DeletePostingMutation, DeletePostingMutationVariables>;
export const PausePostingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PausePosting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pausePosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}}]}]}}]} as unknown as DocumentNode<PausePostingMutation, PausePostingMutationVariables>;
export const ResumePostingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResumePosting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resumePosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}}]}]}}]} as unknown as DocumentNode<ResumePostingMutation, ResumePostingMutationVariables>;
export const CreatePostingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePosting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPosting"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewPostingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPosting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPosting"}}}]}]}}]} as unknown as DocumentNode<CreatePostingMutation, CreatePostingMutationVariables>;
export const UpdatePostingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePosting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPosting"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePostingInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"updatedPosting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPosting"}}}]}]}}]} as unknown as DocumentNode<UpdatePostingMutation, UpdatePostingMutationVariables>;
export const SendResetPasswordEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendResetPasswordEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendResetPasswordEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<SendResetPasswordEmailMutation, SendResetPasswordEmailMutationVariables>;
export const SendVerificationEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendVerificationEmail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendVerificationEmail"}}]}}]} as unknown as DocumentNode<SendVerificationEmailMutation, SendVerificationEmailMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const AddPortfolioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPortfolio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"portfolio"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddPortfolioArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPortfolio"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"portfolio"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}}]}}]}}]} as unknown as DocumentNode<AddPortfolioMutation, AddPortfolioMutationVariables>;
export const DeletePortfolioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePortfolio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePortfolio"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeletePortfolioMutation, DeletePortfolioMutationVariables>;
export const LikeApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<LikeApplicationMutation, LikeApplicationMutationVariables>;
export const UpdateShortlistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateShortlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accepted"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateShortlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"accepted"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accepted"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<UpdateShortlistMutation, UpdateShortlistMutationVariables>;
export const ShortlistUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ShortlistUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortlistUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}},{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}}]}]}}]} as unknown as DocumentNode<ShortlistUserMutation, ShortlistUserMutationVariables>;
export const RejectApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RejectApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rejectApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RejectApplicationMutation, RejectApplicationMutationVariables>;
export const AcceptPostingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcceptPosting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"acceptPosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<AcceptPostingMutation, AcceptPostingMutationVariables>;
export const RejectPostingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RejectPosting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reason"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rejectPosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"reason"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reason"}}},{"kind":"Argument","name":{"kind":"Name","value":"postingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RejectPostingMutation, RejectPostingMutationVariables>;
export const SendReviewByAgencyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendReviewByAgency"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"args"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendReviewByAgencyArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendReviewByAgency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"Variable","name":{"kind":"Name","value":"args"}}}]}]}}]} as unknown as DocumentNode<SendReviewByAgencyMutation, SendReviewByAgencyMutationVariables>;
export const SendReviewByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendReviewByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"args"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendReviewByUserArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendReviewByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"Variable","name":{"kind":"Name","value":"args"}}}]}]}}]} as unknown as DocumentNode<SendReviewByUserMutation, SendReviewByUserMutationVariables>;
export const UnlinkSocialAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UnlinkSocialAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unlinkSocialAccount"}}]}}]} as unknown as DocumentNode<UnlinkSocialAccountMutation, UnlinkSocialAccountMutationVariables>;
export const SendAnnouncementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendAnnouncement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"apps"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendAnnouncement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}},{"kind":"Argument","name":{"kind":"Name","value":"postingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}},{"kind":"Argument","name":{"kind":"Name","value":"apps"},"value":{"kind":"Variable","name":{"kind":"Name","value":"apps"}}}]}]}}]} as unknown as DocumentNode<SendAnnouncementMutation, SendAnnouncementMutationVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"isOnboarded"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetUserCurrencyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserCurrency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locationID"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserCurrencyQuery, GetUserCurrencyQueryVariables>;
export const GetDefaultOnboardingDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDefaultOnboardingDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isOnboarded"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starting"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"locationID"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}}]}}]}}]} as unknown as DocumentNode<GetDefaultOnboardingDetailsQuery, GetDefaultOnboardingDetailsQueryVariables>;
export const GetFeaturedSellersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFeaturedSellers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"sellers"},"name":{"kind":"Name","value":"getFeaturedSellers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"followers"}},{"kind":"Field","name":{"kind":"Name","value":"er"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"postings"},"name":{"kind":"Name","value":"getFeaturedPostings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"platforms"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"minimumAge"}},{"kind":"Field","name":{"kind":"Name","value":"maximumAge"}},{"kind":"Field","name":{"kind":"Name","value":"barter"}},{"kind":"Field","name":{"kind":"Name","value":"applicationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"minimumFollowers"}},{"kind":"Field","name":{"kind":"Name","value":"externalLink"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"deliverables"}},{"kind":"Field","name":{"kind":"Name","value":"agency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetFeaturedSellersQuery, GetFeaturedSellersQueryVariables>;
export const GetSellerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSeller"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSeller"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedback"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"portfolio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starting"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instagramMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"er"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followers"}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"er"}},{"kind":"Field","name":{"kind":"Name","value":"averageLikes"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}}]}}]} as unknown as DocumentNode<GetSellerQuery, GetSellerQueryVariables>;
export const GetChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"chats"},"name":{"kind":"Name","value":"getChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"hasRead"}},{"kind":"Field","name":{"kind":"Name","value":"at"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]}}]}}]} as unknown as DocumentNode<GetChatsQuery, GetChatsQueryVariables>;
export const GetChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"chat"},"name":{"kind":"Name","value":"getChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"preview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"by"}}]}}]}}]}}]} as unknown as DocumentNode<GetChatQuery, GetChatQueryVariables>;
export const GetAccountPortfolioDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccountPortfolioDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"portfolio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}}]}}]}}]}}]} as unknown as DocumentNode<GetAccountPortfolioDetailsQuery, GetAccountPortfolioDetailsQueryVariables>;
export const GetAccountSocialDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccountSocialDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"followers"}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}},{"kind":"Field","name":{"kind":"Name","value":"er"}},{"kind":"Field","name":{"kind":"Name","value":"averageLikes"}},{"kind":"Field","name":{"kind":"Name","value":"averageComments"}}]}}]}}]}}]} as unknown as DocumentNode<GetAccountSocialDetailsQuery, GetAccountSocialDetailsQueryVariables>;
export const GetAccountProfileDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccountProfileDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"locationID"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}}]}}]}}]} as unknown as DocumentNode<GetAccountProfileDetailsQuery, GetAccountProfileDetailsQueryVariables>;
export const GetCitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"countryID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stateID"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"cities"},"name":{"kind":"Name","value":"getCities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"countryID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"countryID"}}},{"kind":"Argument","name":{"kind":"Name","value":"stateID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stateID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<GetCitiesQuery, GetCitiesQueryVariables>;
export const GetStatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"countryID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"states"},"name":{"kind":"Name","value":"getStates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"countryID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"countryID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<GetStatesQuery, GetStatesQueryVariables>;
export const SearchSellersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchSellers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchSellersFilters"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"sellers"},"name":{"kind":"Name","value":"searchSellers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"followers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starting"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}}]}}]}}]}}]} as unknown as DocumentNode<SearchSellersQuery, SearchSellersQueryVariables>;
export const IsUsernameAvailableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsUsernameAvailable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isUsernameAvailable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<IsUsernameAvailableQuery, IsUsernameAvailableQueryVariables>;
export const GetPostingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPosting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"owned"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"posting"},"name":{"kind":"Name","value":"getPosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"owned"},"value":{"kind":"Variable","name":{"kind":"Name","value":"owned"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"maximumAge"}},{"kind":"Field","name":{"kind":"Name","value":"minimumFollowers"}},{"kind":"Field","name":{"kind":"Name","value":"externalLink"}},{"kind":"Field","name":{"kind":"Name","value":"extraDetails"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCountry"}},{"kind":"Field","name":{"kind":"Name","value":"selectedCount"}},{"kind":"Field","name":{"kind":"Name","value":"agency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"applicationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"barter"}},{"kind":"Field","name":{"kind":"Name","value":"minimumAge"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"platforms"}},{"kind":"Field","name":{"kind":"Name","value":"hasApplied"}},{"kind":"Field","name":{"kind":"Name","value":"eligibility"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deliverables"}},{"kind":"Field","name":{"kind":"Name","value":"inReview"}},{"kind":"Field","name":{"kind":"Name","value":"countries"}},{"kind":"Field","name":{"kind":"Name","value":"states"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostingQuery, GetPostingQueryVariables>;
export const GetAllPostingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllPostings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"postings"},"name":{"kind":"Name","value":"getAllPostings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maximumAge"}},{"kind":"Field","name":{"kind":"Name","value":"minimumFollowers"}},{"kind":"Field","name":{"kind":"Name","value":"inReview"}},{"kind":"Field","name":{"kind":"Name","value":"externalLink"}},{"kind":"Field","name":{"kind":"Name","value":"extraDetails"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCountry"}},{"kind":"Field","name":{"kind":"Name","value":"agency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"applicationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"barter"}},{"kind":"Field","name":{"kind":"Name","value":"minimumAge"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"platforms"}},{"kind":"Field","name":{"kind":"Name","value":"hasApplied"}},{"kind":"Field","name":{"kind":"Name","value":"eligibility"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deliverables"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllPostingsQuery, GetAllPostingsQueryVariables>;
export const GetUserPostingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserPostings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"postings"},"name":{"kind":"Name","value":"getUserPostings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maximumAge"}},{"kind":"Field","name":{"kind":"Name","value":"referralEarnings"}},{"kind":"Field","name":{"kind":"Name","value":"minimumFollowers"}},{"kind":"Field","name":{"kind":"Name","value":"applicationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"barter"}},{"kind":"Field","name":{"kind":"Name","value":"minimumAge"}},{"kind":"Field","name":{"kind":"Name","value":"extraDetails"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"platforms"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deliverables"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCountry"}},{"kind":"Field","name":{"kind":"Name","value":"inReview"}}]}}]}}]} as unknown as DocumentNode<GetUserPostingsQuery, GetUserPostingsQueryVariables>;
export const GetUserPostingsLatestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserPostingsLatest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"postings"},"name":{"kind":"Name","value":"getUserPostingsLatest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maximumAge"}},{"kind":"Field","name":{"kind":"Name","value":"referralEarnings"}},{"kind":"Field","name":{"kind":"Name","value":"minimumFollowers"}},{"kind":"Field","name":{"kind":"Name","value":"applicationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"barter"}},{"kind":"Field","name":{"kind":"Name","value":"minimumAge"}},{"kind":"Field","name":{"kind":"Name","value":"extraDetails"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"platforms"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deliverables"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCountry"}},{"kind":"Field","name":{"kind":"Name","value":"inReview"}}]}}]}}]} as unknown as DocumentNode<GetUserPostingsLatestQuery, GetUserPostingsLatestQueryVariables>;
export const GetPostingApplicationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostingApplications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"posting"},"name":{"kind":"Name","value":"getPosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}},{"kind":"Argument","name":{"kind":"Name","value":"owned"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"extraDetails"}},{"kind":"Field","name":{"kind":"Name","value":"externalLink"}},{"kind":"Field","name":{"kind":"Name","value":"announcementCount"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"applications"},"name":{"kind":"Name","value":"getPostingApplications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"hasReview"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"followers"}},{"kind":"Field","name":{"kind":"Name","value":"averageLikes"}},{"kind":"Field","name":{"kind":"Name","value":"averageComments"}},{"kind":"Field","name":{"kind":"Name","value":"er"}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]} as unknown as DocumentNode<GetPostingApplicationsQuery, GetPostingApplicationsQueryVariables>;
export const GetPostingSelectedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostingSelected"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"posting"},"name":{"kind":"Name","value":"getPosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}},{"kind":"Argument","name":{"kind":"Name","value":"owned"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"extraDetails"}},{"kind":"Field","name":{"kind":"Name","value":"announcementCount"}},{"kind":"Field","name":{"kind":"Name","value":"externalLink"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"applications"},"name":{"kind":"Name","value":"getPostingSelected"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"hasReview"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"followers"}},{"kind":"Field","name":{"kind":"Name","value":"averageLikes"}},{"kind":"Field","name":{"kind":"Name","value":"averageComments"}},{"kind":"Field","name":{"kind":"Name","value":"er"}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]} as unknown as DocumentNode<GetPostingSelectedQuery, GetPostingSelectedQueryVariables>;
export const GetPostingRecommendationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostingRecommendations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"posting"},"name":{"kind":"Name","value":"getPosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}},{"kind":"Argument","name":{"kind":"Name","value":"owned"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"externalLink"}},{"kind":"Field","name":{"kind":"Name","value":"extraDetails"}},{"kind":"Field","name":{"kind":"Name","value":"announcementCount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"recommendations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"followers"}},{"kind":"Field","name":{"kind":"Name","value":"averageLikes"}},{"kind":"Field","name":{"kind":"Name","value":"averageComments"}},{"kind":"Field","name":{"kind":"Name","value":"er"}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPostingRecommendationsQuery, GetPostingRecommendationsQueryVariables>;
export const VerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifyEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}]}]}}]} as unknown as DocumentNode<VerifyEmailQuery, VerifyEmailQueryVariables>;
export const GetUserApplicationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserApplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPendingReviews"}},{"kind":"Field","name":{"kind":"Name","value":"getUserApplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"posting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"agency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserApplicationsQuery, GetUserApplicationsQueryVariables>;
export const GetPostingsInReviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostingsInReview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostingsInReview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maximumAge"}},{"kind":"Field","name":{"kind":"Name","value":"minimumFollowers"}},{"kind":"Field","name":{"kind":"Name","value":"inReview"}},{"kind":"Field","name":{"kind":"Name","value":"externalLink"}},{"kind":"Field","name":{"kind":"Name","value":"extraDetails"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCountry"}},{"kind":"Field","name":{"kind":"Name","value":"agency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"applicationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"barter"}},{"kind":"Field","name":{"kind":"Name","value":"minimumAge"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"platforms"}},{"kind":"Field","name":{"kind":"Name","value":"hasApplied"}},{"kind":"Field","name":{"kind":"Name","value":"eligibility"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deliverables"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<GetPostingsInReviewQuery, GetPostingsInReviewQueryVariables>;
export const GetSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]} as unknown as DocumentNode<GetSubscriptionQuery, GetSubscriptionQueryVariables>;