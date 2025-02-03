/* eslint-disable */
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
  applyToPosting: Scalars['Boolean']['output'];
  completeOnboarding: Scalars['Boolean']['output'];
  createPosting?: Maybe<Scalars['Float']['output']>;
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


export type MutationApplyToPostingArgs = {
  comment?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  postingID: Scalars['Float']['input'];
};


export type MutationCreatePostingArgs = {
  newPosting: NewPostingInput;
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
  getPosting?: Maybe<Posting>;
  getPostingApplications: Array<Application>;
  getSeller?: Maybe<User>;
  getStates: Array<SelectOption>;
  getUserApplications: Array<Application>;
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
  pricing?: Maybe<Pricing>;
  roles?: Maybe<Array<Roles>>;
  username?: Maybe<Scalars['String']['output']>;
};
