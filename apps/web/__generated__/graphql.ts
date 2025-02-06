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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
};

export type AddPortfolioArgs = {
  caption?: InputMaybe<Scalars['String']['input']>;
  imageURL: Scalars['String']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
};

export type Application = {
  __typename?: 'Application';
  comment?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  posting?: Maybe<Posting>;
  referralEarnings: Scalars['Float']['output'];
  user?: Maybe<User>;
};

export type Chat = {
  __typename?: 'Chat';
  conversation: Scalars['Int']['output'];
  hasRead: Scalars['Boolean']['output'];
  messages: Array<Message>;
  preview: Scalars['String']['output'];
  with: User;
};


export type ChatMessagesArgs = {
  page?: InputMaybe<Scalars['Float']['input']>;
};

export type Currency = {
  __typename?: 'Currency';
  code?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};

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
  type: InstagramMediaType;
};

export enum InstagramMediaType {
  CarouselAlbum = 'CarouselAlbum',
  Image = 'Image',
  Video = 'Video'
}

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
  currency?: Maybe<Currency>;
};

export type LocationId = {
  __typename?: 'LocationID';
  city?: Maybe<Scalars['Float']['output']>;
  country?: Maybe<Scalars['Float']['output']>;
  state?: Maybe<Scalars['Float']['output']>;
};

export type Message = {
  __typename?: 'Message';
  body: Scalars['String']['output'];
  sender: Scalars['Int']['output'];
  sentAt: Scalars['DateTimeISO']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPortfolio: Scalars['Boolean']['output'];
  applyToPosting: Scalars['Boolean']['output'];
  completeOnboarding: Scalars['Boolean']['output'];
  createPosting?: Maybe<Scalars['Float']['output']>;
  deletePortfolio: Scalars['Boolean']['output'];
  deletePosting: Scalars['Boolean']['output'];
  disconnectInstagram: Scalars['Boolean']['output'];
  pausePosting: Scalars['Boolean']['output'];
  readMessage: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  resumePosting: Scalars['Boolean']['output'];
  sendMessage: Scalars['Boolean']['output'];
  sendResetPasswordEmail?: Maybe<Scalars['Boolean']['output']>;
  sendVerificationEmail: Scalars['Boolean']['output'];
  updateOnboardingBasicDetails: Scalars['Boolean']['output'];
  updateOnboardingDOB: Scalars['Boolean']['output'];
  updateOnboardingInstagramUsername: Scalars['Boolean']['output'];
  updateOnboardingLocation: Currency;
  updateOnboardingPricing: Scalars['Boolean']['output'];
  updateOnboardingUsername: Scalars['Boolean']['output'];
  updatePosting: Scalars['Boolean']['output'];
  updateUser: Scalars['Boolean']['output'];
  updateUserLocation: Scalars['Boolean']['output'];
};


export type MutationAddPortfolioArgs = {
  data: AddPortfolioArgs;
};


export type MutationApplyToPostingArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
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


export type MutationPausePostingArgs = {
  postingID: Scalars['Float']['input'];
};


export type MutationReadMessageArgs = {
  conversationID: Scalars['Int']['input'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationResumePostingArgs = {
  postingID: Scalars['Float']['input'];
};


export type MutationSendMessageArgs = {
  body: Scalars['String']['input'];
  conversationID: Scalars['Int']['input'];
};


export type MutationSendResetPasswordEmailArgs = {
  email: Scalars['String']['input'];
};


export type MutationUpdateOnboardingBasicDetailsArgs = {
  basicDetails: OnboardingBasicDetailsInput;
};


export type MutationUpdateOnboardingDobArgs = {
  dobDetails: OnboardingDobInput;
};


export type MutationUpdateOnboardingInstagramUsernameArgs = {
  username: Scalars['String']['input'];
};


export type MutationUpdateOnboardingLocationArgs = {
  locationDetails: OnboardingLocationInput;
};


export type MutationUpdateOnboardingPricingArgs = {
  pricingDetails: OnboardingPriceInput;
};


export type MutationUpdateOnboardingUsernameArgs = {
  usernameDetails: OnboardingUsernameInput;
};


export type MutationUpdatePostingArgs = {
  id: Scalars['Float']['input'];
  updatedPosting: UpdatePostingInput;
};


export type MutationUpdateUserArgs = {
  updatedUser: UpdateUserInput;
};


export type MutationUpdateUserLocationArgs = {
  updatedLocation: UpdateLocation;
};

export type NewPostingInput = {
  barter: Scalars['Boolean']['input'];
  currencyCountry?: InputMaybe<Scalars['Int']['input']>;
  deliverables?: InputMaybe<Array<Scalars['String']['input']>>;
  description: Scalars['String']['input'];
  externalLink?: InputMaybe<Scalars['String']['input']>;
  extraDetails?: InputMaybe<Scalars['String']['input']>;
  maximumAge?: InputMaybe<Scalars['Float']['input']>;
  minimumAge?: InputMaybe<Scalars['Float']['input']>;
  minimumFollowers?: InputMaybe<Scalars['Float']['input']>;
  platforms: Array<PostingPlatforms>;
  price?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};

export type OnboardingBasicDetailsInput = {
  bio: Scalars['String']['input'];
  category: Scalars['String']['input'];
  dob?: InputMaybe<Scalars['String']['input']>;
  gender: Scalars['String']['input'];
  imageURL?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type OnboardingDobInput = {
  dob: Scalars['String']['input'];
};

export type OnboardingData = {
  __typename?: 'OnboardingData';
  bio?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['Float']['output']>;
  country?: Maybe<Scalars['Float']['output']>;
  currency?: Maybe<Currency>;
  dob?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  pricing?: Maybe<Pricing>;
  state?: Maybe<Scalars['Float']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type OnboardingLocationInput = {
  city?: InputMaybe<Scalars['Float']['input']>;
  country: Scalars['Float']['input'];
  state: Scalars['Float']['input'];
};

export type OnboardingPriceInput = {
  starting: Scalars['Float']['input'];
};

export type OnboardingUsernameInput = {
  username: Scalars['String']['input'];
};

export type Portfolio = {
  __typename?: 'Portfolio';
  caption?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  imageURL: Scalars['String']['output'];
  link?: Maybe<Scalars['String']['output']>;
};

export type Posting = {
  __typename?: 'Posting';
  applicationsCount: Scalars['Int']['output'];
  barter: Scalars['Boolean']['output'];
  createdAt: Scalars['Float']['output'];
  currency?: Maybe<Scalars['String']['output']>;
  currencyCountry?: Maybe<Scalars['Int']['output']>;
  deliverables?: Maybe<Array<Scalars['String']['output']>>;
  description: Scalars['String']['output'];
  externalLink?: Maybe<Scalars['String']['output']>;
  extraDetails?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  maximumAge?: Maybe<Scalars['Int']['output']>;
  minimumAge?: Maybe<Scalars['Int']['output']>;
  minimumFollowers?: Maybe<Scalars['Int']['output']>;
  open: Scalars['Boolean']['output'];
  platforms: Array<PostingPlatforms>;
  price?: Maybe<Scalars['Int']['output']>;
  referralEarnings: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
  user?: Maybe<User>;
};

export enum PostingPlatforms {
  Instagram = 'INSTAGRAM',
  Youtube = 'YOUTUBE'
}

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
  getChat?: Maybe<Chat>;
  getChats: Array<Chat>;
  getCities: Array<SelectOption>;
  getCountries: Array<SelectOption>;
  getCurrentUser?: Maybe<User>;
  getFeaturedPostings: Array<Posting>;
  getFeaturedPosts: Array<GetFeaturedPostsResponse>;
  getFeaturedSellers: Array<User>;
  getHasUserApplied: Scalars['Boolean']['output'];
  getPortfolioUploadURL?: Maybe<StorageFile>;
  getPosting?: Maybe<Posting>;
  getPostingApplications: Array<Application>;
  getSeller?: Maybe<User>;
  getStates: Array<SelectOption>;
  getUserApplications: Array<Application>;
  getUserPortfolio: Array<Portfolio>;
  getUserPostings: Array<Posting>;
  isUsernameAvailable: Scalars['Boolean']['output'];
  searchSellers?: Maybe<Array<User>>;
  verifyEmail: Scalars['Boolean']['output'];
};


export type QueryGetChatArgs = {
  userID: Scalars['Int']['input'];
};


export type QueryGetCitiesArgs = {
  stateID: Scalars['Int']['input'];
};


export type QueryGetHasUserAppliedArgs = {
  postingID: Scalars['Float']['input'];
};


export type QueryGetPostingArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetPostingApplicationsArgs = {
  postingID: Scalars['Int']['input'];
};


export type QueryGetSellerArgs = {
  username: Scalars['String']['input'];
};


export type QueryGetStatesArgs = {
  countryID: Scalars['Int']['input'];
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
  Admin = 'ADMIN',
  ManuallyVerified = 'ManuallyVerified',
  ReferralCreator = 'ReferralCreator'
}

export type SearchSellersFilters = {
  ageRange?: InputMaybe<Scalars['Int']['input']>;
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  cities?: InputMaybe<Array<Scalars['Int']['input']>>;
  countries?: InputMaybe<Array<Scalars['Int']['input']>>;
  followersFrom?: InputMaybe<Scalars['Int']['input']>;
  followersTo?: InputMaybe<Scalars['Int']['input']>;
  genders?: InputMaybe<Array<Scalars['String']['input']>>;
  generalPriceFrom?: InputMaybe<Scalars['Float']['input']>;
  generalPriceTo?: InputMaybe<Scalars['Float']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  states?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type SelectOption = {
  __typename?: 'SelectOption';
  label: Scalars['String']['output'];
  value: Scalars['Int']['output'];
};

export type StorageFile = {
  __typename?: 'StorageFile';
  uploadURL: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type UpdateLocation = {
  city?: InputMaybe<Scalars['Float']['input']>;
  country: Scalars['Float']['input'];
  state: Scalars['Float']['input'];
};

export type UpdatePostingInput = {
  barter: Scalars['Boolean']['input'];
  currencyCountry?: InputMaybe<Scalars['Int']['input']>;
  deliverables?: InputMaybe<Array<Scalars['String']['input']>>;
  description: Scalars['String']['input'];
  externalLink?: InputMaybe<Scalars['String']['input']>;
  extraDetails?: InputMaybe<Scalars['String']['input']>;
  maximumAge?: InputMaybe<Scalars['Float']['input']>;
  minimumAge?: InputMaybe<Scalars['Float']['input']>;
  minimumFollowers?: InputMaybe<Scalars['Float']['input']>;
  platforms: Array<PostingPlatforms>;
  price?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  photo?: InputMaybe<Scalars['String']['input']>;
  pricing?: InputMaybe<PricingInput>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  dob?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  instagramMedia?: Maybe<Array<InstagramMedia>>;
  instagramStats?: Maybe<InstagramStats>;
  isOnboarded?: Maybe<Scalars['Boolean']['output']>;
  location?: Maybe<Location>;
  locationID?: Maybe<LocationId>;
  name?: Maybe<Scalars['String']['output']>;
  onboardingData?: Maybe<OnboardingData>;
  phone?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  pictureUploadURL: StorageFile;
  portfolio?: Maybe<Array<Portfolio>>;
  pricing?: Maybe<Pricing>;
  roles?: Maybe<Array<Roles>>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UpdateOnboardingBasicDetailsMutationVariables = Exact<{
  basicDetails: OnboardingBasicDetailsInput;
}>;


export type UpdateOnboardingBasicDetailsMutation = { __typename?: 'Mutation', updateOnboardingBasicDetails: boolean };

export type UpdateOnboardingDobMutationVariables = Exact<{
  dobDetails: OnboardingDobInput;
}>;


export type UpdateOnboardingDobMutation = { __typename?: 'Mutation', updateOnboardingDOB: boolean };

export type UpdateOnboardingInstagramUsernameMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UpdateOnboardingInstagramUsernameMutation = { __typename?: 'Mutation', updateOnboardingInstagramUsername: boolean };

export type UpdateOnboardingUsernameMutationVariables = Exact<{
  usernameDetails: OnboardingUsernameInput;
}>;


export type UpdateOnboardingUsernameMutation = { __typename?: 'Mutation', updateOnboardingUsername: boolean };

export type UpdateOnboardingLocationMutationVariables = Exact<{
  locationDetails: OnboardingLocationInput;
}>;


export type UpdateOnboardingLocationMutation = { __typename?: 'Mutation', updateOnboardingLocation: { __typename?: 'Currency', name?: string | null, symbol?: string | null } };

export type UpdateOnboardingPricingMutationVariables = Exact<{
  pricingDetails: OnboardingPriceInput;
}>;


export type UpdateOnboardingPricingMutation = { __typename?: 'Mutation', updateOnboardingPricing: boolean };

export type CompleteOnboardingMutationVariables = Exact<{ [key: string]: never; }>;


export type CompleteOnboardingMutation = { __typename?: 'Mutation', completeOnboarding: boolean };

export type ReadMessageMutationVariables = Exact<{
  conversationID: Scalars['Int']['input'];
}>;


export type ReadMessageMutation = { __typename?: 'Mutation', readMessage: boolean };

export type SendChatMutationVariables = Exact<{
  conversationID: Scalars['Int']['input'];
  body: Scalars['String']['input'];
}>;


export type SendChatMutation = { __typename?: 'Mutation', sendMessage: boolean };

export type UpdateUserMutationVariables = Exact<{
  updatedUser: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: boolean };

export type UpdateUserLocationMutationVariables = Exact<{
  updatedLocation: UpdateLocation;
}>;


export type UpdateUserLocationMutation = { __typename?: 'Mutation', updateUserLocation: boolean };

export type DisconnectInstagramMutationVariables = Exact<{ [key: string]: never; }>;


export type DisconnectInstagramMutation = { __typename?: 'Mutation', disconnectInstagram: boolean };

export type ApplyNowMutationVariables = Exact<{
  postingID: Scalars['Float']['input'];
  email: Scalars['String']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
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

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type AddPortfolioMutationVariables = Exact<{
  portfolio: AddPortfolioArgs;
}>;


export type AddPortfolioMutation = { __typename?: 'Mutation', addPortfolio: boolean };

export type DeletePortfolioMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeletePortfolioMutation = { __typename?: 'Mutation', deletePortfolio: boolean };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, email?: string | null, username?: string | null, name?: string | null, photo?: string | null, isOnboarded?: boolean | null, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean } | null } | null };

export type GetDefaultOnboardingDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDefaultOnboardingDetailsQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: number, email?: string | null, name?: string | null, photo?: string | null, isOnboarded?: boolean | null, bio?: string | null, username?: string | null, instagramStats?: { __typename?: 'InstagramStats', username: string } | null, onboardingData?: { __typename?: 'OnboardingData', username?: string | null, name?: string | null, photo?: string | null, bio?: string | null, category?: string | null, city?: number | null, dob?: string | null, gender?: string | null, country?: number | null, state?: number | null, currency?: { __typename?: 'Currency', name?: string | null, symbol?: string | null } | null, pricing?: { __typename?: 'Pricing', starting?: number | null } | null } | null, pictureUploadURL: { __typename?: 'StorageFile', uploadURL: string, url: string } } | null };

export type GetFeaturedSellersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeaturedSellersQuery = { __typename?: 'Query', sellers: Array<{ __typename?: 'User', username?: string | null, name?: string | null, photo?: string | null, bio?: string | null, category?: string | null, instagramStats?: { __typename?: 'InstagramStats', username: string, followers: number, er: number, isVerified: boolean } | null }>, posts: Array<{ __typename?: 'GetFeaturedPostsResponse', mediaURL: string, thumbnailURL: string, creatorImage: string, creatorName: string, creatorUsername: string, creatorVerified: boolean, postURL: string, likes: number, er: number }>, postings: Array<{ __typename?: 'Posting', id: number, price?: number | null, currency?: string | null, title: string, open: boolean, minimumAge?: number | null, maximumAge?: number | null, barter: boolean, applicationsCount: number, minimumFollowers?: number | null, externalLink?: string | null, user?: { __typename?: 'User', photo?: string | null, name?: string | null, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean } | null } | null }> };

export type GetSellerQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetSellerQuery = { __typename?: 'Query', getSeller?: { __typename?: 'User', id: number, name?: string | null, photo?: string | null, bio?: string | null, gender?: string | null, category?: string | null, dob?: string | null, portfolio?: Array<{ __typename?: 'Portfolio', caption?: string | null, id: number, link?: string | null, imageURL: string }> | null, location?: { __typename?: 'Location', city?: string | null, country?: string | null, currency?: { __typename?: 'Currency', name?: string | null, symbol?: string | null, code?: string | null } | null } | null, pricing?: { __typename?: 'Pricing', starting?: number | null } | null, instagramMedia?: Array<{ __typename?: 'InstagramMedia', thumbnail: string, caption?: string | null, link: string, likes: number, comments: number, er?: number | null }> | null, instagramStats?: { __typename?: 'InstagramStats', followers: number, mediaCount: number, username: string, er: number, averageLikes: number, isVerified: boolean } | null } | null };

export type GetChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'Chat', preview: string, hasRead: boolean, id: number, with: { __typename?: 'User', id: number, name?: string | null, photo?: string | null } }> };

export type GetChatQueryVariables = Exact<{
  userID: Scalars['Int']['input'];
}>;


export type GetChatQuery = { __typename?: 'Query', chat?: { __typename?: 'Chat', hasRead: boolean, id: number, with: { __typename?: 'User', id: number, name?: string | null, photo?: string | null }, messages: Array<{ __typename?: 'Message', body: string, sentAt: any, sender: number }> } | null };

export type GetAccountDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountDetailsQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, name?: string | null, contactEmail?: string | null, bio?: string | null, photo?: string | null, phone?: string | null, category?: string | null, gender?: string | null, dob?: string | null, username?: string | null, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean } | null, locationID?: { __typename?: 'LocationID', city?: number | null, country?: number | null, state?: number | null } | null, pricing?: { __typename?: 'Pricing', starting?: number | null } | null, pictureUploadURL: { __typename?: 'StorageFile', uploadURL: string, url: string } } | null };

export type GetUserCurrencyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserCurrencyQuery = { __typename?: 'Query', user?: { __typename?: 'User', instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean } | null, locationID?: { __typename?: 'LocationID', country?: number | null } | null } | null };

export type GetCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCountriesQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'SelectOption', value: number, label: string }> };

export type GetStatesQueryVariables = Exact<{
  countryID: Scalars['Int']['input'];
}>;


export type GetStatesQuery = { __typename?: 'Query', states: Array<{ __typename?: 'SelectOption', value: number, label: string }> };

export type GetCitiesQueryVariables = Exact<{
  stateID: Scalars['Int']['input'];
}>;


export type GetCitiesQuery = { __typename?: 'Query', cities: Array<{ __typename?: 'SelectOption', value: number, label: string }> };

export type SearchSellersQueryVariables = Exact<{
  filters: SearchSellersFilters;
}>;


export type SearchSellersQuery = { __typename?: 'Query', sellers?: Array<{ __typename?: 'User', name?: string | null, username?: string | null, photo?: string | null, bio?: string | null }> | null };

export type IsUsernameAvailableQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type IsUsernameAvailableQuery = { __typename?: 'Query', isUsernameAvailable: boolean };

export type GetPostingQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetPostingQuery = { __typename?: 'Query', posting?: { __typename?: 'Posting', id: number, maximumAge?: number | null, platforms: Array<PostingPlatforms>, minimumFollowers?: number | null, currencyCountry?: number | null, extraDetails?: string | null, deliverables?: Array<string> | null, externalLink?: string | null, applicationsCount: number, description: string, barter: boolean, minimumAge?: number | null, open: boolean, title: string, currency?: string | null, price?: number | null, createdAt: number, updatedAt: number, user?: { __typename?: 'User', name?: string | null, photo?: string | null, id: number, username?: string | null, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean } | null } | null } | null };

export type GetAllPostingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostingsQuery = { __typename?: 'Query', postings: Array<{ __typename?: 'Posting', id: number, maximumAge?: number | null, minimumFollowers?: number | null, applicationsCount: number, description: string, barter: boolean, minimumAge?: number | null, open: boolean, title: string, currency?: string | null, price?: number | null, createdAt: number, platforms: Array<PostingPlatforms>, updatedAt: number, user?: { __typename?: 'User', name?: string | null, photo?: string | null, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean } | null } | null }> };

export type GetCurrentUserApplicationStatusQueryVariables = Exact<{
  postingID: Scalars['Float']['input'];
}>;


export type GetCurrentUserApplicationStatusQuery = { __typename?: 'Query', hasApplied: boolean, user?: { __typename?: 'User', id: number, email?: string | null, name?: string | null, isOnboarded?: boolean | null, contactEmail?: string | null, dob?: string | null, phone?: string | null, instagramStats?: { __typename?: 'InstagramStats', followers: number } | null } | null };

export type GetUserPostingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserPostingsQuery = { __typename?: 'Query', user?: { __typename?: 'User', instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean } | null } | null, postings: Array<{ __typename?: 'Posting', id: number, maximumAge?: number | null, referralEarnings: number, minimumFollowers?: number | null, applicationsCount: number, description: string, barter: boolean, minimumAge?: number | null, extraDetails?: string | null, open: boolean, title: string, currency?: string | null, price?: number | null, createdAt: number, platforms: Array<PostingPlatforms>, updatedAt: number, deliverables?: Array<string> | null, currencyCountry?: number | null }> };

export type GetPostingApplicationsQueryVariables = Exact<{
  postingID: Scalars['Int']['input'];
}>;


export type GetPostingApplicationsQuery = { __typename?: 'Query', posting?: { __typename?: 'Posting', title: string, extraDetails?: string | null, externalLink?: string | null } | null, applications: Array<{ __typename?: 'Application', email: string, referralEarnings: number, phone?: string | null, comment?: string | null, user?: { __typename?: 'User', name?: string | null, photo?: string | null, dob?: string | null, email?: string | null, gender?: string | null, bio?: string | null, username?: string | null, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean, username: string, followers: number, averageLikes: number, averageComments: number, er: number, mediaCount: number } | null } | null }> };

export type VerifyEmailQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyEmailQuery = { __typename?: 'Query', verifyEmail: boolean };

export type GetPortfolioUploadUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPortfolioUploadUrlQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number } | null, uploadURL?: { __typename?: 'StorageFile', uploadURL: string, url: string } | null };


export const UpdateOnboardingBasicDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOnboardingBasicDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"basicDetails"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OnboardingBasicDetailsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOnboardingBasicDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"basicDetails"},"value":{"kind":"Variable","name":{"kind":"Name","value":"basicDetails"}}}]}]}}]} as unknown as DocumentNode<UpdateOnboardingBasicDetailsMutation, UpdateOnboardingBasicDetailsMutationVariables>;
export const UpdateOnboardingDobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOnboardingDOB"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dobDetails"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OnboardingDOBInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOnboardingDOB"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dobDetails"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dobDetails"}}}]}]}}]} as unknown as DocumentNode<UpdateOnboardingDobMutation, UpdateOnboardingDobMutationVariables>;
export const UpdateOnboardingInstagramUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOnboardingInstagramUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOnboardingInstagramUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<UpdateOnboardingInstagramUsernameMutation, UpdateOnboardingInstagramUsernameMutationVariables>;
export const UpdateOnboardingUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOnboardingUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usernameDetails"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OnboardingUsernameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOnboardingUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"usernameDetails"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usernameDetails"}}}]}]}}]} as unknown as DocumentNode<UpdateOnboardingUsernameMutation, UpdateOnboardingUsernameMutationVariables>;
export const UpdateOnboardingLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOnboardingLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationDetails"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OnboardingLocationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOnboardingLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locationDetails"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationDetails"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}}]} as unknown as DocumentNode<UpdateOnboardingLocationMutation, UpdateOnboardingLocationMutationVariables>;
export const UpdateOnboardingPricingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOnboardingPricing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pricingDetails"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OnboardingPriceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOnboardingPricing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pricingDetails"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pricingDetails"}}}]}]}}]} as unknown as DocumentNode<UpdateOnboardingPricingMutation, UpdateOnboardingPricingMutationVariables>;
export const CompleteOnboardingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteOnboarding"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeOnboarding"}}]}}]} as unknown as DocumentNode<CompleteOnboardingMutation, CompleteOnboardingMutationVariables>;
export const ReadMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReadMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"readMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"conversationID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationID"}}}]}]}}]} as unknown as DocumentNode<ReadMessageMutation, ReadMessageMutationVariables>;
export const SendChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"conversationID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationID"}}},{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}}]}]}}]} as unknown as DocumentNode<SendChatMutation, SendChatMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatedUser"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatedUser"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatedUser"}}}]}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateUserLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatedLocation"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateLocation"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatedLocation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatedLocation"}}}]}]}}]} as unknown as DocumentNode<UpdateUserLocationMutation, UpdateUserLocationMutationVariables>;
export const DisconnectInstagramDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DisconnectInstagram"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disconnectInstagram"}}]}}]} as unknown as DocumentNode<DisconnectInstagramMutation, DisconnectInstagramMutationVariables>;
export const ApplyNowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApplyNow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"phone"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applyToPosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}},{"kind":"Argument","name":{"kind":"Name","value":"phone"},"value":{"kind":"Variable","name":{"kind":"Name","value":"phone"}}}]}]}}]} as unknown as DocumentNode<ApplyNowMutation, ApplyNowMutationVariables>;
export const DeletePostingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePosting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}}]}]}}]} as unknown as DocumentNode<DeletePostingMutation, DeletePostingMutationVariables>;
export const PausePostingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PausePosting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pausePosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}}]}]}}]} as unknown as DocumentNode<PausePostingMutation, PausePostingMutationVariables>;
export const ResumePostingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResumePosting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resumePosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}}]}]}}]} as unknown as DocumentNode<ResumePostingMutation, ResumePostingMutationVariables>;
export const CreatePostingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePosting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPosting"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewPostingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPosting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPosting"}}}]}]}}]} as unknown as DocumentNode<CreatePostingMutation, CreatePostingMutationVariables>;
export const UpdatePostingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePosting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPosting"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePostingInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"updatedPosting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPosting"}}}]}]}}]} as unknown as DocumentNode<UpdatePostingMutation, UpdatePostingMutationVariables>;
export const SendResetPasswordEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendResetPasswordEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendResetPasswordEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<SendResetPasswordEmailMutation, SendResetPasswordEmailMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const AddPortfolioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPortfolio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"portfolio"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddPortfolioArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPortfolio"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"portfolio"}}}]}]}}]} as unknown as DocumentNode<AddPortfolioMutation, AddPortfolioMutationVariables>;
export const DeletePortfolioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePortfolio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePortfolio"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeletePortfolioMutation, DeletePortfolioMutationVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"isOnboarded"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetDefaultOnboardingDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDefaultOnboardingDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"isOnboarded"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"onboardingData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"currency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starting"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pictureUploadURL"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadURL"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetDefaultOnboardingDetailsQuery, GetDefaultOnboardingDetailsQueryVariables>;
export const GetFeaturedSellersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFeaturedSellers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"sellers"},"name":{"kind":"Name","value":"getFeaturedSellers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"followers"}},{"kind":"Field","name":{"kind":"Name","value":"er"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"posts"},"name":{"kind":"Name","value":"getFeaturedPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mediaURL"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailURL"}},{"kind":"Field","name":{"kind":"Name","value":"creatorImage"}},{"kind":"Field","name":{"kind":"Name","value":"creatorName"}},{"kind":"Field","name":{"kind":"Name","value":"creatorUsername"}},{"kind":"Field","name":{"kind":"Name","value":"creatorVerified"}},{"kind":"Field","name":{"kind":"Name","value":"postURL"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"er"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"postings"},"name":{"kind":"Name","value":"getFeaturedPostings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"minimumAge"}},{"kind":"Field","name":{"kind":"Name","value":"maximumAge"}},{"kind":"Field","name":{"kind":"Name","value":"barter"}},{"kind":"Field","name":{"kind":"Name","value":"applicationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"minimumFollowers"}},{"kind":"Field","name":{"kind":"Name","value":"externalLink"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetFeaturedSellersQuery, GetFeaturedSellersQueryVariables>;
export const GetSellerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSeller"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSeller"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"portfolio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"currency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starting"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instagramMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"er"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followers"}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"er"}},{"kind":"Field","name":{"kind":"Name","value":"averageLikes"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}}]}}]} as unknown as DocumentNode<GetSellerQuery, GetSellerQueryVariables>;
export const GetChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"chats"},"name":{"kind":"Name","value":"getChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"conversation"}},{"kind":"Field","name":{"kind":"Name","value":"with"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasRead"}}]}}]}}]} as unknown as DocumentNode<GetChatsQuery, GetChatsQueryVariables>;
export const GetChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"chat"},"name":{"kind":"Name","value":"getChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"with"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"id"},"name":{"kind":"Name","value":"conversation"}},{"kind":"Field","name":{"kind":"Name","value":"hasRead"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"sentAt"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}}]}}]}}]}}]} as unknown as DocumentNode<GetChatQuery, GetChatQueryVariables>;
export const GetAccountDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccountDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"locationID"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starting"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pictureUploadURL"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadURL"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetAccountDetailsQuery, GetAccountDetailsQueryVariables>;
export const GetUserCurrencyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserCurrency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"locationID"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserCurrencyQuery, GetUserCurrencyQueryVariables>;
export const GetCountriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCountries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"countries"},"name":{"kind":"Name","value":"getCountries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<GetCountriesQuery, GetCountriesQueryVariables>;
export const GetStatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"countryID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"states"},"name":{"kind":"Name","value":"getStates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"countryID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"countryID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<GetStatesQuery, GetStatesQueryVariables>;
export const GetCitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stateID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"cities"},"name":{"kind":"Name","value":"getCities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stateID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stateID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<GetCitiesQuery, GetCitiesQueryVariables>;
export const SearchSellersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchSellers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchSellersFilters"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"sellers"},"name":{"kind":"Name","value":"searchSellers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}}]}}]}}]} as unknown as DocumentNode<SearchSellersQuery, SearchSellersQueryVariables>;
export const IsUsernameAvailableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsUsernameAvailable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isUsernameAvailable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<IsUsernameAvailableQuery, IsUsernameAvailableQueryVariables>;
export const GetPostingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPosting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"posting"},"name":{"kind":"Name","value":"getPosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maximumAge"}},{"kind":"Field","name":{"kind":"Name","value":"platforms"}},{"kind":"Field","name":{"kind":"Name","value":"minimumFollowers"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCountry"}},{"kind":"Field","name":{"kind":"Name","value":"extraDetails"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deliverables"}},{"kind":"Field","name":{"kind":"Name","value":"externalLink"}},{"kind":"Field","name":{"kind":"Name","value":"applicationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"barter"}},{"kind":"Field","name":{"kind":"Name","value":"minimumAge"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetPostingQuery, GetPostingQueryVariables>;
export const GetAllPostingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllPostings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"postings"},"name":{"kind":"Name","value":"getAllPostings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maximumAge"}},{"kind":"Field","name":{"kind":"Name","value":"minimumFollowers"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"applicationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"barter"}},{"kind":"Field","name":{"kind":"Name","value":"minimumAge"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"platforms"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllPostingsQuery, GetAllPostingsQueryVariables>;
export const GetCurrentUserApplicationStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUserApplicationStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isOnboarded"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"hasApplied"},"name":{"kind":"Name","value":"getHasUserApplied"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}}]}]}}]} as unknown as DocumentNode<GetCurrentUserApplicationStatusQuery, GetCurrentUserApplicationStatusQueryVariables>;
export const GetUserPostingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserPostings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"postings"},"name":{"kind":"Name","value":"getUserPostings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maximumAge"}},{"kind":"Field","name":{"kind":"Name","value":"referralEarnings"}},{"kind":"Field","name":{"kind":"Name","value":"minimumFollowers"}},{"kind":"Field","name":{"kind":"Name","value":"applicationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"barter"}},{"kind":"Field","name":{"kind":"Name","value":"minimumAge"}},{"kind":"Field","name":{"kind":"Name","value":"extraDetails"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"platforms"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deliverables"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCountry"}}]}}]}}]} as unknown as DocumentNode<GetUserPostingsQuery, GetUserPostingsQueryVariables>;
export const GetPostingApplicationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostingApplications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"posting"},"name":{"kind":"Name","value":"getPosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"extraDetails"}},{"kind":"Field","name":{"kind":"Name","value":"externalLink"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"applications"},"name":{"kind":"Name","value":"getPostingApplications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"referralEarnings"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"followers"}},{"kind":"Field","name":{"kind":"Name","value":"averageLikes"}},{"kind":"Field","name":{"kind":"Name","value":"averageComments"}},{"kind":"Field","name":{"kind":"Name","value":"er"}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]} as unknown as DocumentNode<GetPostingApplicationsQuery, GetPostingApplicationsQueryVariables>;
export const VerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifyEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}]}]}}]} as unknown as DocumentNode<VerifyEmailQuery, VerifyEmailQueryVariables>;
export const GetPortfolioUploadUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPortfolioUploadURL"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"uploadURL"},"name":{"kind":"Name","value":"getPortfolioUploadURL"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadURL"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<GetPortfolioUploadUrlQuery, GetPortfolioUploadUrlQueryVariables>;