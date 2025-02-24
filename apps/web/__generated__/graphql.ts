/* eslint-disable */
import {TypedDocumentNode as DocumentNode} from '@graphql-typed-document-node/core';

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
  agency?: InputMaybe<Scalars['Float']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  imageURL: Scalars['String']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
};

export type AddPortfolioLinkArgs = {
  agency?: InputMaybe<Scalars['Float']['input']>;
  caption: Scalars['String']['input'];
  link: Scalars['String']['input'];
};

export type Agency = {
  __typename?: 'Agency';
  bio: Scalars['String']['output'];
  category: AgencyCategory;
  id: Scalars['Float']['output'];
  instagramMedia?: Maybe<Array<InstagramMedia>>;
  instagramStats?: Maybe<InstagramStats>;
  location?: Maybe<Location>;
  locationID?: Maybe<LocationId>;
  name: Scalars['String']['output'];
  photo: Scalars['String']['output'];
  portfolio: Array<Portfolio>;
  recentPostings: Array<Posting>;
  reviews: Array<Review>;
  username: Scalars['String']['output'];
};

export type AgencyBasicDetailsInput = {
  bio: Scalars['String']['input'];
  category: AgencyCategory;
  contactEmail: Scalars['String']['input'];
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  photo: Scalars['String']['input'];
};

export enum AgencyCategory {
  Agency = 'Agency',
  Brand = 'Brand'
}

export type AgencyLocationInput = {
  city?: InputMaybe<Scalars['Float']['input']>;
  country: Scalars['Float']['input'];
  state: Scalars['Float']['input'];
};

export type AgencyMember = {
  __typename?: 'AgencyMember';
  agency: Scalars['Int']['output'];
  agencyDetails: Agency;
  type: AgencyMemberType;
};

export enum AgencyMemberType {
  Admin = 'Admin',
  Owner = 'Owner'
}

export type AgencyOnboarding = {
  __typename?: 'AgencyOnboarding';
  bio: Scalars['String']['output'];
  category?: Maybe<AgencyCategory>;
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  photo?: Maybe<Scalars['String']['output']>;
  pictureUploadURL: StorageFile;
  username?: Maybe<Scalars['String']['output']>;
};

export type AgencyUsernameInput = {
  username: Scalars['String']['input'];
};

export type Application = {
  __typename?: 'Application';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Float']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  posting?: Maybe<Posting>;
  referralEarnings: Scalars['Float']['output'];
  status: ApplicationStatus;
  user?: Maybe<User>;
};

export enum ApplicationStatus {
  Applied = 'Applied',
  Completed = 'Completed',
  Interested = 'Interested',
  Rejected = 'Rejected'
}

export type Conversation = {
  __typename?: 'Conversation';
  agency?: Maybe<Agency>;
  hasRead: Scalars['Boolean']['output'];
  id: Scalars['Float']['output'];
  messages: Array<Message>;
  preview?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};


export type ConversationMessagesArgs = {
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
  byAgency: Scalars['Boolean']['output'];
  createdAt: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptPortfolio: Scalars['Boolean']['output'];
  addAgencyBasicDetails: Scalars['Boolean']['output'];
  addAgencyInstagramUsername: Scalars['Boolean']['output'];
  addAgencyLocation: Scalars['String']['output'];
  addAgencyUsername: Scalars['Boolean']['output'];
  addPortfolio: Scalars['Boolean']['output'];
  addPortfolioLink: Scalars['Boolean']['output'];
  applyToPosting: Scalars['Boolean']['output'];
  completeOnboarding: Scalars['Boolean']['output'];
  createPosting?: Maybe<Scalars['Float']['output']>;
  deletePortfolio: Scalars['Boolean']['output'];
  deletePosting: Scalars['Boolean']['output'];
  disconnectInstagram: Scalars['Boolean']['output'];
  likeApplication: Scalars['Boolean']['output'];
  pausePosting: Scalars['Boolean']['output'];
  readMessage: Scalars['Boolean']['output'];
  rejectApplication: Scalars['Boolean']['output'];
  rejectPortfolio: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  resumePosting: Scalars['Boolean']['output'];
  sendMessage: Scalars['Boolean']['output'];
  sendMessageToUser: Scalars['Boolean']['output'];
  sendResetPasswordEmail?: Maybe<Scalars['Boolean']['output']>;
  sendReviewByAgency: Scalars['Boolean']['output'];
  sendReviewByUser: Scalars['Boolean']['output'];
  sendVerificationEmail: Scalars['Boolean']['output'];
  updateAgency: Scalars['Boolean']['output'];
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


export type MutationAcceptPortfolioArgs = {
  review: Scalars['Float']['input'];
};


export type MutationAddAgencyBasicDetailsArgs = {
  agency: AgencyBasicDetailsInput;
};


export type MutationAddAgencyInstagramUsernameArgs = {
  username: Scalars['String']['input'];
};


export type MutationAddAgencyLocationArgs = {
  data: AgencyLocationInput;
};


export type MutationAddAgencyUsernameArgs = {
  data: AgencyUsernameInput;
};


export type MutationAddPortfolioArgs = {
  data: AddPortfolioArgs;
};


export type MutationAddPortfolioLinkArgs = {
  data: AddPortfolioLinkArgs;
};


export type MutationApplyToPostingArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  postingID: Scalars['Float']['input'];
};


export type MutationCreatePostingArgs = {
  agency: Scalars['Float']['input'];
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


export type MutationRejectPortfolioArgs = {
  review: Scalars['Float']['input'];
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


export type MutationSendMessageToUserArgs = {
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


export type MutationUpdateAgencyArgs = {
  data: UpdateAgencyInput;
  id: Scalars['Float']['input'];
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

export type PaginationArgs = {
  page?: Scalars['Float']['input'];
  pageSize?: Scalars['Float']['input'];
};

export type Portfolio = {
  __typename?: 'Portfolio';
  caption?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  review?: Maybe<Review>;
};

export type Posting = {
  __typename?: 'Posting';
  agency: Agency;
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
  getChat?: Maybe<Conversation>;
  getChatWithAgency?: Maybe<Conversation>;
  getChatWithUser?: Maybe<Conversation>;
  getChats: Array<Conversation>;
  getCities: Array<SelectOption>;
  getCountries: Array<SelectOption>;
  getCurrentUser?: Maybe<User>;
  getFeaturedAgencies: Array<Agency>;
  getFeaturedPostings: Array<Posting>;
  getFeaturedPosts: Array<GetFeaturedPostsResponse>;
  getFeaturedSellers: Array<User>;
  getHasUserApplied: Scalars['Boolean']['output'];
  getPendingPortfolios: Array<Review>;
  getPendingReviews: Array<Scalars['Float']['output']>;
  getPortfolioUploadURL?: Maybe<StorageFile>;
  getPosting?: Maybe<Posting>;
  getPostingApplications: Array<Application>;
  getSeller?: Maybe<Seller>;
  getStates: Array<SelectOption>;
  getUserApplications: Array<Application>;
  getUserPostings: Array<Posting>;
  isUsernameAvailable: Scalars['Boolean']['output'];
  searchSellers?: Maybe<Array<User>>;
  verifyEmail: Scalars['Boolean']['output'];
};


export type QueryGetAllPostingsArgs = {
  filters?: InputMaybe<SearchPostingsFilters>;
  pagination: PaginationArgs;
};


export type QueryGetChatArgs = {
  conversationID: Scalars['Int']['input'];
};


export type QueryGetChatWithAgencyArgs = {
  username: Scalars['String']['input'];
};


export type QueryGetChatWithUserArgs = {
  username: Scalars['String']['input'];
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

export type Review = {
  __typename?: 'Review';
  feedback?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  photo?: Maybe<Scalars['String']['output']>;
  portfolio?: Maybe<Portfolio>;
  rating: Scalars['Float']['output'];
  username: Scalars['String']['output'];
};

export enum SearchFilterSorting {
  FollowersAsc = 'FollowersAsc',
  FollowersDesc = 'FollowersDesc',
  PriceAsc = 'PriceAsc',
  PriceDesc = 'PriceDesc'
}

export type SearchPostingsFilters = {
  age?: InputMaybe<Scalars['Float']['input']>;
  followers?: InputMaybe<Scalars['Float']['input']>;
  paidOnly?: InputMaybe<Scalars['Boolean']['input']>;
  platforms?: InputMaybe<Array<PostingPlatforms>>;
  query?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<SearchPostingsSorting>;
};

export enum SearchPostingsSorting {
  PriceDesc = 'PriceDesc',
  Trending = 'Trending'
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
  sortBy?: InputMaybe<SearchFilterSorting>;
  states?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type SelectOption = {
  __typename?: 'SelectOption';
  label: Scalars['String']['output'];
  value: Scalars['Int']['output'];
};

export type Seller = {
  __typename?: 'Seller';
  agency?: Maybe<Agency>;
  user?: Maybe<User>;
};

export type SendReviewByAgencyArgs = {
  application: Scalars['Float']['input'];
  userFeedback?: InputMaybe<Scalars['String']['input']>;
  userRating: Scalars['Float']['input'];
};

export type SendReviewByUserArgs = {
  agencyFeedback?: InputMaybe<Scalars['String']['input']>;
  agencyRating: Scalars['Float']['input'];
  portfolio?: InputMaybe<Scalars['Float']['input']>;
  posting: Scalars['Float']['input'];
};

export type StorageFile = {
  __typename?: 'StorageFile';
  uploadURL: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type UpdateAgencyInput = {
  city?: InputMaybe<Scalars['Float']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  photo?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['Float']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
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
  agencies: Array<AgencyMember>;
  bio?: Maybe<Scalars['String']['output']>;
  category?: Maybe<Scalars['String']['output']>;
  contactEmail?: Maybe<Scalars['String']['output']>;
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
  onboardingAgency?: Maybe<AgencyOnboarding>;
  onboardingData?: Maybe<OnboardingData>;
  phone?: Maybe<Scalars['String']['output']>;
  photo?: Maybe<Scalars['String']['output']>;
  pictureUploadURL: StorageFile;
  portfolio: Array<Portfolio>;
  pricing?: Maybe<Pricing>;
  reviews: Array<Review>;
  roles?: Maybe<Array<Roles>>;
  username?: Maybe<Scalars['String']['output']>;
};

export type UpdateOnboardingBasicDetailsMutationVariables = Exact<{
  basicDetails: OnboardingBasicDetailsInput;
}>;


export type UpdateOnboardingBasicDetailsMutation = { __typename?: 'Mutation', updateOnboardingBasicDetails: boolean };

export type UpdateAgencyOnboardingBasicDetailsMutationVariables = Exact<{
  basicDetails: AgencyBasicDetailsInput;
}>;


export type UpdateAgencyOnboardingBasicDetailsMutation = { __typename?: 'Mutation', addAgencyBasicDetails: boolean };

export type UpdateOnboardingDobMutationVariables = Exact<{
  dobDetails: OnboardingDobInput;
}>;


export type UpdateOnboardingDobMutation = { __typename?: 'Mutation', updateOnboardingDOB: boolean };

export type UpdateOnboardingInstagramUsernameMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UpdateOnboardingInstagramUsernameMutation = { __typename?: 'Mutation', updateOnboardingInstagramUsername: boolean };

export type UpdateAgencyOnboardingInstagramUsernameMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UpdateAgencyOnboardingInstagramUsernameMutation = { __typename?: 'Mutation', addAgencyInstagramUsername: boolean };

export type UpdateOnboardingUsernameMutationVariables = Exact<{
  usernameDetails: OnboardingUsernameInput;
}>;


export type UpdateOnboardingUsernameMutation = { __typename?: 'Mutation', updateOnboardingUsername: boolean };

export type UpdateAgencyOnboardingUsernameMutationVariables = Exact<{
  usernameDetails: AgencyUsernameInput;
}>;


export type UpdateAgencyOnboardingUsernameMutation = { __typename?: 'Mutation', addAgencyUsername: boolean };

export type UpdateOnboardingLocationMutationVariables = Exact<{
  locationDetails: OnboardingLocationInput;
}>;


export type UpdateOnboardingLocationMutation = { __typename?: 'Mutation', updateOnboardingLocation: { __typename?: 'Currency', name?: string | null, symbol?: string | null } };

export type UpdateAgencyOnboardingLocationMutationVariables = Exact<{
  locationDetails: AgencyLocationInput;
}>;


export type UpdateAgencyOnboardingLocationMutation = { __typename?: 'Mutation', addAgencyLocation: string };

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
  agency: Scalars['Float']['input'];
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


export type AddPortfolioMutation = { __typename?: 'Mutation', addPortfolio: boolean };

export type AddPortfolioLinkMutationVariables = Exact<{
  portfolio: AddPortfolioLinkArgs;
}>;


export type AddPortfolioLinkMutation = { __typename?: 'Mutation', addPortfolioLink: boolean };

export type DeletePortfolioMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type DeletePortfolioMutation = { __typename?: 'Mutation', deletePortfolio: boolean };

export type LikeApplicationMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type LikeApplicationMutation = { __typename?: 'Mutation', likeApplication: boolean };

export type RejectApplicationMutationVariables = Exact<{
  id: Scalars['Float']['input'];
}>;


export type RejectApplicationMutation = { __typename?: 'Mutation', rejectApplication: boolean };

export type SendReviewByAgencyMutationVariables = Exact<{
  args: SendReviewByAgencyArgs;
}>;


export type SendReviewByAgencyMutation = { __typename?: 'Mutation', sendReviewByAgency: boolean };

export type SendReviewByUserMutationVariables = Exact<{
  args: SendReviewByUserArgs;
}>;


export type SendReviewByUserMutation = { __typename?: 'Mutation', sendReviewByUser: boolean };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, email?: string | null, username?: string | null, name?: string | null, photo?: string | null, emailVerified: boolean, isOnboarded?: boolean | null, agencies: Array<{ __typename?: 'AgencyMember', agency: number, type: AgencyMemberType }>, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean } | null } | null };

export type GetDefaultOnboardingDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDefaultOnboardingDetailsQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: number, email?: string | null, name?: string | null, photo?: string | null, isOnboarded?: boolean | null, bio?: string | null, username?: string | null, instagramStats?: { __typename?: 'InstagramStats', username: string } | null, onboardingData?: { __typename?: 'OnboardingData', username?: string | null, name?: string | null, photo?: string | null, bio?: string | null, category?: string | null, city?: number | null, dob?: string | null, gender?: string | null, country?: number | null, state?: number | null, currency?: { __typename?: 'Currency', name?: string | null, symbol?: string | null } | null, pricing?: { __typename?: 'Pricing', starting?: number | null } | null } | null, pictureUploadURL: { __typename?: 'StorageFile', uploadURL: string, url: string } } | null };

export type GetDefaultAgencyOnboardingDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDefaultAgencyOnboardingDetailsQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: number, agencies: Array<{ __typename?: 'AgencyMember', type: AgencyMemberType }>, onboardingAgency?: { __typename?: 'AgencyOnboarding', category?: AgencyCategory | null, username?: string | null, name: string, photo?: string | null, contactEmail?: string | null, bio: string, contactPhone?: string | null, pictureUploadURL: { __typename?: 'StorageFile', uploadURL: string, url: string } } | null } | null };

export type GetFeaturedSellersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFeaturedSellersQuery = { __typename?: 'Query', sellers: Array<{ __typename?: 'User', username?: string | null, name?: string | null, photo?: string | null, bio?: string | null, category?: string | null, instagramStats?: { __typename?: 'InstagramStats', username: string, followers: number, er: number, isVerified: boolean } | null }>, posts: Array<{ __typename?: 'GetFeaturedPostsResponse', mediaURL: string, thumbnailURL: string, creatorImage: string, creatorName: string, creatorUsername: string, creatorVerified: boolean, postURL: string, likes: number, er: number }>, postings: Array<{ __typename?: 'Posting', id: number, price?: number | null, currency?: string | null, title: string, open: boolean, minimumAge?: number | null, maximumAge?: number | null, barter: boolean, applicationsCount: number, minimumFollowers?: number | null, externalLink?: string | null, agency: { __typename?: 'Agency', photo: string, name: string, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean } | null } }>, agencies: Array<{ __typename?: 'Agency', name: string, username: string, photo: string, category: AgencyCategory, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean } | null }> };

export type GetSellerQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type GetSellerQuery = { __typename?: 'Query', getSeller?: { __typename?: 'Seller', user?: { __typename?: 'User', id: number, name?: string | null, photo?: string | null, bio?: string | null, gender?: string | null, category?: string | null, dob?: string | null, reviews: Array<{ __typename?: 'Review', feedback?: string | null, rating: number, name: string, photo?: string | null, username: string }>, portfolio: Array<{ __typename?: 'Portfolio', caption?: string | null, id: number, link?: string | null, imageURL?: string | null }>, location?: { __typename?: 'Location', city?: string | null, country?: string | null, currency?: { __typename?: 'Currency', name?: string | null, symbol?: string | null, code?: string | null } | null } | null, pricing?: { __typename?: 'Pricing', starting?: number | null } | null, instagramMedia?: Array<{ __typename?: 'InstagramMedia', thumbnail: string, caption?: string | null, link: string, likes: number, comments: number, er?: number | null, timestamp: string }> | null, instagramStats?: { __typename?: 'InstagramStats', followers: number, mediaCount: number, username: string, er: number, averageLikes: number, isVerified: boolean } | null } | null, agency?: { __typename?: 'Agency', id: number, photo: string, name: string, bio: string, category: AgencyCategory, reviews: Array<{ __typename?: 'Review', feedback?: string | null, rating: number, name: string, photo?: string | null, username: string }>, recentPostings: Array<{ __typename?: 'Posting', id: number, title: string, open: boolean, price?: number | null, barter: boolean, currency?: string | null, applicationsCount: number, minimumAge?: number | null, maximumAge?: number | null, minimumFollowers?: number | null }>, location?: { __typename?: 'Location', city?: string | null, country?: string | null } | null, portfolio: Array<{ __typename?: 'Portfolio', caption?: string | null, id: number, link?: string | null, imageURL?: string | null }>, instagramMedia?: Array<{ __typename?: 'InstagramMedia', thumbnail: string, caption?: string | null, link: string, likes: number, timestamp: string, comments: number, er?: number | null }> | null, instagramStats?: { __typename?: 'InstagramStats', followers: number, mediaCount: number, username: string, er: number, averageLikes: number, isVerified: boolean } | null } | null } | null };

export type GetChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatsQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'Conversation', preview?: string | null, id: number, hasRead: boolean, user?: { __typename?: 'User', id: number, name?: string | null, photo?: string | null } | null, agency?: { __typename?: 'Agency', id: number, name: string, photo: string } | null }> };

export type GetChatQueryVariables = Exact<{
  conversationID: Scalars['Int']['input'];
}>;


export type GetChatQuery = { __typename?: 'Query', chat?: { __typename?: 'Conversation', id: number, preview?: string | null, hasRead: boolean, user?: { __typename?: 'User', id: number, name?: string | null, photo?: string | null } | null, agency?: { __typename?: 'Agency', id: number, name: string, photo: string } | null, messages: Array<{ __typename?: 'Message', body: string, createdAt: number, byAgency: boolean }> } | null };

export type GetAccountDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountDetailsQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, name?: string | null, contactEmail?: string | null, bio?: string | null, photo?: string | null, phone?: string | null, category?: string | null, gender?: string | null, dob?: string | null, username?: string | null, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean } | null, locationID?: { __typename?: 'LocationID', city?: number | null, country?: number | null, state?: number | null } | null, pricing?: { __typename?: 'Pricing', starting?: number | null } | null, pictureUploadURL: { __typename?: 'StorageFile', uploadURL: string, url: string } } | null };

export type GetUserCurrencyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserCurrencyQuery = { __typename?: 'Query', user?: { __typename?: 'User', agencies: Array<{ __typename?: 'AgencyMember', agencyDetails: { __typename?: 'Agency', name: string, id: number, locationID?: { __typename?: 'LocationID', country?: number | null } | null } }> } | null };

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


export type SearchSellersQuery = { __typename?: 'Query', sellers?: Array<{ __typename?: 'User', name?: string | null, username?: string | null, photo?: string | null, bio?: string | null, category?: string | null, gender?: string | null, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean, followers: number } | null, pricing?: { __typename?: 'Pricing', starting?: number | null } | null, location?: { __typename?: 'Location', city?: string | null, country?: string | null, currency?: { __typename?: 'Currency', symbol?: string | null, code?: string | null } | null } | null }> | null };

export type IsUsernameAvailableQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type IsUsernameAvailableQuery = { __typename?: 'Query', isUsernameAvailable: boolean };

export type GetPostingQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetPostingQuery = { __typename?: 'Query', user?: { __typename?: 'User', agencies: Array<{ __typename?: 'AgencyMember', agencyDetails: { __typename?: 'Agency', id: number } }> } | null, posting?: { __typename?: 'Posting', id: number, maximumAge?: number | null, platforms: Array<PostingPlatforms>, minimumFollowers?: number | null, currencyCountry?: number | null, extraDetails?: string | null, deliverables?: Array<string> | null, externalLink?: string | null, applicationsCount: number, description: string, barter: boolean, minimumAge?: number | null, open: boolean, title: string, currency?: string | null, price?: number | null, createdAt: number, updatedAt: number, agency: { __typename?: 'Agency', id: number, name: string, photo: string, username: string, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean } | null } } | null };

export type GetAllPostingsQueryVariables = Exact<{
  filters: SearchPostingsFilters;
}>;


export type GetAllPostingsQuery = { __typename?: 'Query', postings: Array<{ __typename?: 'Posting', id: number, maximumAge?: number | null, minimumFollowers?: number | null, applicationsCount: number, description: string, barter: boolean, minimumAge?: number | null, open: boolean, title: string, currency?: string | null, price?: number | null, createdAt: number, platforms: Array<PostingPlatforms>, updatedAt: number, agency: { __typename?: 'Agency', name: string, photo: string, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean } | null } }> };

export type GetCurrentUserApplicationStatusQueryVariables = Exact<{
  postingID: Scalars['Float']['input'];
}>;


export type GetCurrentUserApplicationStatusQuery = { __typename?: 'Query', hasApplied: boolean, user?: { __typename?: 'User', id: number, email?: string | null, name?: string | null, isOnboarded?: boolean | null, contactEmail?: string | null, dob?: string | null, phone?: string | null, instagramStats?: { __typename?: 'InstagramStats', followers: number } | null, agencies: Array<{ __typename?: 'AgencyMember', type: AgencyMemberType, agency: number }> } | null };

export type GetUserPostingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserPostingsQuery = { __typename?: 'Query', user?: { __typename?: 'User', agencies: Array<{ __typename?: 'AgencyMember', agency: number }>, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean } | null } | null, postings: Array<{ __typename?: 'Posting', id: number, maximumAge?: number | null, referralEarnings: number, minimumFollowers?: number | null, applicationsCount: number, description: string, barter: boolean, minimumAge?: number | null, extraDetails?: string | null, open: boolean, title: string, currency?: string | null, price?: number | null, createdAt: number, platforms: Array<PostingPlatforms>, updatedAt: number, deliverables?: Array<string> | null, currencyCountry?: number | null }> };

export type GetPostingApplicationsQueryVariables = Exact<{
  postingID: Scalars['Int']['input'];
}>;


export type GetPostingApplicationsQuery = { __typename?: 'Query', posting?: { __typename?: 'Posting', title: string, extraDetails?: string | null, externalLink?: string | null } | null, applications: Array<{ __typename?: 'Application', email: string, referralEarnings: number, phone?: string | null, status: ApplicationStatus, createdAt: number, id: number, comment?: string | null, user?: { __typename?: 'User', name?: string | null, photo?: string | null, dob?: string | null, email?: string | null, gender?: string | null, bio?: string | null, username?: string | null, instagramStats?: { __typename?: 'InstagramStats', isVerified: boolean, username: string, followers: number, averageLikes: number, averageComments: number, er: number, mediaCount: number } | null } | null }> };

export type VerifyEmailQueryVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyEmailQuery = { __typename?: 'Query', verifyEmail: boolean };

export type GetPortfolioUploadUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPortfolioUploadUrlQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, agencies: Array<{ __typename?: 'AgencyMember', agency: number }> } | null, uploadURL?: { __typename?: 'StorageFile', uploadURL: string, url: string } | null };

export type GetUserApplicationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserApplicationsQuery = { __typename?: 'Query', getPendingReviews: Array<number>, getUserApplications: Array<{ __typename?: 'Application', status: ApplicationStatus, comment?: string | null, email: string, phone?: string | null, createdAt: number, posting?: { __typename?: 'Posting', title: string, id: number, agency: { __typename?: 'Agency', name: string, username: string, photo: string } } | null }> };


export const UpdateOnboardingBasicDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOnboardingBasicDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"basicDetails"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OnboardingBasicDetailsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOnboardingBasicDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"basicDetails"},"value":{"kind":"Variable","name":{"kind":"Name","value":"basicDetails"}}}]}]}}]} as unknown as DocumentNode<UpdateOnboardingBasicDetailsMutation, UpdateOnboardingBasicDetailsMutationVariables>;
export const UpdateAgencyOnboardingBasicDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAgencyOnboardingBasicDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"basicDetails"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AgencyBasicDetailsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAgencyBasicDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"basicDetails"}}}]}]}}]} as unknown as DocumentNode<UpdateAgencyOnboardingBasicDetailsMutation, UpdateAgencyOnboardingBasicDetailsMutationVariables>;
export const UpdateOnboardingDobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOnboardingDOB"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dobDetails"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OnboardingDOBInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOnboardingDOB"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dobDetails"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dobDetails"}}}]}]}}]} as unknown as DocumentNode<UpdateOnboardingDobMutation, UpdateOnboardingDobMutationVariables>;
export const UpdateOnboardingInstagramUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOnboardingInstagramUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOnboardingInstagramUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<UpdateOnboardingInstagramUsernameMutation, UpdateOnboardingInstagramUsernameMutationVariables>;
export const UpdateAgencyOnboardingInstagramUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAgencyOnboardingInstagramUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAgencyInstagramUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<UpdateAgencyOnboardingInstagramUsernameMutation, UpdateAgencyOnboardingInstagramUsernameMutationVariables>;
export const UpdateOnboardingUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOnboardingUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usernameDetails"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OnboardingUsernameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOnboardingUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"usernameDetails"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usernameDetails"}}}]}]}}]} as unknown as DocumentNode<UpdateOnboardingUsernameMutation, UpdateOnboardingUsernameMutationVariables>;
export const UpdateAgencyOnboardingUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAgencyOnboardingUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usernameDetails"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AgencyUsernameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAgencyUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usernameDetails"}}}]}]}}]} as unknown as DocumentNode<UpdateAgencyOnboardingUsernameMutation, UpdateAgencyOnboardingUsernameMutationVariables>;
export const UpdateOnboardingLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOnboardingLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationDetails"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OnboardingLocationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOnboardingLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"locationDetails"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationDetails"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}}]} as unknown as DocumentNode<UpdateOnboardingLocationMutation, UpdateOnboardingLocationMutationVariables>;
export const UpdateAgencyOnboardingLocationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAgencyOnboardingLocation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locationDetails"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AgencyLocationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAgencyLocation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locationDetails"}}}]}]}}]} as unknown as DocumentNode<UpdateAgencyOnboardingLocationMutation, UpdateAgencyOnboardingLocationMutationVariables>;
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
export const CreatePostingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePosting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agency"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPosting"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NewPostingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPosting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPosting"}}},{"kind":"Argument","name":{"kind":"Name","value":"agency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agency"}}}]}]}}]} as unknown as DocumentNode<CreatePostingMutation, CreatePostingMutationVariables>;
export const UpdatePostingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePosting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPosting"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePostingInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"updatedPosting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPosting"}}}]}]}}]} as unknown as DocumentNode<UpdatePostingMutation, UpdatePostingMutationVariables>;
export const SendResetPasswordEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendResetPasswordEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendResetPasswordEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<SendResetPasswordEmailMutation, SendResetPasswordEmailMutationVariables>;
export const SendVerificationEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendVerificationEmail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendVerificationEmail"}}]}}]} as unknown as DocumentNode<SendVerificationEmailMutation, SendVerificationEmailMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const AddPortfolioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPortfolio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"portfolio"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddPortfolioArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPortfolio"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"portfolio"}}}]}]}}]} as unknown as DocumentNode<AddPortfolioMutation, AddPortfolioMutationVariables>;
export const AddPortfolioLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPortfolioLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"portfolio"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddPortfolioLinkArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPortfolioLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"portfolio"}}}]}]}}]} as unknown as DocumentNode<AddPortfolioLinkMutation, AddPortfolioLinkMutationVariables>;
export const DeletePortfolioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePortfolio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePortfolio"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeletePortfolioMutation, DeletePortfolioMutationVariables>;
export const LikeApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LikeApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"likeApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<LikeApplicationMutation, LikeApplicationMutationVariables>;
export const RejectApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RejectApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rejectApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RejectApplicationMutation, RejectApplicationMutationVariables>;
export const SendReviewByAgencyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendReviewByAgency"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"args"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendReviewByAgencyArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendReviewByAgency"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"Variable","name":{"kind":"Name","value":"args"}}}]}]}}]} as unknown as DocumentNode<SendReviewByAgencyMutation, SendReviewByAgencyMutationVariables>;
export const SendReviewByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendReviewByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"args"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendReviewByUserArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendReviewByUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"args"},"value":{"kind":"Variable","name":{"kind":"Name","value":"args"}}}]}]}}]} as unknown as DocumentNode<SendReviewByUserMutation, SendReviewByUserMutationVariables>;
export const GetCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"agencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agency"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"emailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"isOnboarded"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}}]}}]} as unknown as DocumentNode<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetDefaultOnboardingDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDefaultOnboardingDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"isOnboarded"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"onboardingData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"currency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starting"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pictureUploadURL"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadURL"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetDefaultOnboardingDetailsQuery, GetDefaultOnboardingDetailsQueryVariables>;
export const GetDefaultAgencyOnboardingDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDefaultAgencyOnboardingDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"agencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"onboardingAgency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"contactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"pictureUploadURL"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadURL"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetDefaultAgencyOnboardingDetailsQuery, GetDefaultAgencyOnboardingDetailsQueryVariables>;
export const GetFeaturedSellersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFeaturedSellers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"sellers"},"name":{"kind":"Name","value":"getFeaturedSellers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"followers"}},{"kind":"Field","name":{"kind":"Name","value":"er"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"posts"},"name":{"kind":"Name","value":"getFeaturedPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mediaURL"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnailURL"}},{"kind":"Field","name":{"kind":"Name","value":"creatorImage"}},{"kind":"Field","name":{"kind":"Name","value":"creatorName"}},{"kind":"Field","name":{"kind":"Name","value":"creatorUsername"}},{"kind":"Field","name":{"kind":"Name","value":"creatorVerified"}},{"kind":"Field","name":{"kind":"Name","value":"postURL"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"er"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"postings"},"name":{"kind":"Name","value":"getFeaturedPostings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"minimumAge"}},{"kind":"Field","name":{"kind":"Name","value":"maximumAge"}},{"kind":"Field","name":{"kind":"Name","value":"barter"}},{"kind":"Field","name":{"kind":"Name","value":"applicationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"minimumFollowers"}},{"kind":"Field","name":{"kind":"Name","value":"externalLink"}},{"kind":"Field","name":{"kind":"Name","value":"agency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"agencies"},"name":{"kind":"Name","value":"getFeaturedAgencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}}]}}]} as unknown as DocumentNode<GetFeaturedSellersQuery, GetFeaturedSellersQueryVariables>;
export const GetSellerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSeller"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSeller"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedback"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"portfolio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"currency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starting"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instagramMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"er"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followers"}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"er"}},{"kind":"Field","name":{"kind":"Name","value":"averageLikes"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"agency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"feedback"}},{"kind":"Field","name":{"kind":"Name","value":"rating"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recentPostings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"barter"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"applicationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"minimumAge"}},{"kind":"Field","name":{"kind":"Name","value":"maximumAge"}},{"kind":"Field","name":{"kind":"Name","value":"minimumFollowers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}},{"kind":"Field","name":{"kind":"Name","value":"portfolio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"imageURL"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instagramMedia"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"likes"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"comments"}},{"kind":"Field","name":{"kind":"Name","value":"er"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followers"}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"er"}},{"kind":"Field","name":{"kind":"Name","value":"averageLikes"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSellerQuery, GetSellerQueryVariables>;
export const GetChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"chats"},"name":{"kind":"Name","value":"getChats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"agency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hasRead"}}]}}]}}]} as unknown as DocumentNode<GetChatsQuery, GetChatsQueryVariables>;
export const GetChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversationID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"chat"},"name":{"kind":"Name","value":"getChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"conversationID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversationID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"agency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"preview"}},{"kind":"Field","name":{"kind":"Name","value":"hasRead"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"byAgency"}}]}}]}}]}}]} as unknown as DocumentNode<GetChatQuery, GetChatQueryVariables>;
export const GetAccountDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccountDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"locationID"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starting"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pictureUploadURL"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadURL"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<GetAccountDetailsQuery, GetAccountDetailsQueryVariables>;
export const GetUserCurrencyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserCurrency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agencyDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locationID"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserCurrencyQuery, GetUserCurrencyQueryVariables>;
export const GetCountriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCountries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"countries"},"name":{"kind":"Name","value":"getCountries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<GetCountriesQuery, GetCountriesQueryVariables>;
export const GetStatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"countryID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"states"},"name":{"kind":"Name","value":"getStates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"countryID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"countryID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<GetStatesQuery, GetStatesQueryVariables>;
export const GetCitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCities"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stateID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"cities"},"name":{"kind":"Name","value":"getCities"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stateID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stateID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]} as unknown as DocumentNode<GetCitiesQuery, GetCitiesQueryVariables>;
export const SearchSellersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchSellers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchSellersFilters"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"sellers"},"name":{"kind":"Name","value":"searchSellers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"followers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"starting"}}]}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"currency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchSellersQuery, SearchSellersQueryVariables>;
export const IsUsernameAvailableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsUsernameAvailable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isUsernameAvailable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<IsUsernameAvailableQuery, IsUsernameAvailableQueryVariables>;
export const GetPostingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPosting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agencyDetails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"posting"},"name":{"kind":"Name","value":"getPosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maximumAge"}},{"kind":"Field","name":{"kind":"Name","value":"platforms"}},{"kind":"Field","name":{"kind":"Name","value":"minimumFollowers"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCountry"}},{"kind":"Field","name":{"kind":"Name","value":"extraDetails"}},{"kind":"Field","name":{"kind":"Name","value":"agency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deliverables"}},{"kind":"Field","name":{"kind":"Name","value":"externalLink"}},{"kind":"Field","name":{"kind":"Name","value":"applicationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"barter"}},{"kind":"Field","name":{"kind":"Name","value":"minimumAge"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetPostingQuery, GetPostingQueryVariables>;
export const GetAllPostingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllPostings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchPostingsFilters"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"postings"},"name":{"kind":"Name","value":"getAllPostings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"IntValue","value":"20"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maximumAge"}},{"kind":"Field","name":{"kind":"Name","value":"minimumFollowers"}},{"kind":"Field","name":{"kind":"Name","value":"agency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"applicationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"barter"}},{"kind":"Field","name":{"kind":"Name","value":"minimumAge"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"platforms"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetAllPostingsQuery, GetAllPostingsQueryVariables>;
export const GetCurrentUserApplicationStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentUserApplicationStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isOnboarded"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followers"}}]}},{"kind":"Field","name":{"kind":"Name","value":"agencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"agency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"hasApplied"},"name":{"kind":"Name","value":"getHasUserApplied"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}}]}]}}]} as unknown as DocumentNode<GetCurrentUserApplicationStatusQuery, GetCurrentUserApplicationStatusQueryVariables>;
export const GetUserPostingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserPostings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agency"}}]}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"postings"},"name":{"kind":"Name","value":"getUserPostings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maximumAge"}},{"kind":"Field","name":{"kind":"Name","value":"referralEarnings"}},{"kind":"Field","name":{"kind":"Name","value":"minimumFollowers"}},{"kind":"Field","name":{"kind":"Name","value":"applicationsCount"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"barter"}},{"kind":"Field","name":{"kind":"Name","value":"minimumAge"}},{"kind":"Field","name":{"kind":"Name","value":"extraDetails"}},{"kind":"Field","name":{"kind":"Name","value":"open"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"platforms"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deliverables"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCountry"}}]}}]}}]} as unknown as DocumentNode<GetUserPostingsQuery, GetUserPostingsQueryVariables>;
export const GetPostingApplicationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostingApplications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"posting"},"name":{"kind":"Name","value":"getPosting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"extraDetails"}},{"kind":"Field","name":{"kind":"Name","value":"externalLink"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"applications"},"name":{"kind":"Name","value":"getPostingApplications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postingID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postingID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"referralEarnings"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}},{"kind":"Field","name":{"kind":"Name","value":"dob"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"instagramStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"followers"}},{"kind":"Field","name":{"kind":"Name","value":"averageLikes"}},{"kind":"Field","name":{"kind":"Name","value":"averageComments"}},{"kind":"Field","name":{"kind":"Name","value":"er"}},{"kind":"Field","name":{"kind":"Name","value":"mediaCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]} as unknown as DocumentNode<GetPostingApplicationsQuery, GetPostingApplicationsQueryVariables>;
export const VerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VerifyEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}]}]}}]} as unknown as DocumentNode<VerifyEmailQuery, VerifyEmailQueryVariables>;
export const GetPortfolioUploadUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPortfolioUploadURL"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"getCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"agencies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agency"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"uploadURL"},"name":{"kind":"Name","value":"getPortfolioUploadURL"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadURL"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<GetPortfolioUploadUrlQuery, GetPortfolioUploadUrlQueryVariables>;
export const GetUserApplicationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserApplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPendingReviews"}},{"kind":"Field","name":{"kind":"Name","value":"getUserApplications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"posting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"agency"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserApplicationsQuery, GetUserApplicationsQueryVariables>;